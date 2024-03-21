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
        const respuesta = await axios.get("https://localhost:7010/api/Almacens");
        setAlmacenes(respuesta.data);
      } catch (error) {
        console.error("Error al obtener almacenes:", error);
      }
    };
    obtenerAlmacenes();
  }, []);

  const registrarUbicacion = async (e) => {
    e.preventDefault();
    
    // Verificar si se ha seleccionado un almacén
    if (!almacenId) {
      console.error("Debe seleccionar un almacén.");
      return;
    }

    try {
      const respuesta = await axios.post("https://localhost:7010/api/Ubicacions", {
        NombreUbicacion: nombre,
        Descripcion: descripcion,
        AlmacenId: parseInt(almacenId, 10) // Asegurarse de que sea un entero
      });

      console.log("Ubicación registrada:", respuesta.data);
      setNombre("");
      setDescripcion("");
      setAlmacenId(""); // Resetear el almacenId también
    } catch (error) {
      console.error("Error al registrar ubicación:", error);
    }
  };

  return (
    <>
      <section className="container mx-auto mt-8">
        <div className="mx-auto max-w-2xl lg:py-16">
          <h2 className="text-2xl font-semibold mb-4">Registrar Ubicacion</h2>
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              registrarUbicacion(e);
            }}
          >
            <div className="container mx-auto mt-8">
              <div className="flex -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    htmlFor="nombre"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre del Ubicacion
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Nombre del ubicacion"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                  <label
                    htmlFor="descripcion"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Descripcion del Ubicacion
                  </label>
                  <input
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Dirección"
                    required
                  />
                </div>
              </div>
              <div className="w-full px-3 mb-6">
                <label
                  htmlFor="almacen"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Almacén
                </label>
                <select
                  id="almacen"
                  name="almacen"
                  value={almacenId}
                  onChange={(e) => setAlmacenId(e.target.value)}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
            </div>
            <button
              type="submit"
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Registrar Ubicacion
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default FormUbicacion;
