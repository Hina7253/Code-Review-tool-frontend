import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo">☕</span>
        <span className="brand-text">Java Code Analyzer Pro</span>
      </div>
      
      <div className="navbar-user">
        <span className="user-name">👋 {user?.username}</span>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;