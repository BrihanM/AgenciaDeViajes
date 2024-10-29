import React from "react";
import "../Css/Principal.css";
import buscar from "../Img/icons/buscar.png";
import pasajeros from "../Img/icons/Pasajeros.png";
import clase from "../Img/icons/clase.png";
import destino from "../Img/icons/destino.png";
import calendario from "../Img/icons/calendario.png";
import MapComponent from "../Pages/MapComponent";

const Principal = () => {
  return (
    <div className="principal-page">
      <div className="banner">
        <div className="overlay"></div>
      </div>

      <div className="flight-purchase">
        <div className="passenger-selection">
          <div className="input-group">
            <img src={pasajeros} alt="Pasajeros" className="small-logo" />
            <label htmlFor="passengers">Pasajeros:</label>
            <input type="number" id="passengers" min="1" defaultValue="1" />
          </div>
          <div className="input-group">
            <img src={clase} alt="Clase" className="small-logo" />
            <label htmlFor="class">Clase:</label>
            <select id="class">
              <option value="economica">Económica</option>
              <option value="preferencial">Preferencial</option>
            </select>
          </div>
        </div>

        <div className="search-bar">
          <div className="location-selection">
            <div className="input-group">
              <img src={destino} alt="Origen" className="small-logo" />
              <label htmlFor="origin">Origen:</label>
              <input
                type="text"
                id="origin"
                placeholder="Ciudad o Aeropuerto"
              />
            </div>
            <div className="input-group">
              <img src={destino} alt="Destino" className="small-logo" />
              <label htmlFor="destination">Destino:</label>
              <input
                type="text"
                id="destination"
                placeholder="Ciudad o Aeropuerto"
              />
            </div>
          </div>

          <div className="date-selection">
            <div className="input-group">
              <img src={calendario} alt="Ida" className="small-logo" />
              <label htmlFor="departure">Ida:</label>
              <input type="date" id="departure" />
            </div>
            <div className="input-group">
              <img src={calendario} alt="Vuelta" className="small-logo" />
              <label htmlFor="return">Vuelta:</label>
              <input type="date" id="return" />
            </div>
          </div>
        </div>

        <button className="search-button">
          <img src={buscar} alt="Buscar" />
          Buscar vuelos
        </button>
      </div>
      <div className="map-container">
        <h2>Nuestra Ubicación</h2>
        <MapComponent />
      </div>
    </div>
  );
};

export default Principal;
