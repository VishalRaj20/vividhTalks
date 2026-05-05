import { episodes as dummyEpisodes, clips as dummyClips } from '../data/dummyData';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
const HANDLE = import.meta.env.VITE_YOUTUBE_HANDLE || '@TalksVividh';

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
    const cached = localStorage.getItem('vividh_yt_cache');
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      // 1 hour cache
      if (Date.now() - timestamp < 3600000) {
        return { ...data, fromCache: true };
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

    // 1. Get Channel ID from Handle if not provided directly
    if (!targetChannelId) {
      const searchRes = await fetchWithTimeout(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${HANDLE}&key=${API_KEY}`);
      const searchData = await searchRes.json();
      if (!searchData.items || searchData.items.length === 0) throw new Error("Channel not found");
      targetChannelId = searchData.items[0].id.channelId;
    }

    // 2. Get Uploads Playlist ID
    const channelRes = await fetchWithTimeout(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${targetChannelId}&key=${API_KEY}`);
    const channelData = await channelRes.json();
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // 3. Get recent videos from uploads (max 50)
    const playlistRes = await fetchWithTimeout(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${API_KEY}`);
    const playlistData = await playlistRes.json();
    
    if (!playlistData.items || playlistData.items.length === 0) {
      const result = { episodes: dummyEpisodes, clips: dummyClips, isDummy: true };
      localStorage.setItem('vividh_yt_cache', JSON.stringify({ data: result, timestamp: Date.now() }));
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

      const item = {
        id: video.id,
        number: String(index + 1).padStart(3, '0'),
        title: video.snippet.title,
        description: video.snippet.description,
        duration: formatted,
        image: thumbnail,
        videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
        channelName: video.snippet.channelTitle,
        views: formattedViews,
        timeAgo: getTimeAgo(video.snippet.publishedAt),
        tags: video.snippet.tags?.slice(0, 3) || ['Podcast', 'Vividh'],
        guest: guest
      };

      if (isShort) {
        clips.push(item);
      } else {
        episodes.push(item);
      }
    });
    
    const result = { episodes, clips, isDummy: false };
    localStorage.setItem('vividh_yt_cache', JSON.stringify({ data: result, timestamp: Date.now() }));

    return result;
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return { episodes: dummyEpisodes, clips: dummyClips, isDummy: true };
  }
};
