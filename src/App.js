import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import ProtectedRoute from './components/shared/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, clearUser } from './redux/slices/authSlice';

// Lazy loading components for better performance
const Login = lazy(() => import('./components/Auth/Login'));
const Signup = lazy(() => import('./components/Auth/Signup'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Firebase Authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid } = user;
        dispatch(setUser({ uid, fullName: displayName, email, profession: 'Unknown' }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Define the routes
  const publicRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/', element: isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" /> },
  ];

  const protectedRoutes = [
    { path: '/dashboard', element: <Dashboard /> },
  ];

  return (
    <div style={{ position: 'relative' }}>
      {isAuthenticated && (
        <div style={{ position: 'fixed', width: '100%', zIndex: '1000' }}>
          <Navbar />
        </div>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={!isAuthenticated ? route.element : <Navigate to="/dashboard" />}
            />
          ))}

          {protectedRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<ProtectedRoute>{route.element}</ProtectedRoute>}
            />
          ))}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
