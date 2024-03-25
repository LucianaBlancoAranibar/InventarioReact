import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);


const PedidoTable = ({ data }) => (
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className='bg-gray-800 text-white'>
      <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">Fecha</th>
        <th className="py-3 px-6 text-left">Cantidad de Pedidos</th>
        <th className="py-3 px-6 text-left">Total de Productos</th>
      </tr>
    </thead>
    <tbody className="text-gray-600 text-sm font-light">
      {data.map((item, index) => (
        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
          <td className="py-3 px-6">{new Date(item.fecha).toLocaleDateString()}</td>
          <td className="py-3 px-6">{item.cantidadPedidos}</td>
          <td className="py-3 px-6">{item.totalProductos}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const PedidoPieChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => new Date(d.fecha).toLocaleDateString()),
    datasets: [
      {
        data: data.map(d => d.totalProductos),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          // Agrega más colores según sea necesario
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          // Agrega más colores según sea necesario
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

const ReportePedidos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7010/reporte-pedidos')
      .then(response => response.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Reporte de Pedidos</h1>
      <div className="mb-8">
        <PedidoTable data={data} />
      </div>
      <div className="max-w-xs mx-auto">
        <PedidoPieChart data={data} />
      </div>
    </div>
  );
};

export default ReportePedidos;
