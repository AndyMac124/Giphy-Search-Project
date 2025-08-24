import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Gif } from '../../services/giphy-api';
import SearchBar from '../../components/SearchBar/SearchBar';
import Header from '../../components/Header/Header';
import styles from './Results.module.css';
import Spinner from '../../components/Spinner/Spinner';

interface LocationState {
  gifs: Gif[];      // Array of GIF objects to display
  query?: string;   // Optional search query string
}

/**
 * Results Component
 * 
 * Displays a grid of GIFs based on search results or trending terms.
 * - Shows a spinner for each GIF while it is loading
 * - Clicking a GIF navigates to the detailed view
 * - Includes a search bar for new queries
 */
const Results: React.FC = () => {
  // Access router location and navigation functions
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve GIFs and optional query from router state
  const state = location.state as LocationState | undefined;
  const gifs = state?.gifs;
  const query = state?.query;

  // Track loading state for each individual GIF (id → boolean)
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  // Initialise loading map and redirect if no GIFs
  useEffect(() => {
    if (!gifs) {
      navigate('/'); // Go back if no data
    } else {
      const initialLoading: Record<string, boolean> = {};
      gifs.forEach((gif) => (initialLoading[gif.id] = true)); // All GIFs start as loading
      setLoadingMap(initialLoading);
    }
  }, [gifs, navigate]);

  // Navigate to the GIF detail page when a GIF is clicked
  const handleViewClick = (id: string) => navigate(`/view/${id}`);

  // Show nothing while GIFs are unavailable
  if (!gifs) return null;

  // Mark a GIF as loaded when its image finishes loading
  const handleImgLoad = (id: string) => {
    setLoadingMap((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <>
      <Header />

      <div className={styles.resultsContainer}>
        <SearchBar />

        <h1>Top Results {query ? `for "${query}"` : ''}</h1>

        <div className={styles.resultsGrid}>
          {gifs.map((gif) => (
            <div
              key={gif.id}
              className={styles.resultsGridItem}
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