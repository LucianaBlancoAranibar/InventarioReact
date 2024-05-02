import React, { useState, useEffect } from "react";
import axios from "axios";

const FormUbicacion = () => {
  const [almacenes, setAlmacenes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [almacenId, setAlmacenId] = useState("");

  useEffect(() => {
    const obtenerAlmacenes = async () => {
      try {
        const respuesta = await axios.get("https://localhost:5001/api/Almacens");
        setAlmacenes(respuesta.data);
      } catch (error) {
        console.error("Error al obtener almacenes:", error);
      }
    };
    obtenerAlmacenes();
  }, []);

  const registrarUbicacion = async (e) => {
    e.preventDefault();

    if (!almacenId) {
      alert("Debe seleccionar un almacén."); 
      return;
    }

    try {
      const respuesta = await axios.post("https://localhost:5001/api/Ubicacions", {
        NombreUbicacion: nombre,
        Descripcion: descripcion,
        AlmacenId: parseInt(almacenId, 10),
      });

      console.log("Ubicación registrada:", respuesta.data);
      // Limpiar el formulario después de una inserción exitosa
      setNombre("");
      setDescripcion("");
      setAlmacenId("");
    } catch (error) {
      console.error("Error al registrar ubicación:", error);
    }
  };

  return (
    <section className="container mx-auto mt-8">
      <div className="mx-auto max-w-2xl lg:py-16">
        <h2 className="text-2xl font-semibold mb-4">Registrar Ubicación</h2>
        <form onSubmit={registrarUbicacion}>
          <div className="mb-6">
            <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nombre de la Ubicación
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Nombre de la ubicación"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Descripción de la Ubicación
            </label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Descripción"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="almacen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Almacén
            </label>
            <select
              id="almacen"
              name="almacen"
              value={almacenId}
              onChange={(e) => setAlmacenId(e.target.value)}
              className="block w-full bg-gray-200 border rounded py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
            >
              <option value="">Seleccione un almacén</option>
              {almacenes.map((almacen) => (
                <option key={almacen.almacenId} value={almacen.almacenId}>
                  {almacen.nombreAlmacen}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Registrar Ubicación
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormUbicacion;
