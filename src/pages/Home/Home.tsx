import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getTrendingSearches, searchGifs, Gif } from '../../services/giphy-api';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

/**
 * Home Component
 * 
 * Displays the homepage for the Giphy Search app.
 * - Shows site logo
 * - Includes a search bar for user queries
 * - Fetches and displays trending search terms as clickable buttons
 * - Clicking a trending button searches for that term and navigates to results
 */
const Home: React.FC = () => {
  // Array of trending search terms
  const [trending, setTrending] = useState<string[]>([]);

  // Router navigation hook
  const navigate = useNavigate();

  // Fetch trending search terms on component mount
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const terms = await getTrendingSearches(12);
        setTrending(terms);
      } catch (err) {
        console.error('Error fetching trending searches', err);
      }
    };
    fetchTrending();
  }, []);

  /**
   * Handles click on a trending search button
   * - Performs a GIF search for the selected term
   * - Navigates to the results page with GIFs and query
   */
  const handleTrendingClick = async (term: string) => {
    try {
      const gifs: Gif[] = await searchGifs(term, 24);
      navigate('/results', { state: { gifs, query: term } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.homeContainer}>
      
      <div className={styles.homeLogo}>
        <img src="/giphysearch.png" alt="Giphy Search Logo" />
      </div>

      <SearchBar />

      <p className={styles.trending}>Trending Searches</p>

      <div className={styles.trendingButtonsGrid}>
        {trending.map((term) => (
          <button key={term} onClick={() => handleTrendingClick(term)}>
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;