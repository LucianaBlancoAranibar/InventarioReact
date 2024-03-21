import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListaUbicacionesComponent = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerUbicaciones = async () => {
      try {
        const respuesta = await axios.get("https://localhost:7010/api/Ubicacions");
        setUbicaciones(respuesta.data);
        console.log(respuesta.data);
      } catch (error) {
        console.error("Error al obtener ubicaciones:", error);
      }
    };
    obtenerUbicaciones();
  }, []);
  const eliminarUbicacion = async (id) => {
    try {
      await axios.delete(`https://localhost:7010/api/Ubicacions/${id}`);
      // Actualizar la lista de almacenes tras la eliminación
      setAlmacenes(ubicaciones.filter((ubicacion) => ubicacion.ubicacionId !== id));
    } catch (error) {
      console.error("Error al eliminar el almacén:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Lista de Ubicaciones</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Descripción</th>
            <th className="px-4 py-2 border">Almacen</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ubicaciones.map((ubicacion) => (
            <tr key={ubicacion.UbicacionId}>
              <td className="border px-4 py-2">{ubicacion.nombreUbicacion}</td>
              <td className="border px-4 py-2">{ubicacion.descripcion}</td>
              <td className="border px-4 py-2">{ubicacion.almacenNombre}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => navigate(`/UbicacionEdit/${ubicacion.ubicacionId}`)}
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  Editar
                </button>
                <button
                    onClick={() => eliminarUbicacion(ubicacion.ubicacionId)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUbicacionesComponent;
