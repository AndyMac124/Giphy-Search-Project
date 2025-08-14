import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGifById, Gif } from '../../services/giphy-api';
import './View.css';

const View: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gif, setGif] = useState<Gif | null>(null);
  const [copiedGif, setCopiedGif] = useState(false);
  const [copiedPage, setCopiedPage] = useState(false);

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

  if (!gif) return <p>Loading...</p>;

  return (
    <div className="view-container">
      <h1>{gif.title}</h1>
      <img src={gif.images.original.url} alt={gif.title} />
      <div className="view-buttons">
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
  );
};

export default View;