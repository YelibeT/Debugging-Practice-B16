import { useState, useEffect } from 'react'

const API_BASE = 'http://localhost:3001/api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [requestCount, setRequestCount] = useState(0);

  // BUG: Missing searchQuery in dependency array - effect never fires when query changes
  useEffect(() => {
    console.log('[App] Effect triggered, searchQuery:', searchQuery);

    if (!searchQuery.trim()) {
      console.log('[App] Empty query, clearing results');
      setResults([]);
      return;
    }

    // BUG: Missing cleanup function - doesn't cancel previous requests
    // This causes race conditions where slower requests overwrite faster ones
    const performSearch = async () => {
      // BUG: Query param name mismatch - using 'q' but server expects 'query'
      const url = `${API_BASE}/search?q=${encodeURIComponent(searchQuery)}`;
      console.log('[App] Starting search request:', url);
      setIsSearching(true);
      setError(null);

      const currentRequestId = requestCount + 1;
      setRequestCount(currentRequestId);
      console.log(`[App] Request ID: ${currentRequestId}`);

      try {
        const response = await fetch(url);
        console.log('[App] Response received for request:', currentRequestId, 'status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('[App] Data received for request:', currentRequestId, 'results:', data.results?.length);

        // BUG: Race condition - no check if this is the most recent request
        // Slow responses can overwrite results from faster, more recent requests
        setResults(data.results || []);
        console.log('[App] Results set for request:', currentRequestId);
      } catch (err) {
        console.error('[App] Error in search:', err);
        // BUG: Missing error handling - silently fails without showing user feedback
        // setError(err.message); // This line is commented out/missing
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }); // BUG: Missing dependency array! This causes infinite loop

  // BUG: No debouncing - every keystroke triggers immediate API call
  const handleSearchChange = (e) => {
    const value = e.target.value;
    console.log('[App] Search query changed to:', value);
    setSearchQuery(value);
  };

  return (
    <div className="container">
      <h1>Exercise 03 - Product Search</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {error && (
        <div className="error">
          Error: {error}
        </div>
      )}

      <div className={`search-status ${isSearching ? 'searching' : ''}`}>
        {isSearching ? (
          <>Searching... (Request #{requestCount})</>
        ) : searchQuery ? (
          <>Found {results.length} result(s) for "{searchQuery}"</>
        ) : (
          <>Type to search</>
        )}
      </div>

      {results.length === 0 && searchQuery && !isSearching ? (
        <div className="no-results">
          No results found for "{searchQuery}"
        </div>
      ) : (
        <ul className="results">
          {results.map((product) => (
            <li key={product.id} className="result-item">
              <div className="result-name">{product.name}</div>
              <div className="result-details">
                <span className="result-category">{product.category}</span>
                <span className="result-price">${product.price.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="debug-info">
        <h3>Debug Info</h3>
        <div>Current search query: "{searchQuery}"</div>
        <div>Results count: {results.length}</div>
        <div>Is searching: {isSearching ? 'Yes' : 'No'}</div>
        <div>Total requests made: {requestCount}</div>
      </div>
    </div>
  );
}

export default App
