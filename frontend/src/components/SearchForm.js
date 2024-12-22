import React, { useState } from 'react';
import axios from 'axios';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/stories/search', {
        params: { q: query },
      });

      if (response.data && response.data.results) {
        setResults(response.data.results);
        setError(null);
      } else {
        setResults([]);
        setError('No results found.');
      }
    } catch (err) {
      setError('Unable to fetch search results.');
    }
  };

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-md shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Search Stories</h2>
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query"
          className="flex-grow px-4 py-2 rounded-md bg-white text-gray-800 focus:outline-none shadow"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-purple-500 text-white font-bold rounded-md shadow hover:bg-purple-600"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      <div>
        <h3 className="text-xl font-bold mb-4">Results:</h3>
        {results.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <li key={item.id} className="bg-white text-gray-800 p-4 rounded-md shadow">
                <h4
                  className="font-bold text-lg mb-2"
                  dangerouslySetInnerHTML={{ __html: item.titleHighlighted }}
                />
                <p
                  className="text-sm mb-2"
                  dangerouslySetInnerHTML={{ __html: item.contentHighlighted }}
                />
                <p className="text-xs text-gray-600">
                  <strong>Author:</strong> {item.author}
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Created At:</strong> {new Date(item.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
