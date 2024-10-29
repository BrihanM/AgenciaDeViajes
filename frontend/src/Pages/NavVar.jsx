import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const userEmail = localStorage.getItem('userEmail');
      setIsLoggedIn(!!userEmail);
    };

    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Colombia Flights</Link>
      <button 
        className="navbar-toggler"
        onClick={() => setIsOpen(!isOpen)}
      >
      </button>
      <div className={`navbar-nav ${isOpen ? 'show' : ''}`}>
        {isLoggedIn ? (
          <>
            <Link to="/" className="nav-link">Principal</Link>
            <Link to="/admin-dashboard" className="nav-link">AdminDashboard</Link>
            <Link to="/perfil" className="nav-link">Mi perfil</Link>
            <button onClick={handleLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link">Principal</Link>
            <Link to="/contact" className="nav-link">Contacto</Link>
            <Link to="/register" className="nav-link">Registrarse</Link>
            <Link to="/login" className="nav-link">Iniciar Sesión</Link>
          </>
        )}
      </div>
    </nav>
  );
}