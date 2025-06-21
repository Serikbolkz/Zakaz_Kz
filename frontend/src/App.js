import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import PublicRoute from './components/PublicRoute';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Home is public — anyone can access it */}
        <Route
          path="/"
          element={<Home user={user} setUser={setUser} />}
        />

        {/* Login is restricted for logged-in users */}
        <Route
          path="/login"
          element={
            <PublicRoute user={user}>
              <Login setUser={setUser} />
            </PublicRoute>
          }
        />

        {/* Registration is restricted for logged-in users */}
        <Route
          path="/registration"
          element={
            <PublicRoute user={user}>
              <Registration setUser={setUser} />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

