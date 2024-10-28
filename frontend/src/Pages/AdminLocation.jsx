import React, { useState, useEffect } from 'react';
import '../Css/admin.css';

export default function AdminLocations() {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({ name: '', address: '', type: 'Oficina' });

  useEffect(() => {
    // Aquí iría la lógica para obtener las sedes del servidor
    setLocations([
      { id: 1, name: 'Sede Principal', address: 'Calle 123, Bogotá', type: 'Oficina' },
      { id: 2, name: 'Aeropuerto El Dorado', address: 'Aeropuerto Internacional El Dorado, Bogotá', type: 'Aeropuerto' },
    ]);
  }, []);

  const handleInputChange = (e) => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  };

  const handleAddLocation = (e) => {
    e.preventDefault();
    if (newLocation.name && newLocation.address) {
      setLocations([...locations, { ...newLocation, id: Date.now() }]);
      setNewLocation({ name: '', address: '', type: 'Oficina' });
      // Aquí iría la lógica para enviar la nueva sede al servidor
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="admin-title">Administración de Sedes</h1>
      </header>
      <main className="admin-content">
        <form onSubmit={handleAddLocation} className="admin-form">
          <h2>Agregar Nueva Sede</h2>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newLocation.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Dirección:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={newLocation.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Tipo:</label>
            <select
              id="type"
              name="type"
              value={newLocation.type}
              onChange={handleInputChange}
            >
              <option value="Oficina">Oficina</option>
              <option value="Aeropuerto">Aeropuerto</option>
              <option value="Centro de mantenimiento">Centro de mantenimiento</option>
            </select>
          </div>
          <button type="submit" className="btn">Agregar Sede</button>
        </form>
        <h2>Lista de Sedes</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {locations.map(location => (
              <tr key={location.id}>
                <td>{location.id}</td>
                <td>{location.name}</td>
                <td>{location.address}</td>
                <td>{location.type}</td>
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