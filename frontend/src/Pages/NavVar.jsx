import React, { useState,useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import '../Css/Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica el estado de autenticación cuando el componente se monta
    const checkAuthStatus = () => {
      const userEmail = localStorage.getItem('userEmail');
      setIsLoggedIn(!!userEmail); // Convierte a booleano
    };

    checkAuthStatus();
    // Agrega un event listener para actualizar el estado cuando cambie el localStorage
    window.addEventListener('storage', checkAuthStatus);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Limpia todo el localStorage
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-md">
      <div className="container">
        <Link to="/" className="navbar-brand">Colombia Flights</Link>
        <button 
          className="navbar-toggler"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          {isLoggedIn ?(
            <>
            <Link to="/admin-dashboard" className="nav-link">AdminDashboard</Link>
            <Link to="/perfil" className="nav-link">Mi perfil</Link>
            <button 
                onClick={handleLogout}
                className="logout-button"
              >
                Cerrar Sesión
              </button>
          </>
          ):(
            <>
              <Link to="/contact" className="nav-link">Contacto</Link>
              <Link to="/register" className="nav-link">Registrarse</Link>
              <Link to="/login" className="nav-link">Iniciar Sesión</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}