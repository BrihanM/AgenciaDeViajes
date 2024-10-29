import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/AdminDashboard.css';

export default function AdminDashboard() {
  const [newTrip, setNewTrip] = useState({ id: 0, name: '', description: '', price: 0 });
  const [activeReservations, setActiveReservations] = useState([]);
  const [stats, setStats] = useState({ users: 0, trips: 0, revenue: 0, reservations: 0 });
  const [activeTab, setActiveTab] = useState('new-trip');

  //Employees - Empleados
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    Cedula: '',
    Tipo_Documento: '',
    Primer_Nombre: '',
    Segundo_Nombre: '',
    Primer_Apellido: '',
    Segundo_Apellido: '',
    Fecha_Nacimiento: ''
  });
  const [editingEmployee, setEditingEmployee] = useState(null);

  //Airplanes
  const [airplanes, setAirplanes] = useState([]);
  const [newAirplane, setNewAirplane] = useState({
    Modelo: '',
    Fabricante: '',
    Año_Fabricacion: '',
    Numero_Asientos: '',
    Capacidad_Carga: '',
    NIT_ContratistaFK: ''
  });
  const [editingAirplane, setEditingAirplane] = useState(null);

  //Furniture
  const [furniture, setFurniture] = useState([]);
  const [newFurniture, setNewFurniture] = useState({
    Id_CategoriaFK: '',
    Sucursal_IdFK: '',
    Fecha_Adquisicion: '',
    Costo: '',
    Cantidad: ''
  });
  const [editingFurniture, setEditingFurniture] = useState(null);

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
    if (activeTab === 'employees') {
      fetchEmployees();
    }
    //Airplanes (Aviones)
    if (activeTab === 'airplane') {
      fetchAirplanes();
    }
    //Furniture (Muebles)
    if (activeTab === 'furniture') {
      fetchFurniture();
    }
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
  }, [activeTab]);

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
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleInputChangeEmployee = (e) => {
    const { name, value } = e.target;
    if (editingEmployee) {
      setEditingEmployee({ ...editingEmployee, [name]: value });
    } else {
      setNewEmployee({ ...newEmployee, [name]: value });
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8085/api/employees', newEmployee);
      fetchEmployees();
      setNewEmployee({
        Cedula: '',
        Tipo_Documento: '',
        Primer_Nombre: '',
        Segundo_Nombre: '',
        Primer_Apellido: '',
        Segundo_Apellido: '',
        Fecha_Nacimiento: ''
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8085/api/employees/${editingEmployee.Cedula}`, editingEmployee);
      fetchEmployees();
      setEditingEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (cedula) => {
    try {
      await axios.delete(`http://localhost:8085/api/employees/${cedula}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  //Constantes usadas en Airplanes
  const fetchAirplanes = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/airplanes');
      setAirplanes(response.data);
    } catch (error) {
      console.error('Error fetching airplanes:', error);
    }
  };

  const handleInputChangeAirplane = (e) => {
    const { name, value } = e.target;
    if (editingAirplane) {
      setEditingAirplane({ ...editingAirplane, [name]: value });
    } else {
      setNewAirplane({ ...newAirplane, [name]: value });
    }
  };

  const handleAddAirplane = async (e) => {
    e.preventDefault();
    const formattedAirplane = {
      ...newAirplane,
      Año_Fabricacion: newAirplane.Año_Fabricacion ? new Date(newAirplane.Año_Fabricacion).toISOString().split('T')[0] : null,
      Numero_Asientos: parseInt(newAirplane.Numero_Asientos),
      Capacidad_Carga: parseFloat(newAirplane.Capacidad_Carga)
    };
    try {
      await axios.post('http://localhost:8085/api/airplanes', formattedAirplane);
      fetchAirplanes();
      setNewAirplane({
        Modelo: '',
        Fabricante: '',
        Año_Fabricacion: '',
        Numero_Asientos: '',
        Capacidad_Carga: '',
        NIT_ContratistaFK: ''
      });
    } catch (error) {
      console.error('Error al añadir el avion:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditAirplane = (airplane) => {
    setEditingAirplane(airplane);
  };

  const handleUpdateAirplane = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8085/api/airplanes/${editingAirplane.Id_Avion}`, editingAirplane);
      fetchAirplanes();
      setEditingAirplane(null);
    } catch (error) {
      console.error('Error al actualizar el avion:', error);
    }
  };

  const handleDeleteAirplane = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/api/airplanes/${id}`);
      fetchAirplanes();
    } catch (error) {
      console.error('Error al eliminar el avion:', error);
    }
  };

  //Constantes usadas en Furniture
  const fetchFurniture = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/furniture');
      setFurniture(response.data);
    } catch (error) {
      console.error('Error fetching furniture:', error);
    }
  };

  const handleInputChangeFurniture = (e) => {
    const { name, value } = e.target;
    if (editingFurniture) {
      setEditingFurniture({ ...editingFurniture, [name]: value });
    } else {
      setNewFurniture({ ...newFurniture, [name]: value });
    }
  };

  const handleAddFurniture = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8085/api/furniture', newFurniture);
      fetchFurniture();
      setNewFurniture({
        Id_CategoriaFK: '',
        Sucursal_IdFK: '',
        Fecha_Adquisicion: '',
        Costo: '',
        Cantidad: ''
      });
    } catch (error) {
      console.error('Error adding furniture:', error);
    }
  };

  const handleEditFurniture = (furniture) => {
    setEditingFurniture(furniture);
  };

  const handleUpdateFurniture = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8085/api/furniture/${editingFurniture.Id_Mueble}`, editingFurniture);
      fetchFurniture();
      setEditingFurniture(null);
    } catch (error) {
      console.error('Error updating furniture:', error);
    }
  };

  const handleDeleteFurniture = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/api/furniture/${id}`);
      fetchFurniture();
    } catch (error) {
      console.error('Error deleting furniture:', error);
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
              <div className="furniture-section">
              <h2>Gestión de Muebles</h2>
              <form onSubmit={editingFurniture ? handleUpdateFurniture : handleAddFurniture}>
                <div className="form-group">
                  <label>Categoría ID:</label>
                  <input
                    type="text"
                    name="Id_CategoriaFK"
                    value={editingFurniture ? editingFurniture.Id_CategoriaFK : newFurniture.Id_CategoriaFK}
                    onChange={handleInputChangeFurniture}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Sucursal ID:</label>
                  <input
                    type="text"
                    name="Sucursal_IdFK"
                    value={editingFurniture ? editingFurniture.Sucursal_IdFK : newFurniture.Sucursal_IdFK}
                    onChange={handleInputChangeFurniture}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Fecha de Adquisición:</label>
                  <input
                    type="date"
                    name="Fecha_Adquisicion"
                    value={editingFurniture ? editingFurniture.Fecha_Adquisicion : newFurniture.Fecha_Adquisicion}
                    onChange={handleInputChangeFurniture}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Costo:</label>
                  <input
                    type="number"
                    name="Costo"
                    value={editingFurniture ? editingFurniture.Costo : newFurniture.Costo}
                    onChange={handleInputChangeFurniture}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Cantidad:</label>
                  <input
                    type="number"
                    name="Cantidad"
                    value={editingFurniture ? editingFurniture.Cantidad : newFurniture.Cantidad}
                    onChange={handleInputChangeFurniture}
                    required
                  />
                </div>
                <button type="submit">{editingFurniture ? 'Actualizar' : 'Agregar'} Mueble</button>
              </form>
          
              <h3>Lista de Muebles</h3>
              <table className='furniture-table'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Categoría ID</th>
                    <th>Sucursal ID</th>
                    <th>Fecha de Adquisición</th>
                    <th>Costo</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {furniture.map(item => (
                    <tr key={item.Id_Mueble}>
                      <td>{item.Id_Mueble}</td>
                      <td>{item.Id_CategoriaFK}</td>
                      <td>{item.Sucursal_IdFK}</td>
                      <td>{item.Fecha_Adquisicion}</td>
                      <td>{item.Costo}</td>
                      <td>{item.Cantidad}</td>
                      <td>
                        <button onClick={() => handleEditFurniture(item)}>Editar</button>
                        <button onClick={() => handleDeleteFurniture(item.Id_Mueble)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
                                                  {/*Page Airplane - Aviones*/}
          {activeTab === 'airplane' && (
              <div className="admin-container">
              <header className="admin-header">
                <h1 className="admin-title">Administración de Aviones</h1>
              </header>
              <main className="admin-content">
                <form onSubmit={editingAirplane ? handleUpdateAirplane : handleAddAirplane} className="admin-form">
                  <h2>{editingAirplane ? 'Editar Avión' : 'Agregar Nuevo Avión'}</h2>
                  <div className="form-group">
                    <label htmlFor="Modelo">Modelo:</label>
                    <input
                      type="text"
                      id="Modelo"
                      name="Modelo"
                      value={editingAirplane ? editingAirplane.Modelo : newAirplane.Modelo}
                      onChange={handleInputChangeAirplane}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Fabricante">Fabricante:</label>
                    <input
                      type="text"
                      id="Fabricante"
                      name="Fabricante"
                      value={editingAirplane ? editingAirplane.Fabricante : newAirplane.Fabricante}
                      onChange={handleInputChangeAirplane}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Año_Fabricacion">Año de Fabricación:</label>
                    <input
                      type="date"
                      id="Año_Fabricacion"
                      name="Año_Fabricacion"
                      value={editingAirplane 
                        ? (editingAirplane.Año_Fabricacion ? editingAirplane.Año_Fabricacion.split('T')[0] : '')
                        : (newAirplane.Año_Fabricacion ? newAirplane.Año_Fabricacion.split('T')[0] : '')
                      }
                      onChange={handleInputChangeAirplane}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Numero_Asientos">Número de Asientos:</label>
                    <input
                      type="number"
                      id="Numero_Asientos"
                      name="Numero_Asientos"
                      value={editingAirplane ? editingAirplane.Numero_Asientos : newAirplane.Numero_Asientos}
                      onChange={handleInputChangeAirplane}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Capacidad_Carga">Capacidad de Carga:</label>
                    <input
                      type="number"
                      id="Capacidad_Carga"
                      name="Capacidad_Carga"
                      value={editingAirplane ? editingAirplane.Capacidad_Carga : newAirplane.Capacidad_Carga}
                      onChange={handleInputChangeAirplane}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="NIT_ContratistaFK">NIT Contratista:</label>
                    <input
                      type="number"
                      id="NIT_ContratistaFK"
                      name="NIT_ContratistaFK"
                      value={editingAirplane ? editingAirplane.NIT_ContratistaFK : newAirplane.NIT_ContratistaFK}
                      onChange={handleInputChangeAirplane}
                      required
                    />
                  </div>
                  <button type="submit" className="btn">
                    {editingAirplane ? 'Actualizar Avión' : 'Agregar Avión'}
                  </button>
                  {editingAirplane && (
                    <button type="button" className="btn" onClick={() => setEditingAirplane(null)}>
                      Cancelar Edición
                    </button>
                  )}
                </form>
                <h2>Lista de Aviones</h2>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Modelo</th>
                      <th>Fabricante</th>
                      <th>Año de Fabricación</th>
                      <th>Número de Asientos</th>
                      <th>Capacidad de Carga</th>
                      <th>NIT Contratista</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {airplanes.map(airplane => (
                      <tr key={airplane.Id_Avion}>
                        <td>{airplane.Id_Avion}</td>
                        <td>{airplane.Modelo}</td>
                        <td>{airplane.Fabricante}</td>
                        <td>{airplane.Año_Fabricacion}</td>
                        <td>{airplane.Numero_Asientos}</td>
                        <td>{airplane.Capacidad_Carga}</td>
                        <td>{airplane.NIT_ContratistaFK}</td>
                        <td>
                          <button className="action-btn" onClick={() => handleEditAirplane(airplane)}>Editar</button>
                          <button className="action-btn" onClick={() => handleDeleteAirplane(airplane.Id_Avion)}>Eliminar</button>
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
              <div className="employees-section">
              <h2>Gestión de Empleados</h2>
              <form onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}>
                <input
                  type="text"
                  name="Cedula"
                  value={editingEmployee ? editingEmployee.Cedula : newEmployee.Cedula}
                  onChange={handleInputChangeEmployee}
                  placeholder="Cédula"
                  required
                />
                <input
                  type="text"
                  name="Tipo_Documento"
                  value={editingEmployee ? editingEmployee.Tipo_Documento : newEmployee.Tipo_Documento}
                  onChange={handleInputChangeEmployee}
                  placeholder="Tipo de Documento"
                  required
                />
                <input
                  type="text"
                  name="Primer_Nombre"
                  value={editingEmployee ? editingEmployee.Primer_Nombre : newEmployee.Primer_Nombre}
                  onChange={handleInputChangeEmployee}
                  placeholder="Primer Nombre"
                  required
                />
                <input
                  type="text"
                  name="Segundo_Nombre"
                  value={editingEmployee ? editingEmployee.Segundo_Nombre : newEmployee.Segundo_Nombre}
                  onChange={handleInputChangeEmployee}
                  placeholder="Segundo Nombre"
                />
                <input
                  type="text"
                  name="Primer_Apellido"
                  value={editingEmployee ? editingEmployee.Primer_Apellido : newEmployee.Primer_Apellido}
                  onChange={handleInputChangeEmployee}
                  placeholder="Primer Apellido"
                  required
                />
                <input
                  type="text"
                  name="Segundo_Apellido"
                  value={editingEmployee ? editingEmployee.Segundo_Apellido : newEmployee.Segundo_Apellido}
                  onChange={handleInputChangeEmployee}
                  placeholder="Segundo Apellido"
                />
                <input
                  type="date"
                  name="Fecha_Nacimiento"
                  value={editingEmployee ? editingEmployee.Fecha_Nacimiento : newEmployee.Fecha_Nacimiento}
                  onChange={handleInputChangeEmployee}
                  required
                />
                <button type="submit">{editingEmployee ? 'Actualizar Empleado' : 'Agregar Empleado'}</button>
                {editingEmployee && (
                  <button type="button" onClick={() => setEditingEmployee(null)}>Cancelar Edición</button>
                )}
              </form>
          
              <table>
                <thead>
                  <tr>
                    <th>Cédula</th>
                    <th>Tipo de Documento</th>
                    <th>Primer Nombre</th>
                    <th>Segundo Nombre</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(employee => (
                    <tr key={employee.Cedula}>
                      <td>{employee.Cedula}</td>
                      <td>{employee.Tipo_Documento}</td>
                      <td>{employee.Primer_Nombre}</td>
                      <td>{employee.Segundo_Nombre}</td>
                      <td>{employee.Primer_Apellido}</td>
                      <td>{employee.Segundo_Apellido}</td>
                      <td>{new Date(employee.Fecha_Nacimiento).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => handleEditEmployee(employee)}>Editar</button>
                        <button onClick={() => handleDeleteEmployee(employee.Cedula)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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