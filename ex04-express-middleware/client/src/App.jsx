import { useState } from 'react'

const API_BASE = 'http://localhost:3001/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('[App] Login attempt with username:', username);

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log('[App] POST request to:', `${API_BASE}/login`);
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('[App] Login response status:', response.status);

      // BUG: Treating 404 as success because server incorrectly returns 404 for auth failures
      // Client interprets any non-200 as generic error instead of checking specific codes
      if (response.status === 404) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('[App] Login successful, received:', data);

      setToken(data.token);
      setIsLoggedIn(true);
      setSuccess('Login successful!');
      console.log('[App] Token stored, fetching profile...');

      // Fetch profile immediately after login
      await fetchProfile(data.token);
    } catch (err) {
      console.error('[App] Login error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (authToken) => {
    console.log('[App] Fetching profile with token:', authToken);

    try {
      console.log('[App] GET request to:', `${API_BASE}/profile`);

      // BUG: Client sends 'Authorization' header but server expects 'x-auth-token'
      const response = await fetch(`${API_BASE}/profile`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      console.log('[App] Profile response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch profile');
      }

      const data = await response.json();
      console.log('[App] Profile data received:', data);

      // BUG: Response shape mismatch - expecting { user } but login might return different shape
      setUser(data.user);
    } catch (err) {
      console.error('[App] Profile fetch error:', err);
      setError(err.message);
    }
  };

  const fetchSettings = async () => {
    console.log('[App] Fetching settings');

    setLoading(true);
    setError(null);

    try {
      console.log('[App] GET request to:', `${API_BASE}/settings`);

      // BUG: Same header mismatch issue
      const response = await fetch(`${API_BASE}/settings`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('[App] Settings response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch settings');
      }

      const data = await response.json();
      console.log('[App] Settings data received:', data);

      setSettings(data.settings);
      setSuccess('Settings loaded successfully!');
    } catch (err) {
      console.error('[App] Settings fetch error:', err);
      // BUG: Error might be due to async error on server that crashes the server
      setError(err.message + ' (Server might have crashed - check server terminal)');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    console.log('[App] Logout initiated');

    setLoading(true);
    setError(null);

    try {
      console.log('[App] POST request to:', `${API_BASE}/logout`);

      // BUG: Same header mismatch
      const response = await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('[App] Logout response status:', response.status);

      // BUG: Server sends 204 No Content but also sends a body, which is incorrect
      // Client expects JSON response but 204 shouldn't have a body
      if (response.status === 204) {
        console.log('[App] Logout successful (204 No Content)');
      } else if (!response.ok) {
        throw new Error('Logout failed');
      } else {
        const data = await response.json();
        console.log('[App] Logout response:', data);
      }

      // Clear state
      setIsLoggedIn(false);
      setToken(null);
      setUser(null);
      setSettings(null);
      setUsername('');
      setPassword('');
      setSuccess('Logged out successfully!');
    } catch (err) {
      console.error('[App] Logout error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn && user) {
    return (
      <div className="container">
        <h1>Exercise 04 - Authentication</h1>
        <p className="subtitle">Logged in as {user.username}</p>

        {error && <div className="error">Error: {error}</div>}
        {success && <div className="success">{success}</div>}

        <div className="profile-view">
          <div className="profile-info">
            <h2>Profile Information</h2>
            <div className="profile-field">
              <strong>Username:</strong>
              <span>{user.username}</span>
            </div>
            <div className="profile-field">
              <strong>Email:</strong>
              <span>{user.email}</span>
            </div>
            <div className="profile-field">
              <strong>Role:</strong>
              <span>{user.role}</span>
            </div>
          </div>

          {settings && (
            <div className="settings-section">
              <h3>Settings</h3>
              <div className="setting-item">
                <strong>Theme:</strong>
                <span>{settings.theme}</span>
              </div>
              <div className="setting-item">
                <strong>Notifications:</strong>
                <span>{settings.notifications ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="setting-item">
                <strong>Language:</strong>
                <span>{settings.language}</span>
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button onClick={fetchSettings} disabled={loading}>
              {settings ? 'Reload Settings' : 'Load Settings'}
            </button>
            <button onClick={handleLogout} disabled={loading} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Exercise 04 - Authentication</h1>
      <p className="subtitle">Login to continue</p>

      {error && <div className="error">Error: {error}</div>}
      {success && <div className="success">{success}</div>}

      {loading && <div className="loading">Loading...</div>}

      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password (any value)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>

      <div className="demo-credentials">
        <strong>Demo Credentials:</strong>
        <div>Username: john_doe (any password)</div>
        <div>Username: admin (any password)</div>
      </div>
    </div>
  );
}

export default App
