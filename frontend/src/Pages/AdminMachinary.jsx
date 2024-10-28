import React, { useState, useEffect } from 'react';
import '../Css/admin.css';

export default function AdminMachinery() {
  const [machinery, setMachinery] = useState([]);
  const [newMachine, setNewMachine] = useState({ name: '', type: '', status: 'Operativo' });

  useEffect(() => {
    // Aquí iría la lógica para obtener la maquinaria del servidor
    setMachinery([
      { id: 1, name: 'Cargador de equipaje', type: 'Vehículo de tierra', status: 'Operativo' },
      { id: 2, name: 'Escalera de pasajeros', type: 'Equipo de embarque', status: 'En reparación' },
    ]);
  }, []);

  const handleInputChangeMachinary = (e) => {
    setNewMachine({ ...newMachine, [e.target.name]: e.target.value });
  };

  const handleAddMachine = (e) => {
    e.preventDefault();
    if (newMachine.name && newMachine.type) {
      setMachinery([...machinery, { ...newMachine, id: Date.now() }]);
      setNewMachine({ name: '', type: '', status: 'Operativo' });
      // Aquí iría la lógica para enviar la nueva maquinaria al servidor
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="admin-title">Administración de Maquinaria</h1>
      </header>
      <main className="admin-content">
        <form onSubmit={handleAddMachine} className="admin-form">
          <h2>Agregar Nueva Maquinaria</h2>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              
              value={newMachine.name}
              onChange={handleInputChangeMachinary}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Tipo:</label>
            <input
              type="text"
              id="type"
              name="type"
              value={newMachine.type}
              onChange={handleInputChangeMachinary}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Estado:</label>
            <select
              id="status"
              name="status"
              value={newMachine.status}
              onChange={handleInputChangeMachinary}
            >
              <option value="Operativo">Operativo</option>
              <option value="En reparación">En reparación</option>
              <option value="Fuera de servicio">Fuera de servicio</option>
            </select>
          </div>
          <button type="submit" className="btn">Agregar Maquinaria</button>
        </form>
        <h2>Lista de Maquinaria</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {machinery.map(machine => (
              <tr key={machine.id}>
                <td>{machine.id}</td>
                <td>{machine.name}</td>
                <td>{machine.type}</td>
                <td>{machine.status}</td>
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