import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListaProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProducts = async () => {
      try {
        const respuesta = await axios.get("https://localhost:7010/api/Productoes");
        setProducts(respuesta.data);
      } catch (error) {
        console.error("Error al obtener products:", error);
      }
    };
    obtenerProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.nombreProducto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const eliminarProduct = async (id) => {
    try {
      await axios.delete(`https://localhost:7010/api/Productoes/${id}`);
      setProducts(products.filter((product) => product.productoId !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const irACrearProduct = () => {
    navigate('/ProductForm');
  };

  return (
    <div className="container mx-auto mt-8">
      <button
        onClick={irACrearProduct}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear Producto
      </button>
      <h2 className="text-2xl font-semibold mb-4">Lista de Productos</h2>
      <div className="my-4">
        <input
          type="text"
          className="w-3/4 p-2 border rounded"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Descripción</th>
            <th className="px-4 py-2 border">Precio</th>
            <th className="px-4 py-2 border">Costo</th>
            <th className="px-4 py-2 border">Imagen</th>
            <th className="px-4 py-2 border">Categoria</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.productoId}>
              <td className="border px-4 py-2">{product.nombreProducto}</td>
              <td className="border px-4 py-2">{product.descripcion}</td>
              <td className="border px-4 py-2">{product.precioUnitario}</td>
              <td className="border px-4 py-2">{product.costo}</td>
              <td className="border px-4 py-2">
                <img src={`https://localhost:7010/Image/${product.imagen}`} alt={product.nombreProducto} style={{ width: "100px" }} />
              </td>
              <td className="border px-4 py-2">{product.categoriaId}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => navigate(`/ProductEdit/${product.productoId}`)}
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarProduct(product.productoId)}
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

export default ListaProductsComponent;
