import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchGifs, Gif } from '../../services/giphy-api';
import Spinner from '../Spinner/Spinner';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const gifs: Gif[] = await searchGifs(query, 24);
      navigate('/results', { state: { gifs, query } });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles['search-bar-container']}>
      <form className={styles['search-bar-form']} onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Giphy..."
        />
        <button type="submit">Search</button>
      </form>
      {loading && <Spinner isLoading={loading} />}
    </div>
  );
};

export default SearchBar;