import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListaCategoriesComponent = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCategories = async () => {
      try {
        const respuesta = await axios.get("https://localhost:5001/api/Categoriums");
        setCategories(respuesta.data);
        console.log(respuesta.data);
      } catch (error) {
        console.error("Error al obtener categories:", error);
      }
    };
    obtenerCategories();
  }, []);
  
  const irACrearUbicacion= () => {
    navigate('/FormCategory'); // Navega a la ruta deseada
  };
  const eliminarCategory= async (id) => {
    try {
      await axios.delete(`https://localhost:5001/api/Categoriums/${id}`);
      // Actualizar la lista de almacenes tras la eliminación
      setCategories(categories.filter((category) => category.categoriaId !== id));
    } catch (error) {
      console.error("Error al eliminar el almacén:", error);
    }
  };
  return (
    <div className="container mx-auto mt-8">
        <button
        onClick={irACrearUbicacion}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear Categoria
      </button>
      <h2 className="text-2xl font-semibold mb-4">Lista de Categories</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Descripcion</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.UbicacionId}>
              <td className="border px-4 py-2">{category.nombreCategoria}</td>
              <td className="border px-4 py-2">{category.descripcion}</td>
             
              <td className="border px-4 py-2">
                <button
                  onClick={() => navigate(`/UbicacionEdit/${category.categoriaId}`)}
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  Editar
                </button>
                <button
                    onClick={() => eliminarCategory(category.categoriaId)}
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

export default ListaCategoriesComponent;
