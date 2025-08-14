import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGifById, Gif } from '../../services/giphy-api';
import Header from '../../components/Header/Header';
import styles from './View.module.css';
import Spinner from '../../components/Spinner/Spinner';

const View: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gif, setGif] = useState<Gif | null>(null);
  const [copiedGif, setCopiedGif] = useState(false);
  const [copiedPage, setCopiedPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    getGifById(id).then(setGif);
  }, [id]);

  const handleCopyGifLink = () => {
    if (!gif) return;
    navigator.clipboard.writeText(gif.images.original.url);
    setCopiedGif(true);
    setTimeout(() => setCopiedGif(false), 1500);
  };

  const handleCopyPageLink = () => {
    if (!gif) return;
    navigator.clipboard.writeText(gif.url);
    setCopiedPage(true);
    setTimeout(() => setCopiedPage(false), 1500);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!gif) return <p>Loading...</p>;

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