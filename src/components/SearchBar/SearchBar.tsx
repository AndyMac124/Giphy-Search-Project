import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchGifs, Gif } from '../../services/giphy-api';
import Spinner from '../Spinner/Spinner';
import './SearchBar.css';

interface SearchBarProps {
  initialQuery?: string;
}

  // TODO: (Andrew) Consider Filters
  // TODO: (Andrew) Consider Autocomplete
  // TODO: (Andrew) Consider Quick/Hot Topics

const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const gifs: Gif[] = await searchGifs(query, 25);
      navigate('/results', { state: { gifs } });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar-form" onSubmit={handleSearch}>
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