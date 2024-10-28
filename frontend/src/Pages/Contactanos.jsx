import React from 'react';
import '../CSS/Contactanos.css';

const Contactanos = () => {
  return (
    <div className="contactanos-page">
      <div className="contactanos-container">
        <h1 className="contactanos-title">Contáctanos</h1>
        <form className="contactanos-form">
          <div className="contactanos-form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required />
          </div>
          <div className="contactanos-form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="contactanos-form-group">
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea id="mensaje" name="mensaje" required></textarea>
          </div>
          <button type="submit" className="contactanos-submit-button">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Contactanos;