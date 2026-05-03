import { useState, useEffect } from 'react';
import { fetchChannelData } from '../services/youtubeService';

export const useYouTubeData = () => {
  const [data, setData] = useState({ episodes: [], clips: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDummy, setIsDummy] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchChannelData();
        setData({ episodes: result.episodes, clips: result.clips });
        setIsDummy(result.isDummy);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { ...data, loading, error, isDummy };
};
