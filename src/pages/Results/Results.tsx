import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Gif } from '../../services/giphy-api';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Results.css';

interface LocationState {
  gifs: Gif[];
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;
  const gifs = state?.gifs;

  // Redirect to home if no gifs
  useEffect(() => {
    if (!gifs) navigate('/');
  }, [gifs, navigate]);

  if (!gifs) return null;

  const handleViewClick = (id: string) => {
    navigate(`/view/${id}`);
  };

  return (
    <div className="results-container">
      <SearchBar />
      <h1>Results</h1>
      <div className="results-grid">
        {gifs.map((gif) => (
          <div
            key={gif.id}
            className="results-grid-item"
            onClick={() => handleViewClick(gif.id)}
          >
            <img src={gif.images.original.url} alt={gif.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;