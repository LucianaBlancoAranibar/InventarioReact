import React, { useState, useEffect } from 'react';

const InventoryReport = () => {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7010/historial-movimientos')
      .then(response => response.json())
      .then(data => setMovements(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-blue-500">
          <h2 className="text-xl font-semibold text-white">Inventory Movement Report</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-blue-900 bg-blue-100">
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Referencia</th>
                  <th className="px-4 py-2">Producto</th>
                  <th className="px-4 py-2">Desde</th>
                  <th className="px-4 py-2">Para</th>
                  <th className="px-4 py-2">Cantidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {movements.map((movement, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="px-4 py-2">{movement.fecha}</td>
                    <td className="px-4 py-2">{movement.referencia}</td>
                    <td className="px-4 py-2">{movement.producto}</td>
                    <td className="px-4 py-2">{movement.desde}</td>
                    <td className="px-4 py-2">{movement.para}</td>
                    <td className="px-4 py-2">{movement.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryReport;
