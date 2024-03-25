import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

const UbicacionReporte = () => {
  const [reporte, setReporte] = useState([]);
  const [filtroAdicional, setFiltroAdicional] = useState("");
  const [agrupacion, setAgrupacion] = useState("");
  const [datosAgrupados, setDatosAgrupados] = useState([]);

  useEffect(() => {
    fetchReporte();
  }, [filtroAdicional, agrupacion]);

  const fetchReporte = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7010/reporte-ubicacion`,
        {
          params: { filtroAdicional, agrupacion },
        }
      );
      console.log(response.data);
      setReporte(response.data);
      handleAgrupacion(response.data, agrupacion);
    } catch (error) {
      console.error("Error al obtener el reporte de inventario:", error);
    }
  };

  const handleAgrupacion = (datos, criterio) => {
    const agrupados =
      criterio === "producto"
        ? _.groupBy(datos, "producto")
        : criterio === "ubicacion"
        ? _.groupBy(datos, "ubicacion")
        : datos;
    setDatosAgrupados(agrupados);
  };

  useEffect(() => {
    handleAgrupacion(reporte, agrupacion);
  }, [reporte, agrupacion]);

  const renderFilas = (datos) => {
    if (_.isArray(datos)) {
      return datos.map((item, index) => (
        <tr key={index} className="hover:bg-gray-100">
          <td className="text-left py-3 px-4">{item.producto}</td>
          {/* <td className="text-left py-3 px-4">{item.categoria}</td> */}
          <td className="text-left py-3 px-4">{item.almacen}</td>
          <td className="text-left py-3 px-4">{item.ubicacion}</td>
          <td className="text-left py-3 px-4">{item.disponible}</td>
        </tr>
      ));
    } else {
      return Object.entries(datos).map(([grupo, items], idx) => (
        <React.Fragment key={idx}>
          <tr className="bg-gray-200">
            <td colSpan="5" className="text-left py-2 px-4 font-semibold">
              {grupo}
            </td>
          </tr>
          {items.map((item, i) => (
            <tr key={`${idx}_${i}`} className="hover:bg-gray-100">
              <td className="text-left py-3 px-4">{item.producto}</td>
              {/* <td className="text-left py-3 px-4">{item.categoria}</td> */}
              <td className="text-left py-3 px-4">{item.almacen}</td>
              <td className="text-left py-3 px-4">{item.ubicacion}</td>
              <td className="text-left py-3 px-4">{item.disponible}</td>
            </tr>
          ))}
        </React.Fragment>
      ));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Reporte de Ubicación del Inventario
      </h1>

      <div className="flex flex-col space-y-4 mb-4">
        <input
          type="text"
          placeholder="Filtrar por producto..."
          className="form-input px-4 py-2 border rounded"
          value={filtroAdicional}
          onChange={(e) => setFiltroAdicional(e.target.value)}
        />
        <select
          className="form-select px-4 py-2 border rounded"
          value={agrupacion}
          onChange={(e) => setAgrupacion(e.target.value)}
        >
          <option value="">Seleccionar Agrupación</option>
          <option value="ubicacion">Agrupar por Ubicación</option>
          <option value="producto">Agrupar por Producto</option>
        </select>
        <button
          onClick={fetchReporte}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Aplicar Filtros
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Producto
              </th>
              {/* <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Categoría
              </th> */}
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Almacén
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Ubicación
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Cantidad Disponible
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">{renderFilas(datosAgrupados)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default UbicacionReporte;
