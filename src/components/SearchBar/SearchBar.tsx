import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchGifs, Gif } from '../../services/giphy-api';
import Spinner from '../Spinner/Spinner';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  // Initial value for the search input
  initialQuery?: string;
}

/**
 * SearchBar component
 * 
 * Renders an input field and a search button to query Giphy GIFs.
 * Displays a spinner while search results are being fetched.
 * Navigates to the results page with fetched GIFs and the search term.
 */
const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = '' }) => {
  // State for the search input
  const [query, setQuery] = useState(initialQuery);
  // State for loading indicator
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles form submission
   * Fetches GIFs from Giphy and navigates to the results page
   */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const gifs: Gif[] = await searchGifs(query, 24);
      // Pass results and search term to the results page
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