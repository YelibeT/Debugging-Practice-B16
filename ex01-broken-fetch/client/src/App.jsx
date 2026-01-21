import { useState, useEffect } from 'react'

// BUG: Wrong port - should be 3001, using 3000
const API_BASE = 'http://localhost:3000/api';

function App() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('[App] Component mounted, fetching items...');
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      console.log('[App] Fetching items from:', `${API_BASE}/items`);
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE}/items`);
      console.log('[App] Fetch response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('[App] Received data:', data);

      // BUG: Expecting { items: [] } but server returns plain array
      // This will cause items to be undefined if server returns wrong shape
      setItems(data.items || []);
      console.log('[App] Items set to state:', data.items || []);
    } catch (err) {
      console.error('[App] Error fetching items:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    console.log('[App] Adding new item, name:', newItemName);

    if (!newItemName.trim()) {
      console.warn('[App] Item name is empty, not submitting');
      return;
    }

    try {
      console.log('[App] POST request to:', `${API_BASE}/items`);
      const response = await fetch(`${API_BASE}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newItemName }),
      });

      console.log('[App] POST response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add item');
      }

      const newItem = await response.json();
      console.log('[App] New item created:', newItem);

      // Update local state
      setItems([...items, newItem]);
      setNewItemName('');
      console.log('[App] Item added to local state');
    } catch (err) {
      console.error('[App] Error adding item:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Exercise 01 - Item List</h1>
        <p className="loading">Loading items...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Exercise 01 - Item List</h1>

      {error && (
        <div className="error">
          Error: {error}
        </div>
      )}

      <div>
        <h2>Items</h2>
        {items.length === 0 ? (
          <p>No items found. Add one below!</p>
        ) : (
          <ul className="item-list">
            {items.map((item) => (
              <li key={item.id} className="item">
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleAddItem} className="add-item-form">
        <input
          type="text"
          placeholder="Enter item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default App
