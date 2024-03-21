// ListaAlmacenesComponent.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ListaAlmacenesComponent = () => {
  const [almacenes, setAlmacenes] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const obtenerAlmacenes = async () => {
      try {
        const respuesta = await axios.get("https://localhost:7010/api/Almacens");
        setAlmacenes(respuesta.data);
      } catch (error) {
        console.error("Error al obtener almacenes:", error);
      }
    };

    obtenerAlmacenes();
  }, []);
  const eliminarAlmacen = async (id) => {
    try {
      await axios.delete(`https://localhost:7010/api/Almacens/${id}`);
      // Actualizar la lista de almacenes tras la eliminación
      setAlmacenes(almacenes.filter((almacen) => almacen.almacenId !== id));
    } catch (error) {
      console.error("Error al eliminar el almacén:", error);
    }
  };
  const irACrearAlmacen = () => {
    navigate('/AlmacensComponent'); // Navega a la ruta deseada
  };
  return (
    <div className="container mx-auto mt-8">
      <button
        onClick={irACrearAlmacen}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear Almacén
      </button>
      <h2 className="text-2xl font-semibold mb-4">Lista de Almacenes</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Dirección</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {almacenes.length > 0 ? (
            almacenes.map((almacen) => (
              <tr key={almacen.almacenId}>
                <td className="border px-4 py-2">{almacen.nombreAlmacen}</td>
                <td className="border px-4 py-2">{almacen.direccionAlmacen}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => navigate(`/AlmacenEdit/${almacen.almacenId}`)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => eliminarAlmacen(almacen.almacenId)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2" colSpan="3">Cargando almacenes...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaAlmacenesComponent;
