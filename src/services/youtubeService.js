import { episodes as dummyEpisodes, clips as dummyClips } from '../data/dummyData';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
const HANDLE = import.meta.env.VITE_YOUTUBE_HANDLE || '@TalksVividh';

// Helper to dynamically assign category based on keywords
const detectCategory = (title = '', description = '', tags = []) => {
  const text = `${title} ${description}`.toLowerCase();
  const tagsStr = tags.map(t => t.toLowerCase()).join(' ');

  // Startup category
  if (
    /\b(startup|founder|founders|entrepreneur|entrepreneurs|business|crore|bootstrap|bootstrapped)\b/i.test(text) ||
    /\b(startup|business)\b/i.test(tagsStr)
  ) {
    return 'Startup';
  }
  // Student Life category
  if (
    /\b(student|students|college|campus|transition|career|corporate)\b/i.test(text) ||
    /\b(student|college|career)\b/i.test(tagsStr)
  ) {
    return 'Student Life';
  }
  // Personal Branding category
  if (
    /\b(branding|personal brand|influence|influencer|influencers)\b/i.test(text) ||
    /\b(branding|influence)\b/i.test(tagsStr)
  ) {
    return 'Personal Branding';
  }
  // Tech category (using word boundaries to avoid matching words like "again" or "maintain")
  if (
    /\b(tech|technology|technical|software|ai|artificial intelligence|machine learning|developer|developers|coding|programmer)\b/i.test(text) ||
    /\b(tech|ai)\b/i.test(tagsStr)
  ) {
    return 'Tech';
  }
  // Marketing category
  if (
    /\b(marketing|sales|cmo|advertising|seo)\b/i.test(text) ||
    /\b(marketing)\b/i.test(tagsStr)
  ) {
    return 'Marketing';
  }
  // Social Impact category
  if (
    /\b(social impact|civic|ngo|community|social work|activist|activism)\b/i.test(text) ||
    /\b(social|community)\b/i.test(tagsStr)
  ) {
    return 'Social Impact';
  }
  // Local Voices category
  if (
    /\b(local|regional|patna|bihar|city|patnaite|regional voices)\b/i.test(text) ||
    /\b(local|bihar)\b/i.test(tagsStr)
  ) {
    return 'Local Voices';
  }
  // Culture category (art is matched with boundary to avoid matching "startup" or "part")
  if (
    /\b(culture|art|arts|music|musician|singer|singing|actor|acting|theatre|bollywood|film|creative)\b/i.test(text) ||
    /\b(culture|art|music)\b/i.test(tagsStr)
  ) {
    return 'Culture';
  }
  
  return 'Startup'; // Fallback default category
};

// Helper to parse ISO 8601 duration (e.g., PT1H2M10S)
const parseDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (parseInt(match[1]) || 0);
  const minutes = (parseInt(match[2]) || 0);
  const seconds = (parseInt(match[3]) || 0);
  
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  
  let formatted = '';
  if (hours > 0) {
    formatted = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    formatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  
  return { totalSeconds, formatted };
};

// Helper for time ago
const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
};

