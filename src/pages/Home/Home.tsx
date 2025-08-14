import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getTrendingSearches, searchGifs, Gif } from '../../services/giphy-api';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const [trending, setTrending] = useState<string[]>([]);
  const navigate = useNavigate();

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

  const handleTrendingClick = async (term: string) => {
    try {
      const gifs: Gif[] = await searchGifs(term, 24);
      navigate('/results', { state: { gifs, query: term } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles['home-container']}>
      <div className={styles['home-logo']}>
        <img src="/giphysearch.png" alt="Giphy Search Logo" />
      </div>
      <SearchBar />
      <p className={styles.trending}>Trending Searches</p>
      <div className={styles['trending-buttons-grid']}>
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