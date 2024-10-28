import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from '../CSS/Perfil.module.css';

function Perfil() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await axios.get(`http://localhost:8085/api/user/${userEmail}`);
      setUser(response.data);
      setEditedUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setMessage('Error al cargar los datos del usuario');
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8085/api/user/${user.correo}`, editedUser);
      setUser(response.data);
      setEditing(false);
      setMessage('Perfil actualizado con éxito');
      // Actualizar el correo en el localStorage si ha cambiado
      if (response.data.correo !== user.correo) {
        localStorage.setItem('userEmail', response.data.correo);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      setMessage('Error al actualizar el perfil');
    }
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  if (!user) return <div className={styles.perfilPage}>Cargando...</div>;

  return (
    <div className={styles.perfilPage}>
      <div className={styles.perfilContainer}>
        <h2 className={styles.perfilTitle}>Perfil de Usuario</h2>
        {message && <div className={styles.message}>{message}</div>}
        {!editing ? (
          <div className={styles.perfilInfo}>
            <div className={styles.infoItem}><span className={styles.label}>Nombre:</span> <span className={styles.value}>{user.Nombre}</span></div>
            <div className={styles.infoItem}><span className={styles.label}>Apellido:</span> <span className={styles.value}>{user.Apellido}</span></div>
            <div className={styles.infoItem}><span className={styles.label}>Cédula:</span> <span className={styles.value}>{user.Cedula}</span></div>
            <div className={styles.infoItem}><span className={styles.label}>Teléfono:</span> <span className={styles.value}>{user.telefono}</span></div>
            <div className={styles.infoItem}><span className={styles.label}>Correo:</span> <span className={styles.value}>{user.correo}</span></div>
            <button onClick={handleEdit} className={styles.editButton}>Editar Perfil</button>
          </div>
        ) : (
          <form className={styles.editForm} onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nombre:</label>
              <input className={styles.input} type="text" name="Nombre" value={editedUser.Nombre} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Apellido:</label>
              <input className={styles.input} type="text" name="Apellido" value={editedUser.Apellido} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Teléfono:</label>
              <input className={styles.input} type="text" name="telefono" value={editedUser.telefono} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Correo:</label>
              <input className={styles.input} type="email" name="correo" value={editedUser.correo} onChange={handleChange} />
            </div>
            <button type="submit" className={styles.saveButton}>Guardar Cambios</button>
            <button type="button" onClick={() => setEditing(false)} className={styles.cancelButton}>Cancelar</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Perfil;