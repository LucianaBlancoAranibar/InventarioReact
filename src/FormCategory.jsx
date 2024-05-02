import React, { useState, useEffect } from "react";
import axios from "axios";

const FormCategory = () => {

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const registrarCategory = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await axios.post("https://localhost:5001/api/Categoriums", {
        nombreCategoria: nombre,
        Descripcion: descripcion,
    
      });

      console.log("Category registrada:", respuesta.data);
      // Limpiar el formulario después de una inserción exitosa
      setNombre("");
      setDescripcion("");
     
    } catch (error) {
      console.error("Error al registrar category:", error);
      console.log("Category registrada:", respuesta.data);
    }
  };

  return (
    <section className="container mx-auto mt-8">
      <div className="mx-auto max-w-2xl lg:py-16">
        <h2 className="text-2xl font-semibold mb-4">Registrar Categoria</h2>
        <form onSubmit={registrarCategory}>
          <div className="mb-6">
            <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Categoria
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Nombre"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Descripción 
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
          
          <button
            type="submit"
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Registrar 
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormCategory;
``
