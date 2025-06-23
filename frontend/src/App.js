import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import OrderProducts from './pages/OrderProducts';
import Registration from './pages/Registration';
import CartPage from './pages/CartPage';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          
          <Route
            path="/"
            element={<Home user={user} setUser={setUser} />}
          />

          <Route
            path="/login"
            element={
              <PublicRoute user={user}>
                <Login setUser={setUser} />
              </PublicRoute>
            }
          />

          <Route
            path="/registration"
            element={
              <PublicRoute user={user}>
                <Registration setUser={setUser} />
              </PublicRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <OrderProducts user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <CartPage user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

