import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const AlmacenEdit = () => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarAlmacen = async () => {
      try {
        const respuesta = await axios.get(`https://localhost:7010/api/Almacens/${id}`);
        // Asegúrate de que los campos en `respuesta.data` coincidan con tu API, este es un mensaje de prueba espero que de po
        setNombre(respuesta.data.nombreAlmacen);
        setDireccion(respuesta.data.direccionAlmacen);
      } catch (error) {
        console.error("Error al cargar el almacén:", error);
      }
    };

    if (id) {
      cargarAlmacen();
    }
  }, [id]);

  const editarAlmacen = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7010/api/Almacens/${id}`, {
        NombreAlmacen: nombre,
        DireccionAlmacen: direccion,
      });
      navigate('/ListaAlmacenesComponent'); // Cambia a la ruta donde se lista los almacenes
    } catch (error) {
      console.error("Error al editar el almacén:", error);
    }
  };

  return (
    <section className="container mx-auto mt-8">
      <div className="mx-auto max-w-2xl lg:py-16">
        <h2 className="text-2xl font-semibold mb-4">Editar Almacén</h2>
        <form className="w-full" onSubmit={editarAlmacen}>
          <div className="flex -mx-3 mb-6">
            <div className="w-full px-3">
              <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nombre del Almacén
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Nombre del almacén"
                required
              />
            </div>
          </div>
          <div className="flex -mx-3 mb-2">
            <div className="w-full px-3">
              <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Dirección del Almacén
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Dirección"
                required
              />
            </div>
          </div>
          <button type="submit" className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            Editar Almacén
          </button>
        </form>
      </div>
    </section>
  );
};

export default AlmacenEdit;