// Helper for timeout
const fetchWithTimeout = async (url, options = {}, timeout = 6000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

export const fetchChannelData = async () => {
  // Check Cache first
  try {
    const cached = localStorage.getItem('vividh_yt_cache_v5');
    if (cached) {
      const { data, timestamp, apiKey, channelId, handle } = JSON.parse(cached);
      // 1 hour cache - invalidates immediately if API Key, Channel ID, or Handle has changed
      if (apiKey === API_KEY && channelId === CHANNEL_ID && handle === HANDLE && (Date.now() - timestamp < 3600000)) {
        // Re-evaluate categories of cached items on the fly to ensure that any filter logic updates apply immediately
        const reevaluatedEpisodes = (data.episodes || []).map(ep => ({
          ...ep,
          category: detectCategory(ep.title, ep.description, ep.tags || [])
        }));
        const reevaluatedClips = (data.clips || []).map(clip => ({
          ...clip,
          category: detectCategory(clip.title, clip.description, clip.tags || [])
        }));
        return { episodes: reevaluatedEpisodes, clips: reevaluatedClips, fromCache: true };
      }
    }
  } catch (e) {
    console.error("Cache read error", e);
  }

  if (!API_KEY) {
    console.warn("⚠️ No VITE_YOUTUBE_API_KEY found. Falling back to dummy data.");
    return { episodes: dummyEpisodes, clips: dummyClips, isDummy: true };
  }

  try {
    let targetChannelId = CHANNEL_ID;
    let targetHandle = import.meta.env.VITE_YOUTUBE_HANDLE;
    let uploadsPlaylistId = null;

    // 1. If CHANNEL_ID is provided in .env, use it directly
    if (targetChannelId) {
      const channelRes = await fetchWithTimeout(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${targetChannelId}&key=${API_KEY}`);
      const channelData = await channelRes.json();
      if (!channelData.items || channelData.items.length === 0) throw new Error("Channel not found by ID");
      uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
    } else {
      // 2. Otherwise use the Handle (default to @TalksVividh if not provided)
      const handleToUse = targetHandle || '@TalksVividh';
      const handleClean = handleToUse.startsWith('@') ? handleToUse : `@${handleToUse}`;
      const channelRes = await fetchWithTimeout(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${handleClean}&key=${API_KEY}`);
      const channelData = await channelRes.json();
      if (!channelData.items || channelData.items.length === 0) throw new Error(`Channel not found by handle: ${handleClean}`);
      
      targetChannelId = channelData.items[0].id;
      uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
    }

    // 3. Get recent videos from uploads (max 50)
    const playlistRes = await fetchWithTimeout(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${API_KEY}`);
    const playlistData = await playlistRes.json();
    
    if (!playlistData.items || playlistData.items.length === 0) {
      const result = { episodes: dummyEpisodes, clips: dummyClips, isDummy: true };
      localStorage.setItem('vividh_yt_cache_v5', JSON.stringify({ 
        data: result, 
        timestamp: Date.now(),
        apiKey: API_KEY,
        channelId: CHANNEL_ID,
        handle: HANDLE
      }));
      return result;
    }

    const videoIds = playlistData.items.map(item => item.snippet.resourceId.videoId).join(',');

    // 4. Get detailed video stats (duration, views)
    const videosRes = await fetchWithTimeout(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics,snippet&id=${videoIds}&key=${API_KEY}`);
    const videosData = await videosRes.json();

    const episodes = [];
    const clips = [];

    // Sort by publication date (latest first)
    const sortedItems = [...videosData.items].sort((a, b) => 
      new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
    );

    sortedItems.forEach((video, index) => {
      const { totalSeconds, formatted } = parseDuration(video.contentDetails.duration);
      
      // Determine if short based on duration or title
      const isShort = totalSeconds <= 60 || video.snippet.title.toLowerCase().includes('#shorts');
      
      const viewsCount = parseInt(video.statistics.viewCount) || 0;
      let formattedViews = `${viewsCount} views`;
      if (viewsCount >= 1000000) {
        formattedViews = `${(viewsCount / 1000000).toFixed(1)}M views`;
      } else if (viewsCount >= 1000) {
        formattedViews = `${(viewsCount / 1000).toFixed(1)}K views`;
      }
      
      // Attempt to extract a guest name from title (e.g. "Title | Guest Name")
      let guest = 'Special Guest';
      if (video.snippet.title.includes('|')) {
        const parts = video.snippet.title.split('|');
        guest = parts[parts.length - 1].trim();
      }
      
      // Use standard thumbnail, fallback to others
      const thumbnail = video.snippet.thumbnails.maxres?.url || 
                        video.snippet.thumbnails.high?.url || 
                        video.snippet.thumbnails.medium?.url;

      // Clean up the title to remove guest names, episode numbers, or channel branding after separators
      let cleanTitle = video.snippet.title;
      
      // Remove trailing part after '|'
      if (cleanTitle.includes('|')) {
        cleanTitle = cleanTitle.split('|')[0].trim();
      }
      
      // Remove trailing part after '-' if it contains channel name or common branding
      if (cleanTitle.includes('-')) {
        const parts = cleanTitle.split('-');
        const lastPart = parts[parts.length - 1].toLowerCase();
        if (lastPart.includes('vividh') || lastPart.includes('talk') || lastPart.includes('ep') || lastPart.includes('ft.')) {
          cleanTitle = parts.slice(0, -1).join('-').trim();
        }
      }

      const tags = video.snippet.tags || [];
      const category = detectCategory(video.snippet.title, video.snippet.description, tags);

      // Exclude spammy/SEO keywords from tags
      const tagBlacklist = [
        'bjp', 'modi', 'narendra modi', 'raj shamani', 'rajshamani', 'shubhankar', 'mishra', 'shubhankar mishra',
        'beerbiceps', 'ranveer', 'podcast', 'vividh', 'vividhtalks', 'vividh talks', 'talk show', 'interview',
        'hindi podcast', 'indian podcast'
      ];
      
      const cleanTags = tags.filter(tag => {
        const t = tag.toLowerCase().trim();
        return !tagBlacklist.some(blacklisted => t.includes(blacklisted) || blacklisted.includes(t));
      });
      
      const finalTags = cleanTags.slice(0, 3);
      if (finalTags.length === 0) {
        finalTags.push('Talks', 'Insights');
      }

      const item = {
        id: video.id,
        number: String(index + 1).padStart(3, '0'),
        title: cleanTitle,
        description: video.snippet.description,
        duration: formatted,
        image: thumbnail,
        videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
        channelName: video.snippet.channelTitle,
        views: formattedViews,
        timeAgo: getTimeAgo(video.snippet.publishedAt),
        tags: finalTags,
        guest: guest,
        category: category
      };

      if (isShort) {
        clips.push(item);
      } else {
        episodes.push(item);
      }
    });
    
    const result = { episodes, clips, isDummy: false };
    localStorage.setItem('vividh_yt_cache_v5', JSON.stringify({ 
      data: result, 
      timestamp: Date.now(),
      apiKey: API_KEY,
      channelId: CHANNEL_ID,
      handle: HANDLE
    }));

    return result;
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return { episodes: dummyEpisodes, clips: dummyClips, isDummy: true };
  }
};
