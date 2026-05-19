import { useState } from 'react';

export function JokeGenerator() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('any');
  const [favorites, setFavorites] = useState([]);

  const categories = ['any', 'general', 'knock-knock', 'programming', 'miscellaneous'];

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = category === 'any'
        ? 'https://api.api-ninjas.com/v1/jokes?limit=1'
        : `https://official-joke-api.appspot.com/jokes/${category}/random`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch joke');

      const data = await response.json();

      // Handle different API response formats
      if (Array.isArray(data)) {
        setJoke(data[0]);
      } else {
        setJoke(data);
      }
    } catch (err) {
      setError(err.message || 'Could not fetch joke. Try again!');
      setJoke(null);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (joke && !favorites.find(j => j.id === joke.id)) {
      setFavorites([...favorites, { ...joke, savedAt: new Date().toLocaleString() }]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(j => j.id !== id));
  };

  const displayJoke = () => {
    if (joke.setup && joke.punchline) {
      return (
        <>
          <div style={styles.setupPunchline}>
            <p style={styles.setup}>{joke.setup}</p>
            <p style={styles.punchline}>🎭 {joke.punchline}</p>
          </div>
        </>
      );
    }
    return <p style={styles.jokeText}>{joke.joke || JSON.stringify(joke)}</p>;
  };

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <h1 style={styles.title}>😂 Joke Generator</h1>
        <p style={styles.subtitle}>Get a random laugh every time!</p>
      </div>

      {/* Category Selector */}
      <div style={styles.card}>
        <label style={styles.label}>Choose Category:</label>
        <div style={styles.categoryGrid}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                ...styles.categoryBtn,
                background: category === cat ? '#00d4aa' : '#101a1a',
                color: category === cat ? '#000' : '#aaa',
                border: category === cat ? 'none' : '1px solid #1e2a2a'
              }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={fetchJoke}
        disabled={loading}
        style={{
          ...styles.fetchBtn,
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'wait' : 'pointer'
        }}
      >
        {loading ? '⏳ Getting a joke...' : '🎲 Get a Joke!'}
      </button>

      {/* Error Message */}
      {error && (
        <div style={styles.errorBox}>
          <p>⚠️ {error}</p>
        </div>
      )}

      {/* Joke Display */}
      {joke && !error && (
        <div style={styles.jokeCard}>
          <div style={styles.jokeContent}>
            {displayJoke()}
          </div>
          <div style={styles.actionButtons}>
            <button onClick={addToFavorites} style={styles.favoriteBtn}>
              ⭐ Add to Favorites
            </button>
            <button onClick={fetchJoke} style={styles.nextBtn}>
              → Next Joke
            </button>
          </div>
        </div>
      )}

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div style={styles.favoritesSection}>
          <h2 style={styles.favTitle}>⭐ Your Favorites ({favorites.length})</h2>
          <div style={styles.favoritesList}>
            {favorites.map((fav, idx) => (
              <div key={idx} style={styles.favoriteItem}>
                <div>
                  <p style={styles.favoriteText}>
                    {fav.setup && fav.punchline ? `${fav.setup} - ${fav.punchline}` : fav.joke}
                  </p>
                  <p style={styles.savedTime}>Saved: {fav.savedAt}</p>
                </div>
                <button
                  onClick={() => removeFavorite(fav.id)}
                  style={styles.removeBtn}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      {!joke && !error && (
        <div style={styles.instructions}>
          <p>👉 Click "Get a Joke!" to start laughing!</p>
          <p>Choose a category or keep it random for surprises.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  root: {
    minHeight: '100vh',
    background: '#080f0f',
    color: '#eee',
    fontFamily: "'DM Sans'",
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    textAlign: 'center',
    marginBottom: 40
  },
  title: {
    fontSize: 36,
    fontWeight: 800,
    margin: '0 0 8px',
    color: '#00d4aa'
  },
  subtitle: {
    fontSize: 14,
    color: '#556',
    margin: 0
  },
  card: {
    background: '#0d1616',
    border: '1px solid #1a2828',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontWeight: 700,
    color: '#eee',
    display: 'block',
    marginBottom: 12
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10
  },
  categoryBtn: {
    padding: 12,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit'
  },
  fetchBtn: {
    width: '100%',
    maxWidth: 500,
    padding: 16,
    background: 'linear-gradient(135deg, #00d4aa, #00b894)',
    border: 'none',
    borderRadius: 14,
    color: '#000',
    fontSize: 16,
    fontWeight: 800,
    cursor: 'pointer',
    fontFamily: 'inherit',
    boxShadow: '0 4px 20px #00d4aa44',
    marginBottom: 20
  },
  jokeCard: {
    background: '#0d1616',
    border: '2px solid #00d4aa',
    borderRadius: 16,
    padding: 28,
    width: '100%',
    maxWidth: 500,
    marginBottom: 20,
    boxShadow: '0 0 30px #00d4aa22'
  },
  jokeContent: {
    marginBottom: 20
  },
  setupPunchline: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  setup: {
    fontSize: 16,
    fontWeight: 700,
    color: '#eee',
    margin: 0,
    lineHeight: 1.5
  },
  punchline: {
    fontSize: 18,
    fontWeight: 800,
    color: '#00d4aa',
    margin: 0,
    lineHeight: 1.5,
    paddingLeft: 12,
    borderLeft: '3px solid #00d4aa'
  },
  jokeText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#eee',
    margin: 0,
    lineHeight: 1.6
  },
  actionButtons: {
    display: 'flex',
    gap: 12
  },
  favoriteBtn: {
    flex: 1,
    padding: 12,
    background: '#1a3330',
    border: '1px solid #00d4aa44',
    color: '#00d4aa',
    borderRadius: 10,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s'
  },
  nextBtn: {
    flex: 1,
    padding: 12,
    background: '#00d4aa',
    border: 'none',
    color: '#000',
    borderRadius: 10,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit'
  },
  errorBox: {
    background: '#2a0f0f',
    border: '1px solid #5a1a1a',
    borderRadius: 12,
    padding: 16,
    color: '#ff6b6b',
    width: '100%',
    maxWidth: 500,
    marginBottom: 20,
    textAlign: 'center'
  },
  favoritesSection: {
    width: '100%',
    maxWidth: 500,
    marginTop: 40
  },
  favTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#00d4aa',
    margin: '0 0 16px'
  },
  favoritesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  favoriteItem: {
    background: '#0d1616',
    border: '1px solid #1a2828',
    borderRadius: 12,
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  favoriteText: {
    fontSize: 13,
    color: '#eee',
    margin: '0 0 4px',
    lineHeight: 1.5
  },
  savedTime: {
    fontSize: 11,
    color: '#445',
    margin: 0
  },
  removeBtn: {
    background: '#ff6b6b44',
    border: '1px solid #ff6b6b',
    color: '#ff6b6b',
    borderRadius: 6,
    width: 32,
    height: 32,
    fontSize: 16,
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontWeight: 700
  },
  instructions: {
    background: '#0d1616',
    border: '1px solid #1a2828',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    textAlign: 'center',
    color: '#667'
  }
};
