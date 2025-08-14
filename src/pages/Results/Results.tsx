import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Gif } from '../../services/giphy-api';
import SearchBar from '../../components/SearchBar/SearchBar';
import Header from '../../components/Header/Header';
import styles from './Results.module.css';
import Spinner from '../../components/Spinner/Spinner';

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

  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!gifs) navigate('/');
    else {
      const initialLoading: Record<string, boolean> = {};
      gifs.forEach((gif) => (initialLoading[gif.id] = true));
      setLoadingMap(initialLoading);
    }
  }, [gifs, navigate]);

  const handleViewClick = (id: string) => navigate(`/view/${id}`);

  if (!gifs) return null;

  const handleImgLoad = (id: string) => {
    setLoadingMap((prev) => ({ ...prev, [id]: false }));
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
              {loadingMap[gif.id] && <Spinner isLoading={true} />}
              <img
                src={gif.images.original.url}
                alt={gif.title}
                style={{ display: loadingMap[gif.id] ? 'none' : 'block' }}
                onLoad={() => handleImgLoad(gif.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Results;