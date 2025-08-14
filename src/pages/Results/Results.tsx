import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Gif } from '../../services/giphy-api';
import SearchBar from '../../components/SearchBar/SearchBar';
import Header from '../../components/Header/Header';
import styles from './Results.module.css';

interface LocationState {
  gifs: Gif[];
  query?: string;
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;
  const gifs = state?.gifs;
  const query = state?.query;

  useEffect(() => {
    if (!gifs) navigate('/');
  }, [gifs, navigate]);

  if (!gifs) return null;

  const handleViewClick = (id: string) => {
    navigate(`/view/${id}`);
  };

  return (
    <>
    <Header />
    <div className={styles['results-container']}>
      <SearchBar />
      <h1>Top Results {query ? `for "${query}"` : ''}</h1>
      <div className={styles['results-grid']}>
        {gifs.map((gif) => (
          <div
            key={gif.id}
            className={styles['results-grid-item']}
            onClick={() => handleViewClick(gif.id)}
          >
            <img src={gif.images.original.url} alt={gif.title} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Results;