import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/shared/Navbar';
import ProtectedRoute from './components/shared/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, clearUser } from './redux/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

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

  const routes = [
    {
      path: '/daily-expense-tracker-ai',
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />,
      protected: false,
    },
    {
      path: 'daily-expense-tracker-ai/login',
      element: !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />,
      protected: false,
    },
    {
      path: 'daily-expense-tracker-ai/signup',
      element: !isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />,
      protected: false,
    },
    {
      path: 'daily-expense-tracker-ai/dashboard',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      protected: true,
    },

  ];

  return (
    <div style={{position:'relative'}}>
      {isAuthenticated && <div style={{position:'fixed',width:'100%',zIndex:'1000'}}><Navbar /></div>}
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
