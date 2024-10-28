import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../CSS/Register.module.css';

function Register() {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8085/api/register', {
        cedula,
        nombre,
        apellido,
        telefono,
        correo,
        contraseña
      });
      if (response.data.success) {
        alert('Registro exitoso');
        navigate('/login');
      } else {
        alert('Error en el registro: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
      alert('Ocurrió un error durante el registro');
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <h2 className={styles.registerTitle}>Registro</h2>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.registerFormGroup}>
            <label className={styles.registerLabel}>Cédula</label>
            <input
              className={styles.registerInput}
              type="text"
              placeholder="Cédula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
          </div>
          <div className={styles.registerFormGroup}>
            <label className={styles.registerLabel}>Nombre</label>
            <input
              className={styles.registerInput}
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className={styles.registerFormGroup}>
            <label className={styles.registerLabel}>Apellido</label>
            <input
              className={styles.registerInput}
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className={styles.registerFormGroup}>
            <label className={styles.registerLabel}>Teléfono</label>
            <input
              className={styles.registerInput}
              type="tel"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div className={styles.registerFormGroup}>
            <label className={styles.registerLabel}>Correo</label>
            <input
              className={styles.registerInput}
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className={styles.registerFormGroup}>
            <label className={styles.registerLabel}>Contraseña</label>
            <input
              className={styles.registerInput}
              type="password"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.registerButton}>Registrarse</button>
        </form>
        <div className={styles.loginLink}>
          <p>¿Ya tienes una cuenta? <a href="/login" className={styles.loginLinkAnchor}>Inicia sesión</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;