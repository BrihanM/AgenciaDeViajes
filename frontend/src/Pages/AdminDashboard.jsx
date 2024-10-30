import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/AdminDashboard.css";

export default function AdminDashboard() {
  //Exportar a Excel
  const handleDownloadNomina = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8085/api/download-nomina",
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Nomina.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading Nomina:", error);
      alert(
        "Hubo un error al descargar la nómina. Por favor, inténtelo de nuevo."
      );
    }
  };

  //Trip - Viaje
  const [newTrip, setNewTrip] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
  });
  const [activeReservations, setActiveReservations] = useState([]);
  const [stats, setStats] = useState({
    users: 0,
    trips: 0,
    revenue: 0,
    reservations: 0,
  });
  const [activeTab, setActiveTab] = useState("new-trip");

  //Employees - Empleados
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    Cedula: "",
    Tipo_Documento: "",
    Primer_Nombre: "",
    Segundo_Nombre: "",
    Primer_Apellido: "",
    Segundo_Apellido: "",
    Fecha_Nacimiento: "",
  });
  const [editingEmployee, setEditingEmployee] = useState(null);

  //Airplanes
  const [airplanes, setAirplanes] = useState([]);
  const [newAirplane, setNewAirplane] = useState({
    Modelo: "",
    Fabricante: "",
    Año_Fabricacion: "",
    Numero_Asientos: "",
    Capacidad_Carga: "",
    NIT_ContratistaFK: "",
  });
  const [editingAirplane, setEditingAirplane] = useState(null);

  //Furniture
  const [furniture, setFurniture] = useState([]);
  const [newFurniture, setNewFurniture] = useState({
    Id_CategoriaFK: "",
    Sucursal_IdFK: "",
    Fecha_Adquisicion: "",
    Costo: "",
    Cantidad: "",
  });
  const [editingFurniture, setEditingFurniture] = useState(null);

  //Locations of headquarters - Sedes
  const [branches, setBranches] = useState([]);
  const [newBranch, setNewBranch] = useState({
    EmpresaNITFK: "",
    Nombre: "",
    Direccion: "",
    Telefono: "",
    Correo: "",
  });
  const [empresas, setEmpresas] = useState([]);
  const [editingBranch, setEditingBranch] = useState(null);

  const fetchBranches = async () => {
    try {
      const response = await axios.get("http://localhost:8085/api/branches");
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const fetchEmpresas = async () => {
    try {
      const response = await fetch("http://localhost:8085/api/empresas");
      if (!response.ok) {
        throw new Error("Error al cargar las empresas");
      }
      const data = await response.json();
      setEmpresas(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Machinary
  const [devices, setDevices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newDevice, setNewDevice] = useState({
    Id_CategoriaFK: "",
    Sucursal_IdFK: "",
    Fecha_Compra: "",
    Costo: "",
    Estado: "Operativo",
    Cantidad: "",
  });
  const [editingDevice, setEditingDevice] = useState(null);
  //--------------------------------------------------------------------------------------------
  useEffect(() => {
    setActiveReservations([
      {
        id: 1,
        userId: 101,
        tripName: "Playa del Carmen",
        date: "2023-07-15",
        status: "Confirmada",
      },
      {
        id: 2,
        userId: 102,
        tripName: "París",
        date: "2023-08-22",
        status: "Pendiente",
      },
      {
        id: 3,
        userId: 103,
        tripName: "Tokio",
        date: "2023-09-10",
        status: "Cancelada",
      },
    ]);
    setStats({ users: 1250, trips: 45, revenue: 150000, reservations: 890 });
    //Logica para Employees (Empleados)
    if (activeTab === "employees") {
      fetchEmployees();
    }
    //Airplanes (Aviones)
    if (activeTab === "airplane") {
      fetchAirplanes();
    }
    //Furniture (Muebles)
    if (activeTab === "furniture") {
      fetchFurniture();
      fetchCategories();
      fetchBranches();
    }
    //Headquarters (Sedes)
    if (activeTab === "location") {
      fetchBranches();
    }

    if (activeTab === "location") {
      fetchEmpresas();
    }
    //Machinary (Maquinaria)
    if (activeTab === "machinary") {
      fetchDevices();
      fetchCategories();
      fetchBranches();
    }
  }, [activeTab]);

  //----------------------------------------------------------------------
  const handleNewTripChange = (e) => {
    const { name, value } = e.target;
    setNewTrip((prevTrip) => ({
      ...prevTrip,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleNewTripSubmit = (e) => {
    e.preventDefault();
    console.log("Nuevo viaje agregado:", newTrip);
    setNewTrip({ id: 0, name: "", description: "", price: 0 });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmada":
        return <span className="badge badge-green">Confirmada</span>;
      case "Pendiente":
        return <span className="badge badge-yellow">Pendiente</span>;
      case "Cancelada":
        return <span className="badge badge-red">Cancelada</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  //Constantes usadas en Employees (Empleados)
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8085/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
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
      await axios.post("http://localhost:8085/api/employees", newEmployee);
      fetchEmployees();
      setNewEmployee({
        Cedula: "",
        Tipo_Documento: "",
        Primer_Nombre: "",
        Segundo_Nombre: "",
        Primer_Apellido: "",
        Segundo_Apellido: "",
        Fecha_Nacimiento: "",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8085/api/employees/${editingEmployee.Cedula}`,
        editingEmployee
      );
      fetchEmployees();
      setEditingEmployee(null);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDeleteEmployee = async (cedula) => {
    try {
      await axios.delete(`http://localhost:8085/api/employees/${cedula}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  //Constantes usadas en Airplanes
  const fetchAirplanes = async () => {
    try {
      const response = await axios.get("http://localhost:8085/api/airplanes");
      setAirplanes(response.data);
    } catch (error) {
      console.error("Error fetching airplanes:", error);
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
      Año_Fabricacion: newAirplane.Año_Fabricacion
        ? new Date(newAirplane.Año_Fabricacion).toISOString().split("T")[0]
        : null,
      Numero_Asientos: parseInt(newAirplane.Numero_Asientos),
      Capacidad_Carga: parseFloat(newAirplane.Capacidad_Carga),
    };
    try {
      await axios.post(
        "http://localhost:8085/api/airplanes",
        formattedAirplane
      );
      fetchAirplanes();
      setNewAirplane({
        Modelo: "",
        Fabricante: "",
        Año_Fabricacion: "",
        Numero_Asientos: "",
        Capacidad_Carga: "",
        NIT_ContratistaFK: "",
      });
    } catch (error) {
      console.error(
        "Error al añadir el avion:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEditAirplane = (airplane) => {
    setEditingAirplane(airplane);
  };

  const handleUpdateAirplane = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8085/api/airplanes/${editingAirplane.Id_Avion}`,
        editingAirplane
      );
      fetchAirplanes();
      setEditingAirplane(null);
    } catch (error) {
      console.error("Error al actualizar el avion:", error);
    }
  };

  const handleDeleteAirplane = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/api/airplanes/${id}`);
      fetchAirplanes();
    } catch (error) {
      console.error("Error al eliminar el avion:", error);
    }
  };

  //Constantes usadas en Furniture
  const fetchFurniture = async () => {
    try {
      const response = await axios.get("http://localhost:8085/api/furniture");
      setFurniture(response.data);
    } catch (error) {
      console.error("Error fetching furniture:", error);
      if (error.response) {
        // El servidor respondió con un estado de error
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error("No response received:", error.request);
      } else {
        // Algo sucedió al configurar la solicitud que desencadenó un error
        console.error("Error setting up request:", error.message);
      }
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
      await axios.post("http://localhost:8085/api/furniture", newFurniture);
      fetchFurniture();
      setNewFurniture({
        Id_CategoriaFK: "",
        Sucursal_IdFK: "",
        Fecha_Adquisicion: "",
        Costo: "",
        Cantidad: "",
      });
    } catch (error) {
      console.error("Error adding furniture:", error);
    }
  };

  const handleEditFurniture = (item) => {
    const formattedItem = {
      ...item,
      Fecha_Adquisicion: item.Fecha_Adquisicion
        ? item.Fecha_Adquisicion.split("T")[0]
        : "",
      Categoria_IdFK: Number(item.Categoria_IdFK),
      Sucursal_IdFK: Number(item.Sucursal_IdFK),
    };
    setEditingFurniture(formattedItem);
  };

  const handleUpdateFurniture = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8085/api/furniture/${editingFurniture.Id_Mueble}`,
        editingFurniture
      );
      fetchFurniture();
      setEditingFurniture(null);
    } catch (error) {
      console.error("Error updating furniture:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingFurniture(null);
  };

  const handleDeleteFurniture = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/api/furniture/${id}`);
      fetchFurniture();
    } catch (error) {
      console.error("Error deleting furniture:", error);
    }
  };

  //Constantes usadas en Location (Sedes)

  const handleBranchInputChange = (e) => {
    const { name, value } = e.target;
    if (editingBranch) {
      setEditingBranch({ ...editingBranch, [name]: value });
    } else {
      setNewBranch({ ...newBranch, [name]: value });
    }
  };

  const handleAddBranch = async (e) => {
    e.preventDefault();
    try {
      if (editingBranch) {
        // Actualizar sede existente
        const response = await axios.put(
          `http://localhost:8085/api/branches/${editingBranch.Id_Sede}`,
          editingBranch
        );
        const updatedBranch = response.data;
        setBranches(
          branches.map((branch) =>
            branch.Id_Sede === updatedBranch.Id_Sede ? updatedBranch : branch
          )
        );
        setEditingBranch(null);
      } else {
        // Agregar nueva sede
        const response = await axios.post(
          "http://localhost:8085/api/branches",
          newBranch
        );
        const addedBranch = response.data;
        setBranches([...branches, addedBranch]);
      }
      setNewBranch({
        EmpresaNITFK: "",
        Nombre: "",
        Direccion: "",
        Telefono: "",
        Correo: "",
      });
      // Añade esta línea para actualizar la lista de sedes
      fetchBranches();
    } catch (error) {
      console.error("Error al agregar/actualizar sede:", error);
    }
  };

  const handleDeleteBranch = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/api/branches/${id}`);
      fetchBranches();
    } catch (error) {
      console.error("Error al eliminar sede:", error);
    }
  };
  //Constantes de machinary (Maquinaria)
  const fetchDevices = async () => {
    try {
      const response = await axios.get("http://localhost:8085/api/devices");
      setDevices(response.data);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8085/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingDevice) {
      setEditingDevice({ ...editingDevice, [name]: value });
    } else {
      setNewDevice({ ...newDevice, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDevice) {
        await axios.put(
          `http://localhost:8085/api/devices/${editingDevice.Id_Dispositivo}`,
          editingDevice
        );
      } else {
        await axios.post("http://localhost:8085/api/devices", newDevice);
      }
      fetchDevices();
      setNewDevice({
        Id_CategoriaFK: "",
        Sucursal_IdFK: "",
        Fecha_Compra: "",
        Costo: "",
        Estado: "Disponible",
        Cantidad: "",
      });
      setEditingDevice(null);
    } catch (error) {
      console.error("Error submitting device:", error);
    }
  };

  const handleEdit = (device) => {
    setEditingDevice(device);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/api/devices/${id}`);
      fetchDevices();
    } catch (error) {
      console.error("Error deleting device:", error);
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
            className={`tab ${activeTab === "new-trip" ? "active" : ""}`}
            onClick={() => setActiveTab("new-trip")}
          >
            Nuevo Viaje
          </div>
          <div
            className={`tab ${activeTab === "employees" ? "active" : ""}`}
            onClick={() => setActiveTab("employees")}
          >
            Empleados
          </div>
          <div
            className={`tab ${activeTab === "airplane" ? "active" : ""}`}
            onClick={() => setActiveTab("airplane")}
          >
            Aviones
          </div>
          <div
            className={`tab ${activeTab === "furniture" ? "active" : ""}`}
            onClick={() => setActiveTab("furniture")}
          >
            Muebles
          </div>
          <div
            className={`tab ${activeTab === "location" ? "active" : ""}`}
            onClick={() => setActiveTab("location")}
          >
            Sedes
          </div>
          <div
            className={`tab ${activeTab === "machinary" ? "active" : ""}`}
            onClick={() => setActiveTab("machinary")}
          >
            Dispositivos
          </div>
        </div>
        <div className="tab-content">
          {/*Page Machinary - Lista de dispositivos*/}
          {activeTab === "machinary" && (
            <div className="machinary-section">
              <h2>Gestión de Dispositivos</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Categoría:</label>
                  <select
                    name="Id_CategoriaFK"
                    value={
                      editingDevice
                        ? editingDevice.Id_CategoriaFK
                        : newDevice.Id_CategoriaFK
                    }
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category) => (
                      <option
                        key={category.Id_Categoria}
                        value={category.Id_Categoria}
                      >
                        {category.Nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Sucursal:</label>
                  <select
                    name="Sucursal_IdFK"
                    value={
                      editingDevice
                        ? editingDevice.Sucursal_IdFK
                        : newDevice.Sucursal_IdFK
                    }
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione una sucursal</option>
                    {branches.map((branch) => (
                      <option key={branch.Id_Sede} value={branch.Id_Sede}>
                        {branch.Nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Fecha de Compra:</label>
                  <input
                    type="date"
                    name="Fecha_Compra"
                    value={
                      editingDevice
                        ? editingDevice.Fecha_Compra
                        : newDevice.Fecha_Compra
                    }
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label>Costo:</label>
                  <input
                    type="number"
                    name="Costo"
                    value={
                      editingDevice ? editingDevice.Costo : newDevice.Costo
                    }
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label>Estado:</label>
                  <select
                    name="Estado"
                    value={
                      editingDevice ? editingDevice.Estado : newDevice.Estado
                    }
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Operativo">Disponible</option>
                    <option value="En mantenimiento">No Disponible</option>
                  </select>
                </div>
                <div>
                  <label>Cantidad:</label>
                  <input
                    type="number"
                    name="Cantidad"
                    value={
                      editingDevice
                        ? editingDevice.Cantidad
                        : newDevice.Cantidad
                    }
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit">
                  {editingDevice ? "Actualizar" : "Agregar"} Dispositivo
                </button>
              </form>

              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Categoría</th>
                    <th>Sucursal</th>
                    <th>Fecha de Compra</th>
                    <th>Costo</th>
                    <th>Estado</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <tr key={device.Id_Dispositivo}>
                      <td>{device.Id_Dispositivo}</td>
                      <td>
                        {categories.find(
                          (c) => c.Id_Categoria === device.Id_CategoriaFK
                        )?.Nombre || "N/A"}
                      </td>
                      <td>
                        {branches.find(
                          (b) => b.Id_Sede === device.Sucursal_IdFK
                        )?.Nombre || "N/A"}
                      </td>
                      <td>
                        {new Date(device.Fecha_Compra).toLocaleDateString()}
                      </td>
                      <td>{device.Costo}</td>
                      <td>{device.Estado}</td>
                      <td>{device.Cantidad}</td>
                      <td>
                        <button onClick={() => handleEdit(device)}>
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(device.Id_Dispositivo)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/*Page Locations - Lista de sedes*/}
          {activeTab === "location" && (
            <div className="branches-section">
              <h2>Gestión de Sedes</h2>
              <form onSubmit={handleAddBranch}>
                <select
                  name="EmpresaNITFK"
                  value={
                    editingBranch
                      ? editingBranch.EmpresaNITFK
                      : newBranch.EmpresaNITFK
                  }
                  onChange={handleBranchInputChange}
                  required
                >
                  <option value="">Seleccione una empresa</option>
                  {empresas.map((empresa) => (
                    <option key={empresa.NIT} value={empresa.NIT}>
                      {empresa.Nombre} - NIT: {empresa.NIT}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="Nombre"
                  value={
                    editingBranch ? editingBranch.Nombre : newBranch.Nombre
                  }
                  onChange={handleBranchInputChange}
                  placeholder="Nombre de la Sede"
                  required
                />
                <input
                  type="text"
                  name="Direccion"
                  value={
                    editingBranch
                      ? editingBranch.Direccion
                      : newBranch.Direccion
                  }
                  onChange={handleBranchInputChange}
                  placeholder="Dirección"
                  required
                />
                <input
                  type="text"
                  name="Telefono"
                  value={
                    editingBranch ? editingBranch.Telefono : newBranch.Telefono
                  }
                  onChange={handleBranchInputChange}
                  placeholder="Teléfono"
                  required
                />
                <input
                  type="email"
                  name="Correo"
                  value={
                    editingBranch ? editingBranch.Correo : newBranch.Correo
                  }
                  onChange={handleBranchInputChange}
                  placeholder="Correo"
                  required
                />
                <button type="submit">
                  {editingBranch ? "Actualizar Sede" : "Agregar Sede"}
                </button>
                {editingBranch && (
                  <button type="button" onClick={() => setEditingBranch(null)}>
                    Cancelar Edición
                  </button>
                )}
              </form>

              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NIT Empresa</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((branch) => (
                    <tr key={branch.Id_Sede}>
                      <td>{branch.Id_Sede}</td>
                      <td>{branch.EmpresaNITFK}</td>
                      <td>{branch.Nombre}</td>
                      <td>{branch.Direccion}</td>
                      <td>{branch.Telefono}</td>
                      <td>{branch.Correo}</td>
                      <td>
                        <button onClick={() => setEditingBranch(branch)}>
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteBranch(branch.Id_Sede)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/*Page Furniture - Muebles empresariales*/}
          {activeTab === "furniture" && (
            <div className="furniture-section">
              <h2>Gestión de Muebles</h2>
              <form
                onSubmit={
                  editingFurniture ? handleUpdateFurniture : handleAddFurniture
                }
              >
                <div className="form-group">
                  <label>Categoría:</label>
                  <select
                    name="Id_CategoriaFK"
                    value={
                      editingDevice
                        ? editingDevice.Id_CategoriaFK
                        : newDevice.Id_CategoriaFK
                    }
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category) => (
                      <option
                        key={category.Id_Categoria}
                        value={category.Id_Categoria}
                      >
                        {category.Nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Sucursal:</label>
                  <select
                    name="Sucursal_IdFK"
                    value={
                      editingFurniture
                        ? editingFurniture.Sucursal_IdFK
                        : newFurniture.Sucursal_IdFK
                    }
                    onChange={handleInputChangeFurniture}
                    required
                  >
                    <option value="">Seleccione una sucursal</option>
                    {branches.map((branch) => (
                      <option
                        key={branch.Sucursal_Id}
                        value={branch.Sucursal_Id}
                      >
                        {branch.Nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Fecha de Adquisición:</label>
                  <input
                    type="date"
                    name="Fecha_Adquisicion"
                    value={
                      editingFurniture
                        ? editingFurniture.Fecha_Adquisicion
                        : newFurniture.Fecha_Adquisicion
                    }
                    onChange={handleInputChangeFurniture}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Costo:</label>
                  <input
                    type="number"
                    name="Costo"
                    value={
                      editingFurniture
                        ? editingFurniture.Costo
                        : newFurniture.Costo
                    }
                    onChange={handleInputChangeFurniture}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Cantidad:</label>
                  <input
                    type="number"
                    name="Cantidad"
                    value={
                      editingFurniture
                        ? editingFurniture.Cantidad
                        : newFurniture.Cantidad
                    }
                    onChange={handleInputChangeFurniture}
                    required
                  />
                </div>
                <button type="submit">
                  {editingFurniture ? "Actualizar" : "Agregar"} Mueble
                </button>
                {editingFurniture && (
                  <button
                    type="button"
                    onClick={() => setEditingFurniture(null)}
                  >
                    Cancelar Edición
                  </button>
                )}
              </form>

              <h3>Lista de Muebles</h3>
              <table className="furniture-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Categoría</th>
                    <th>Sucursal</th>
                    <th>Fecha de Adquisición</th>
                    <th>Costo</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {furniture.map((item) => (
                    <tr key={item.Id_Mueble}>
                      <td>{item.Id_Mueble}</td>
                      <td>{item.Nombre_Categoria}</td>
                      <td>{item.Nombre_Sucursal}</td>
                      <td>
                        {new Date(item.Fecha_Adquisicion).toLocaleDateString()}
                      </td>
                      <td>{item.Costo}</td>
                      <td>{item.Cantidad}</td>
                      <td>
                        <button onClick={() => handleEditFurniture(item)}>
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteFurniture(item.Id_Mueble)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/*Page Airplane - Aviones*/}
          {activeTab === "airplane" && (
            <div className="admin-container">
              <header className="admin-header">
                <h1 className="admin-title">Administración de Aviones</h1>
              </header>
              <main className="admin-content">
                <form
                  onSubmit={
                    editingAirplane ? handleUpdateAirplane : handleAddAirplane
                  }
                  className="admin-form"
                >
                  <h2>
                    {editingAirplane ? "Editar Avión" : "Agregar Nuevo Avión"}
                  </h2>
                  <div className="form-group">
                    <label htmlFor="Modelo">Modelo:</label>
                    <input
                      type="text"
                      id="Modelo"
                      name="Modelo"
                      value={
                        editingAirplane
                          ? editingAirplane.Modelo
                          : newAirplane.Modelo
                      }
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
                      value={
                        editingAirplane
                          ? editingAirplane.Fabricante
                          : newAirplane.Fabricante
                      }
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
                      value={
                        editingAirplane
                          ? editingAirplane.Año_Fabricacion
                            ? editingAirplane.Año_Fabricacion.split("T")[0]
                            : ""
                          : newAirplane.Año_Fabricacion
                          ? newAirplane.Año_Fabricacion.split("T")[0]
                          : ""
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
                      value={
                        editingAirplane
                          ? editingAirplane.Numero_Asientos
                          : newAirplane.Numero_Asientos
                      }
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
                      value={
                        editingAirplane
                          ? editingAirplane.Capacidad_Carga
                          : newAirplane.Capacidad_Carga
                      }
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
                      value={
                        editingAirplane
                          ? editingAirplane.NIT_ContratistaFK
                          : newAirplane.NIT_ContratistaFK
                      }
                      onChange={handleInputChangeAirplane}
                      required
                    />
                  </div>
                  <button type="submit" className="btn">
                    {editingAirplane ? "Actualizar Avión" : "Agregar Avión"}
                  </button>
                  {editingAirplane && (
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setEditingAirplane(null)}
                    >
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
                    {airplanes.map((airplane) => (
                      <tr key={airplane.Id_Avion}>
                        <td>{airplane.Id_Avion}</td>
                        <td>{airplane.Modelo}</td>
                        <td>{airplane.Fabricante}</td>
                        <td>{airplane.Año_Fabricacion}</td>
                        <td>{airplane.Numero_Asientos}</td>
                        <td>{airplane.Capacidad_Carga}</td>
                        <td>{airplane.NIT_ContratistaFK}</td>
                        <td>
                          <button
                            className="action-btn"
                            onClick={() => handleEditAirplane(airplane)}
                          >
                            Editar
                          </button>
                          <button
                            className="action-btn"
                            onClick={() =>
                              handleDeleteAirplane(airplane.Id_Avion)
                            }
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </main>
            </div>
          )}
          {/*Page employees - Empleados*/}
          {activeTab === "employees" && (
            <div className="employees-section">
              <h2>Gestión de Empleados</h2>
              <form
                onSubmit={
                  editingEmployee ? handleUpdateEmployee : handleAddEmployee
                }
              >
                <input
                  type="text"
                  name="Cedula"
                  value={
                    editingEmployee
                      ? editingEmployee.Cedula
                      : newEmployee.Cedula
                  }
                  onChange={handleInputChangeEmployee}
                  placeholder="Cédula"
                  required
                />
                <input
                  type="text"
                  name="Tipo_Documento"
                  value={
                    editingEmployee
                      ? editingEmployee.Tipo_Documento
                      : newEmployee.Tipo_Documento
                  }
                  onChange={handleInputChangeEmployee}
                  placeholder="Tipo de Documento"
                  required
                />
                <input
                  type="text"
                  name="Primer_Nombre"
                  value={
                    editingEmployee
                      ? editingEmployee.Primer_Nombre
                      : newEmployee.Primer_Nombre
                  }
                  onChange={handleInputChangeEmployee}
                  placeholder="Primer Nombre"
                  required
                />
                <input
                  type="text"
                  name="Segundo_Nombre"
                  value={
                    editingEmployee
                      ? editingEmployee.Segundo_Nombre
                      : newEmployee.Segundo_Nombre
                  }
                  onChange={handleInputChangeEmployee}
                  placeholder="Segundo Nombre"
                />
                <input
                  type="text"
                  name="Primer_Apellido"
                  value={
                    editingEmployee
                      ? editingEmployee.Primer_Apellido
                      : newEmployee.Primer_Apellido
                  }
                  onChange={handleInputChangeEmployee}
                  placeholder="Primer Apellido"
                  required
                />
                <input
                  type="text"
                  name="Segundo_Apellido"
                  value={
                    editingEmployee
                      ? editingEmployee.Segundo_Apellido
                      : newEmployee.Segundo_Apellido
                  }
                  onChange={handleInputChangeEmployee}
                  placeholder="Segundo Apellido"
                />
                <input
                  type="date"
                  name="Fecha_Nacimiento"
                  value={
                    editingEmployee
                      ? editingEmployee.Fecha_Nacimiento
                      : newEmployee.Fecha_Nacimiento
                  }
                  onChange={handleInputChangeEmployee}
                  required
                />
                <button type="submit">
                  {editingEmployee ? "Actualizar Empleado" : "Agregar Empleado"}
                </button>
                {editingEmployee && (
                  <button
                    type="button"
                    onClick={() => setEditingEmployee(null)}
                  >
                    Cancelar Edición
                  </button>
                )}
              </form>
              <button onClick={handleDownloadNomina}>Descargar Nómina</button>
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
                  {employees.map((employee) => (
                    <tr key={employee.Cedula}>
                      <td>{employee.Cedula}</td>
                      <td>{employee.Tipo_Documento}</td>
                      <td>{employee.Primer_Nombre}</td>
                      <td>{employee.Segundo_Nombre}</td>
                      <td>{employee.Primer_Apellido}</td>
                      <td>{employee.Segundo_Apellido}</td>
                      <td>
                        {new Date(
                          employee.Fecha_Nacimiento
                        ).toLocaleDateString()}
                      </td>
                      <td>
                        <button onClick={() => handleEditEmployee(employee)}>
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.Cedula)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/*Page nuevo viaje - Viajes*/}
          {activeTab === "new-trip" && (
            <form onSubmit={handleNewTripSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Nombre del viaje
                </label>
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
                <label className="form-label" htmlFor="description">
                  Descripción
                </label>
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
                <label className="form-label" htmlFor="price">
                  Precio
                </label>
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
              <button type="submit" className="submit-button">
                Agregar Viaje
              </button>
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
