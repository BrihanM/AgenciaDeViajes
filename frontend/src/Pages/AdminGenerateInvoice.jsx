import React, { useState, useEffect } from 'react';

export default function GenerateInvoice() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [flightDetails, setFlightDetails] = useState({
    flightNumber: '',
    origin: '',
    destination: '',
    date: '',
    basePrice: 0
  });
  const [luggage, setLuggage] = useState({
    weight: 0,
    additionalItems: []
  });
  const [additionalCharges, setAdditionalCharges] = useState(0);

  const WEIGHT_LIMIT = 20; // kg
  const EXTRA_WEIGHT_CHARGE = 5; // $ per kg

  useEffect(() => {
    // Aquí iría la lógica para obtener la lista de clientes del servidor
    setCustomers(['Cliente 1', 'Cliente 2', 'Cliente 3']);
    // Aquí iría la lógica para obtener el siguiente número de factura
    setInvoiceNumber('INV-001');
  }, []);

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
    // Aquí se cargarían los detalles del vuelo del cliente seleccionado
    // Por ahora, usaremos datos de ejemplo
    setFlightDetails({
      flightNumber: 'CF101',
      origin: 'Bogotá',
      destination: 'Medellín',
      date: '2023-06-15',
      basePrice: 200
    });
  };

  const handleLuggageChange = (e) => {
    const weight = parseFloat(e.target.value);
    setLuggage({ ...luggage, weight });
    
    if (weight > WEIGHT_LIMIT) {
      const extraWeight = weight - WEIGHT_LIMIT;
      setAdditionalCharges(extraWeight * EXTRA_WEIGHT_CHARGE);
    } else {
      setAdditionalCharges(0);
    }
  };

  const handleAdditionalItemChange = (index, field, value) => {
    const newItems = [...luggage.additionalItems];
    newItems[index][field] = value;
    setLuggage({ ...luggage, additionalItems: newItems });
  };

  const addAdditionalItem = () => {
    setLuggage({
      ...luggage,
      additionalItems: [...luggage.additionalItems, { description: '', price: 0 }]
    });
  };

  const removeAdditionalItem = (index) => {
    const newItems = luggage.additionalItems.filter((_, i) => i !== index);
    setLuggage({ ...luggage, additionalItems: newItems });
  };

  const calculateTotal = () => {
    const itemsTotal = luggage.additionalItems.reduce((total, item) => total + item.price, 0);
    return flightDetails.basePrice + additionalCharges + itemsTotal;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la factura al servidor
    console.log('Factura generada:', {
      invoiceNumber,
      customer: selectedCustomer,
      flightDetails,
      luggage,
      additionalCharges,
      total: calculateTotal()
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Generar Factura</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="invoiceNumber">
            Número de Factura
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="invoiceNumber"
            type="text"
            value={invoiceNumber}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customer">
            Cliente
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="customer"
            value={selectedCustomer}
            onChange={handleCustomerChange}
            required
          >
            <option value="">Seleccione un cliente</option>
            {customers.map((customer, index) => (
              <option key={index} value={customer}>{customer}</option>
            ))}
          </select>
        </div>
        {selectedCustomer && (
          <>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Detalles del Vuelo</h3>
              <p><strong>Número de Vuelo:</strong> {flightDetails.flightNumber}</p>
              <p><strong>Origen:</strong> {flightDetails.origin}</p>
              <p><strong>Destino:</strong> {flightDetails.destination}</p>
              <p><strong>Fecha:</strong> {flightDetails.date}</p>
              <p><strong>Precio Base:</strong> ${flightDetails.basePrice.toFixed(2)}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Equipaje</h3>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="luggageWeight">
                Peso del Equipaje (kg)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="luggageWeight"
                type="number"
                value={luggage.weight}
                onChange={handleLuggageChange}
                min="0"
                step="0.1"
                required
              />
              {additionalCharges > 0 && (
                <p className="text-red-500 text-sm mt-1">
                  Cargo adicional por exceso de peso: ${additionalCharges.toFixed(2)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Elementos Adicionales</h3>
              {luggage.additionalItems.map((item, index) => (
                <div key={index} className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Descripción"
                      value={item.description}
                      onChange={(e) => handleAdditionalItemChange(index, 'description', e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      placeholder="Precio"
                      value={item.price}
                      onChange={(e) => handleAdditionalItemChange(index, 'price', parseFloat(e.target.value))}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAdditionalItem(index)}
                    className="mt-2 ml-3 text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addAdditionalItem}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              >
                Agregar Elemento Adicional
              </button>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Total: ${calculateTotal().toFixed(2)}</h3>
            </div>
          </>
        )}
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            type="submit"
          >
            Generar Factura
          </button>
        </div>
      </form>
    </div>
  );
}