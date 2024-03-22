import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListInventario = () => {
  const [inventarios, setInventarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerInventarios = async () => {
      try {
        const respuesta = await axios.get(
          "https://localhost:7010/api/Inventarios/"
        );
        setInventarios(respuesta.data);
        console.log(respuesta.data);
      } catch (error) {
        console.error("Error al obtener inventarios:", error);
      }
    };
    obtenerInventarios();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`https://localhost:7010/api/Inventarios/${id}`);
    setInventarios(
      inventarios.filter((inventario) => inventario.inventarioId !== id)
    );
  };
  const irACrearInventario = () => {
    navigate("/InventarioForm"); // Navega a la ruta deseada
  };
  return (
    <section className="container mx-auto mt-8">
      <div className="mx-auto max-w-2xl lg:py-16">
        <h2 className="text-2xl font-semibold mb-4">Registrar Producto</h2>
        <button
          onClick={irACrearInventario}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Inventario
        </button>
        <h2 className="text-2xl font-semibold mb-4">Lista de Inventario</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Producto</th>
              <th className="px-4 py-2 border">Ubicación</th>
              <th className="px-4 py-2 border">Cantidad</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inventarios.map((inventario) => (
              <tr key={inventario.inventarioId}>
                {/* Asegúrate de que 'producto' y 'ubicacion' correspondan a cómo tu API devuelve estos objetos */}
                <td className="border px-4 py-2">
                  {inventario.nombreProducto}
                </td>
                <td className="border px-4 py-2">
                  {inventario.nombreUbicacion}
                </td>
                <td className="border px-4 py-2">{inventario.cantidad}</td>

                <td className="border px-4 py-2">
                  <button
                    onClick={() =>
                      navigate(`/InventarioEdit/${inventario.inventarioId}`)
                    }
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Editar
                  </button>
             
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ListInventario;
