import axios from 'axios';

const API_KEY = 'Q6cWtmVDZ1xSx8glURHcaEc1qdk9HvTs';
const BASE_URL = 'https://api.giphy.com/v1/gifs';

export interface Gif {
  id: string;
  url: string; // Link to Giphy Page
  title: string;
  embed_url: string; // For looping
  images: {
    original: {
      url: string; // Link to actual Giphy
    };
    [key: string]: any;
  };
}

// Search GIFs
export const searchGifs = async (query: string, limit = 24): Promise<Gif[]> => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: {
    // eslint-disable-next-line camelcase
      api_key: API_KEY,
      q: query,
      limit,
      rating: 'g',
      lang: 'en',
    },
  });
  return response.data.data;
};

// Get GIF by ID
export const getGifById = async (id: string): Promise<Gif> => {
  const response = await axios.get(`${BASE_URL}/${id}`, {
    // eslint-disable-next-line camelcase
    params: { api_key: API_KEY },
  });
  return response.data.data;
};

// Get trending search terms
export const getTrendingSearches = async (limit = 12): Promise<string[]> => {
  const response = await axios.get('https://api.giphy.com/v1/trending/searches', {
    // eslint-disable-next-line camelcase
    params: { api_key: API_KEY },
  });
  return response.data.data.slice(0, limit);
};