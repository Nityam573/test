import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchHistory = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3000/stories/search-history');

        if (Array.isArray(response.data)) {
          setHistory(response.data);
          setError(null); // Clear errors if the response is valid
        } else {
          setError('Invalid data format from API.');
          console.error('API returned unexpected data:', response.data);
        }
      } catch (err) {
        setError('Unable to fetch search history.');
        console.error('Error fetching search history:', err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-md shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Search History</h2>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {history.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {history.map((item, index) => (
            <li key={index} className="py-4">
              <p className="text-lg text-gray-300">
                <strong>Query:</strong> {item.query}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Timestamp:</strong> {new Date(item.timestamp).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                <strong>User ID:</strong> {item.userId}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p className="text-gray-400">No search history available.</p>
      )}
    </div>
  );
};

export default SearchHistory;
