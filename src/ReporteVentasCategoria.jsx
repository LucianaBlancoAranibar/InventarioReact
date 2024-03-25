import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const ReporteVentasCategoria = () => {
  const [reporteDatos, setReporteDatos] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7010/reporte-ventas-categoria')
      .then(response => response.json())
      .then(data => setReporteDatos(data))
      .catch(console.error);
  }, []);

  const data = {
    labels: reporteDatos.map(d => d.categoria),
    datasets: [{
      label: 'Total de Ventas por Categoría',
      data: reporteDatos.map(d => d.totalVentas),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }]
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Reporte de Ventas por Categoría</h2>
      <Bar data={data} />
    </div>
  );
};

export default ReporteVentasCategoria;
