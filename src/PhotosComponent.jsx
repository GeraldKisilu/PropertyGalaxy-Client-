import { useState, useEffect } from 'react';
import './PhotosComponent.css'; 

const PhotosComponent = ({ id }) => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fade, setFade] = useState(false); 

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`http://localhost:5050/property/${id}/photos`);
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setError('Error fetching photos');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [id]);

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
      setFade(false);
    }, 300); // Duration of fade-out
  };

  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
      setFade(false);
    }, 300); // Duration of fade-out
  };

  if (loading) {
    return <p>Loading photos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {photos.length > 0 ? (
        <div>
          <div className={`photo-container ${fade ? 'fade-out' : 'fade-in'}`}>
            <img
              src={photos[currentIndex].photo_url}
              alt={`Photo ${currentIndex + 1}`}
            />
          </div>
          <div className="photo-navigation">
            <button onClick={handlePrev} disabled={photos.length <= 1}>
              &lt;
            </button>
            <span>
              {currentIndex + 1} / {photos.length}
            </span>
            <button onClick={handleNext} disabled={photos.length <= 1}>
              &gt;
            </button>
          </div>
        </div>
      ) : (
        <p>No photos available.</p>
      )}
    </div>
  );
};

export default PhotosComponent;
