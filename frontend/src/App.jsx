import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout/Layout';


// Rutas de la app
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" element={<Layout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;