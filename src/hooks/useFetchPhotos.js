import { useState, useEffect } from 'react';

const API_URL = 'https://picsum.photos/v2/list?limit=30';

/**
 * useFetchPhotos — custom hook that fetches photos from Picsum API.
 * Returns: { photos, loading, error }
 *
 * - `photos`: array of photo objects from the API
 * - `loading`: boolean, true while the request is in flight
 * - `error`: string | null — error message if the fetch fails, otherwise null
 *
 * On mount it fires a single fetch. If the network request fails or the
 * response is not OK we set an error message so the Gallery can show a
 * user-friendly error state.
 */
function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false; // cleanup flag to avoid state updates on unmounted component

    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();

        if (!cancelled) {
          setPhotos(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to fetch photos. Please try again.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchPhotos();

    // Cleanup: if the component unmounts before the request completes,
    // we prevent setting state on a dead component.
    return () => {
      cancelled = true;
    };
  }, []); // empty dep array → runs once on mount

  return { photos, loading, error };
}

export default useFetchPhotos;
