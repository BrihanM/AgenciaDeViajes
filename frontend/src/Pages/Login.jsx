import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../CSS/Login.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  /*Se define el componente Login
    Se crean dos estados: username y password usando useState
    Se inicializa navigate para poder redirigir al usuario después del login
  */

  // Login.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8085/api/login', { username, password });
    if (response.data.success) {
      localStorage.setItem('userEmail', username);
      // Dispara un evento para notificar cambios en el localStorage
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    } else {
      alert('Correo o contraseña inválidos');
    }
  } catch (error) {
    console.error('Error durante el login:', error);
    alert('Ha ocurrido un error durante el login');
  }
};
  /*handleSubmit es una función asíncrona que se ejecuta cuando se envía el formulario
    Previene el comportamiento por defecto del formulario
    Hace una petición POST al servidor con el username y password
    Si la respuesta es exitosa, redirige al usuario a la página principal y guarda el email en localStorage
    Si hay un error, muestra una alerta
  */

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2 className={styles.loginTitle}>Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Correo:</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Correo electrónico"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Contraseña:</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.loginButton}>Iniciar Sesión</button>
        </form>
        <div className={styles.registerLink}>
          <p>¿No tienes cuenta? <a href="/register" className={styles.registerLinkAnchor}>Regístrate</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;