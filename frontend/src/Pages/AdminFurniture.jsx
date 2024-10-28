import React, { useState, useEffect } from 'react';
import '../Css/admin.css';

export default function AdminFurniture() {
  const [furniture, setFurniture] = useState([]);
  const [newFurniture, setNewFurniture] = useState({ name: '', location: '', condition: 'Bueno' });

  useEffect(() => {
    // Aquí iría la lógica para obtener los muebles del servidor
    setFurniture([
      { id: 1, name: 'Silla de oficina', location: 'Oficina principal', condition: 'Bueno' },
      { id: 2, name: 'Escritorio', location: 'Sala de reuniones', condition: 'Regular' },
    ]);
  }, []);

  const handleInputChange = (e) => {
    setNewFurniture({ ...newFurniture, [e.target.name]: e.target.value });
  };

  const handleAddFurniture = (e) => {
    e.preventDefault();
    if (newFurniture.name && newFurniture.location) {
      setFurniture([...furniture, { ...newFurniture, id: Date.now() }]);
      setNewFurniture({ name: '', location: '', condition: 'Bueno' });
      // Aquí iría la lógica para enviar el nuevo mueble al servidor
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="admin-title">Administración de Muebles</h1>
      </header>
      <main className="admin-content">
        <form onSubmit={handleAddFurniture} className="admin-form">
          <h2>Agregar Nuevo Mueble</h2>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newFurniture.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Ubicación:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={newFurniture.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="condition">Estado:</label>
            <select
              id="condition"
              name="condition"
              value={newFurniture.condition}
              onChange={handleInputChange}
            >
              <option value="Bueno">Bueno</option>
              <option value="Regular">Regular</option>
              <option value="Malo">Malo</option>
            </select>
          </div>
          <button type="submit" className="btn">Agregar Mueble</button>
        </form>
        <h2>Lista de Muebles</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Ubicación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {furniture.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.location}</td>
                <td>{item.condition}</td>
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