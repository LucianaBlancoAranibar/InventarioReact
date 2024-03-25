import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const ReporteProductoMasVendido = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Reemplaza la URL con la de tu API
    fetch('https://localhost:7010/reporte-producto-mas-vendido')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  // Datos para el gráfico
  const data = {
    labels: productos.map(p => p.producto),
    datasets: [
      {
        label: 'Cantidad Vendida',
        data: productos.map(p => p.cantidad),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opciones para el gráfico
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Productos Más Vendidos</h2>
      <div className="mb-8">
        <table className="min-w-full table-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-2">Producto</th>
              <th className="px-4 py-2">Cantidad Vendida</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-purple-50' : 'bg-white'}>
                <td className="border px-4 py-2">{producto.producto}</td>
                <td className="border px-4 py-2">{producto.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ReporteProductoMasVendido;
