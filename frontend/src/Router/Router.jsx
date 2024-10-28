import { Routes, Route } from 'react-router-dom';
import Principal from '../Pages/Principal.jsx';
import Reservas from '../Pages/ReservasUsers.jsx';
import Login from '../Pages/Login.jsx';
import Destinos from '../Pages/Destinos.jsx';
import Perfil from '../Pages/Perfil.jsx';
import Registro from '../Pages/Registro.jsx'
import Contactanos from '../Pages/Contactanos.jsx';
import AdminDashboard from '../Pages/AdminDashboard.jsx';
import AdminAirplanes from '../Pages/AdminAirplanes.jsx';
import AdminEmployees from '../Pages/AdminEmployees.jsx';
import AdminFurniture from '../Pages/AdminFurniture.jsx';
import AdminGenerateInvoice from '../Pages/AdminGenerateInvoice.jsx';
import AdminLocations from '../Pages/AdminGenerateInvoice.jsx';
import AdminMachine from '../Pages/AdminMachinary.jsx';

const Routers = () => {
  return (
    <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/reserva" element={<Reservas />} />
          <Route path="/login" element={<Login />} /> 
          <Route path='/destinos' element={<Destinos />} />
          <Route path='/perfil' element={<Perfil />}/>
          <Route path='/register' element={<Registro />}/>
          <Route path='/contact' element={<Contactanos />}/>
          <Route path='/admin-dashboard' element={<AdminDashboard />}/>
          <Route path='/admin-airplanes' element={<AdminAirplanes />}/>
          <Route path='/admin-employees' element={<AdminEmployees />}/>
          <Route path='/admin-furniture' element={<AdminFurniture />}/>
          <Route path='/admin-invoice' element={<AdminGenerateInvoice />}/>
          <Route path='/admin-location' element={<AdminLocations />}/>
          <Route path='/admin-machinary' element={<AdminMachine />}/>
    </Routes>
  );
};

export default Routers;
