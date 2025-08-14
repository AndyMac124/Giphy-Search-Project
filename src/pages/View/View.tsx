import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGifById, Gif } from '../../services/giphy-api';
import Header from '../../components/Header/Header';
import styles from './View.module.css';
import Spinner from '../../components/Spinner/Spinner';

/**
 * View Component
 * 
 * Displays a single GIF with its title and options to:
 * - Copy direct GIF link
 * - Copy Giphy page link
 * - Open on Giphy
 * 
 * Shows a spinner while the GIF is loading.
 */
const View: React.FC = () => {
  // Get the GIF ID from the route parameters
  const { id } = useParams<{ id: string }>();
  // State for the GIF object
  const [gif, setGif] = useState<Gif | null>(null);
  // State to track copy feedback for GIF link
  const [copiedGif, setCopiedGif] = useState(false);
  // State to track copy feedback for Giphy page link
  const [copiedPage, setCopiedPage] = useState(false);
  // State to track whether the image is still loading
  const [loading, setLoading] = useState(true);
  // Navigation hook to go back to previous page
  const navigate = useNavigate();

  // Fetch GIF data when component mounts or ID changes
  useEffect(() => {
    if (!id) return;
    getGifById(id).then(setGif);
  }, [id]);

  /**
   * Copy the direct GIF URL to the clipboard
   * and show temporary feedback
   */
  const handleCopyGifLink = () => {
    if (!gif) return;
    navigator.clipboard.writeText(gif.images.original.url);
    setCopiedGif(true);
    setTimeout(() => setCopiedGif(false), 2000);
  };

  /**
   * Copy the Giphy page URL to the clipboard
   * and show temporary feedback
   */
  const handleCopyPageLink = () => {
    if (!gif) return;
    navigator.clipboard.writeText(gif.url);
    setCopiedPage(true);
    setTimeout(() => setCopiedPage(false), 2000);
  };

  // Navigate back to previous page
  const handleBack = () => {
    navigate(-1);
  };

  // Show fallback text while GIF data is loading
  if (!gif) return <p>No item requested</p>;

  return (
    <>
      <Header />
      <div className={styles['view-container']}>
        
        <button className={styles['back-button']} onClick={handleBack}>
          ← Back to Results
        </button>

        <h1>{gif.title}</h1>

        <img
          src={gif.images.original.url}
          alt={gif.title}
          style={{ display: loading ? 'none' : 'block' }}
          onLoad={() => setLoading(false)}
        />

        {loading && <Spinner isLoading={loading} />}

        <div className={styles['view-buttons']}>
          <button onClick={handleCopyGifLink}>
            {copiedGif ? 'Copied!' : 'Copy Giphy Link'}
          </button>
          <button onClick={handleCopyPageLink}>
            {copiedPage ? 'Copied!' : 'Copy Link to Giphy Page'}
          </button>
          <a href={gif.url} target="_blank" rel="noopener noreferrer">
            Open on Giphy
          </a>
        </div>
      </div>
    </>
  );
};

export default View;