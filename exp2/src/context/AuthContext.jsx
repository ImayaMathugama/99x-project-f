// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (username, password) => {
    if (username === 'admin' && password === '123') {
      const userData = { username, role: 'admin' };
      setUser(userData);
      navigate('/dashboard');
    } else if (username === 'user' && password === '123') {
      const userData = { username, role: 'user' };
      setUser(userData);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        role: user?.role || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
