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
      <div className="text-center mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 ">
          <h2 className="text-2xl font-bold text-center mb-6">Reporte de Movimiento de Inventario</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400'> 
                <tr className="text-left text-blue-900 bg-gray-100">
                  <th className="px-4 py-2 text-center ">Fecha</th>
                  <th className="px-4 py-2 text-center ">Referencia</th>
                  <th className="px-4 py-2 text-center ">Producto</th>
                  <th className="px-4 py-2 text-center ">Desde</th>
                  <th className="px-4 py-2 text-center ">Para</th>
                  <th className="px-4 py-2 text-center ">Cantidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {movements.map((movement, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="px-4 py-2 text-center ">{movement.fecha}</td>
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
