import React, { useState, useEffect } from "react";
import axios from "axios";

const AlmacenComponent = () => {
  const [almacenes, setAlmacenes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  

  const registrarAlmacen = async () => {
    try {
      const respuesta = await axios.post(
        "https://localhost:5001/api/Almacens",
        {
          NombreAlmacen: nombre,
          DireccionAlmacen: direccion,
        }
      );
      console.log("Almacén registrado:", respuesta.data);
      setNombre("");
      setDireccion("");
    } catch (error) {
      console.error("Error al registrar almacén:", error);
    }
  };

  return (
    <>
      <section className="container mx-auto mt-8">
        <div className="mx-auto max-w-2xl lg:py-16">
          <h2 className="text-2xl font-semibold mb-4">
            Registrar Almacén
          </h2>
          <form
            class="w-full "
            onSubmit={(e) => {
              e.preventDefault();
              registrarAlmacen();
            }}
          >
            <div className="container mx-auto mt-8">
              <div class="flex -mx-3 mb-6">
                <div class="w-full px-3">
                  <label
                    htmlFor="nombre"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="grid-first-name"
                  >
                    Nombre del Almacén
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="aappearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Nombre del almacén"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">
                  <label
                    htmlFor="direccion"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
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
            </div>
            <button
              type="submit"
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Registrar Almacén
            </button>
          </form>
        </div>
      </section>
     
    </>
  );
};

export default AlmacenComponent;
