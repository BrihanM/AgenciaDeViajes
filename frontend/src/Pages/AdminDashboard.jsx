import React, { useState, useEffect } from 'react';
import '../Css/AdminDashboard.css';

export default function AdminDashboard() {
  const [newTrip, setNewTrip] = useState({ id: 0, name: '', description: '', price: 0 });
  const [activeReservations, setActiveReservations] = useState([]);
  const [stats, setStats] = useState({ users: 0, trips: 0, revenue: 0, reservations: 0 });
  const [activeTab, setActiveTab] = useState('new-trip');

  //Employees
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '', email: '' });

  //Airplanes
  const [airplanes, setAirplanes] = useState([]);
  const [newAirplane, setNewAirplane] = useState({ model: '', capacity: '', status: 'Activo' });

  //Furniture
  const [furniture, setFurniture] = useState([]);
  const [newFurniture, setNewFurniture] = useState({ name: '', location: '', condition: 'Bueno' });

  //Locations of headquarters - Sedes
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({ name: '', address: '', type: 'Oficina' });

  //Machinary
  const [machinery, setMachinery] = useState([]);
  const [newMachine, setNewMachine] = useState({ name: '', type: '', status: 'Operativo' });

  useEffect(() => {
    setActiveReservations([
      { id: 1, userId: 101, tripName: "Playa del Carmen", date: "2023-07-15", status: "Confirmada" },
      { id: 2, userId: 102, tripName: "París", date: "2023-08-22", status: "Pendiente" },
      { id: 3, userId: 103, tripName: "Tokio", date: "2023-09-10", status: "Cancelada" },
    ]);
    setStats({ users: 1250, trips: 45, revenue: 150000, reservations: 890 });
    //Logica para Employees (Empleados)
    setEmployees([
      { id: 1, name: 'Juan Pérez', position: 'Piloto', email: 'juan@example.com' },
      { id: 2, name: 'María López', position: 'Azafata', email: 'maria@example.com' },
    ]);
    //Airplanes (Aviones)
    setAirplanes([
      { id: 1, model: 'Boeing 737', capacity: 150, status: 'Activo' },
      { id: 2, model: 'Airbus A320', capacity: 180, status: 'En mantenimiento' },
    ]);
    //Furniture (Muebles)
    setFurniture([
      { id: 1, name: 'Silla de oficina', location: 'Oficina principal', condition: 'Bueno' },
      { id: 2, name: 'Escritorio', location: 'Sala de reuniones', condition: 'Regular' },
    ]);
    //Headquarters (Sedes)
    setLocations([
      { id: 1, name: 'Sede Principal', address: 'Calle 123, Bogotá', type: 'Oficina' },
      { id: 2, name: 'Aeropuerto El Dorado', address: 'Aeropuerto Internacional El Dorado, Bogotá', type: 'Aeropuerto' },
    ]);
    //Machinary (Maquinaria)
    setMachinery([
      { id: 1, name: 'Cargador de equipaje', type: 'Vehículo de tierra', status: 'Operativo' },
      { id: 2, name: 'Escalera de pasajeros', type: 'Equipo de embarque', status: 'En reparación' },
    ]);
  }, []);

  const handleNewTripChange = (e) => {
    const { name, value } = e.target;
    setNewTrip(prevTrip => ({ ...prevTrip, [name]: name === 'price' ? parseFloat(value) : value }));
  };

  const handleNewTripSubmit = (e) => {
    e.preventDefault();
    console.log('Nuevo viaje agregado:', newTrip);
    setNewTrip({ id: 0, name: '', description: '', price: 0 });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmada':
        return <span className="badge badge-green">Confirmada</span>;
      case 'Pendiente':
        return <span className="badge badge-yellow">Pendiente</span>;
      case 'Cancelada':
        return <span className="badge badge-red">Cancelada</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  //Constantes usadas en Employees (Empleados)
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

  //Constantes usadas en Airplanes
  const handleInputChangeAirplanes = (e) => {
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

  //Constantes usadas en Furniture
  const handleInputChangeFurniture = (e) => {
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

  //Constantes usadas en Location (Sedes)
  const handleInputChangeLocation = (e) => {
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

  //Constantes de machinary (Maquinaria)
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
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Panel de Administración</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Usuarios Totales</div>
          <div className="stat-value">{stats.users}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Viajes Activos</div>
          <div className="stat-value">{stats.trips}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Ingresos Totales</div>
          <div className="stat-value">${stats.revenue.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Reservas Activas</div>
          <div className="stat-value">{stats.reservations}</div>
        </div>
      </div>

      <div className="tabs">
        <div className="tab-list">
          <div 
            className={`tab ${activeTab === 'new-trip' ? 'active' : ''}`}
            onClick={() => setActiveTab('new-trip')}
          >
            Nuevo Viaje
          </div>
          <div 
            className={`tab ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            Empleados
          </div>
          <div 
            className={`tab ${activeTab === 'airplane' ? 'active' : ''}`}
            onClick={() => setActiveTab('airplane')}
          >
            Aviones
          </div>
          <div 
            className={`tab ${activeTab === 'furniture' ? 'active' : ''}`}
            onClick={() => setActiveTab('furniture')}
          >
            Muebles
          </div>
          <div 
            className={`tab ${activeTab === 'location' ? 'active' : ''}`}
            onClick={() => setActiveTab('location')}
          >
            Sedes
          </div>
          <div 
            className={`tab ${activeTab === 'machinary' ? 'active' : ''}`}
            onClick={() => setActiveTab('machinary')}
          >
            Maquinaria
          </div>
        </div>
        <div className="tab-content">
                                                            {/*Page Machinary - Lista de maquinaria*/}
          {activeTab === 'machinary' && (
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
          )}
                                                  {/*Page Locations - Lista de sedes*/}
          {activeTab === 'location' && (
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
                      onChange={handleInputChangeLocation}
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
                      onChange={handleInputChangeLocation}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Tipo:</label>
                    <select
                      id="type"
                      name="type"
                      value={newLocation.type}
                      onChange={handleInputChangeLocation}
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
          )}
                                                  {/*Page Furniture - Muebles empresariales*/}
          {activeTab === 'furniture' && (
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
                      onChange={handleInputChangeFurniture}
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
                      onChange={handleInputChangeFurniture}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="condition">Estado:</label>
                    <select
                      id="condition"
                      name="condition"
                      value={newFurniture.condition}
                      onChange={handleInputChangeFurniture}
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
          )}
                                                  {/*Page Airplane - Aviones*/}
          {activeTab === 'airplane' && (
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
                      onChange={handleInputChangeAirplanes}
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
                      onChange={handleInputChangeAirplanes}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">Estado:</label>
                    <select
                      id="status"
                      name="status"
                      value={newAirplane.status}
                      onChange={handleInputChangeAirplanes}
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
          )}
                                                  {/*Page employees - Empleados*/}
            {activeTab === 'employees' && (
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
          )}
                                                  {/*Page nuevo viaje - Viajes*/}
          {activeTab === 'new-trip' && (
            <form onSubmit={handleNewTripSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nombre del viaje</label>
                <input
                  id="name"
                  name="name"
                  value={newTrip.name}
                  onChange={handleNewTripChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="description">Descripción</label>
                <input
                  id="description"
                  name="description"
                  value={newTrip.description}
                  onChange={handleNewTripChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="price">Precio</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={newTrip.price}
                  onChange={handleNewTripChange}
                  required
                  className="form-input"
                />
              </div>
              <button type="submit" className="submit-button">Agregar Viaje</button>
                <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Usuario ID</th>
                    <th>Destino</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {activeReservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>{reservation.id}</td>
                      <td>{reservation.userId}</td>
                      <td>{reservation.tripName}</td>
                      <td>{reservation.date}</td>
                      <td>{getStatusBadge(reservation.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}