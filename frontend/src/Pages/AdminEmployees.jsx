import React, { useState, useEffect } from 'react';
import '../Css/admin.css';

export default function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '', email: '' });

  useEffect(() => {
    // Aquí iría la lógica para obtener los empleados del servidor
    setEmployees([
      { id: 1, name: 'Juan Pérez', position: 'Piloto', email: 'juan@example.com' },
      { id: 2, name: 'María López', position: 'Azafata', email: 'maria@example.com' },
    ]);
  }, []);

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (newEmployee.name && newEmployee.position && newEmployee.email) {
      setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
      setNewEmployee({ name: '', position: '', email: '' });
      // Aquí iría la lógica para enviar el nuevo empleado al servidor
    }
  };
  

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="admin-title">Administración de Empleados</h1>
      </header>
      <main className="admin-content">
        <form onSubmit={handleAddEmployee} className="admin-form">
          <h2>Agregar Nuevo Empleado</h2>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">Cargo:</label>
            <input
              type="text"
              id="position"
              name="position"
              value={newEmployee.position}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newEmployee.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn">Agregar Empleado</button>
        </form>
        <h2>Lista de Empleados</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Correo electrónico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.email}</td>
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