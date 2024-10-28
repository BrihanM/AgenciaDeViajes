import React, { useState, useEffect } from 'react';
import '../Css/admin.css';

export default function AdminAirplanes() {
  const [airplanes, setAirplanes] = useState([]);
  const [newAirplane, setNewAirplane] = useState({ model: '', capacity: '', status: 'Activo' });

  useEffect(() => {
    // Aquí iría la lógica para obtener los aviones del servidor
    setAirplanes([
      { id: 1, model: 'Boeing 737', capacity: 150, status: 'Activo' },
      { id: 2, model: 'Airbus A320', capacity: 180, status: 'En mantenimiento' },
    ]);
  }, []);

  const handleInputChange = (e) => {
    setNewAirplane({ ...newAirplane, [e.target.name]: e.target.value });
  };

  const handleAddAirplane = (e) => {
    e.preventDefault();
    if (newAirplane.model && newAirplane.capacity) {
      setAirplanes([...airplanes, { ...newAirplane, id: Date.now() }]);
      setNewAirplane({ model: '', capacity: '', status: 'Activo' });
      // Aquí iría la lógica para enviar el nuevo avión al servidor
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="admin-title">Administración de Aviones</h1>
      </header>
      <main className="admin-content">
        <form onSubmit={handleAddAirplane} className="admin-form">
          <h2>Agregar Nuevo Avión</h2>
          <div className="form-group">
            <label htmlFor="model">Modelo:</label>
            <input
              type="text"
              id="model"
              name="model"
              value={newAirplane.model}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacidad:</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={newAirplane.capacity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Estado:</label>
            <select
              id="status"
              name="status"
              value={newAirplane.status}
              onChange={handleInputChange}
            >
              <option value="Activo">Activo</option>
              <option value="En mantenimiento">En mantenimiento</option>
              <option value="Fuera de servicio">Fuera de servicio</option>
            </select>
          </div>
          <button type="submit" className="btn">Agregar Avión</button>
        </form>
        <h2>Lista de Aviones</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Modelo</th>
              <th>Capacidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {airplanes.map(airplane => (
              <tr key={airplane.id}>
                <td>{airplane.id}</td>
                <td>{airplane.model}</td>
                <td>{airplane.capacity}</td>
                <td>{airplane.status}</td>
                <td>
                  <button className="action-btn">Editar</button>
                  <button className="action-btn">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}