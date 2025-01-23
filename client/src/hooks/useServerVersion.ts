import { useState, useEffect } from 'react';

export const useServerVersion = () => {
  const [version, setVersion] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        // TODO: Update to pull from environment variable
        const response = await fetch('http://localhost:4000/api/version');
        if (!response.ok) {
          throw new Error('Failed to fetch version');
        }
        const data = await response.text();
        setVersion(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchVersion();
  }, []);

  return { version, error, loading };
};
