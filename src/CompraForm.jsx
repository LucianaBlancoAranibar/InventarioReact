import React, { useState, useEffect } from "react";
import axios from "axios";

const CompraForm = () => {
  const [fechaCompra, setFechaCompra] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [proveedorId, setProveedorId] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [detalleCompras, setDetalleCompras] = useState([]);

  // Función para obtener la lista de proveedores
  const fetchProveedores = async () => {
    try {
      const response = await axios.get("https://localhost:7010/api/Proveedors");
      setProveedores(response.data);
    } catch (error) {
      console.error("Error al obtener los proveedores:", error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await axios.get("https://localhost:7010/api/Productoes");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProveedores();
    fetchProductos();
  }, []);

  // Manejar la adición de detalles de compra
  const agregarDetalleCompra = () => {
    setDetalleCompras([...detalleCompras, { productoId: "", cantidad: "" }]);
  };

  // Actualizar los detalles de compra
  const handleDetalleChange = (index, field, value) => {
    const newDetalleCompras = [...detalleCompras];
    newDetalleCompras[index] = { ...newDetalleCompras[index], [field]: value };
    setDetalleCompras(newDetalleCompras);
  };

  // Enviar la compra al backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://localhost:7010/api/Compras", {
        fechaCompra,
        usuarioId: parseInt(usuarioId, 10),
        proveedorId: parseInt(proveedorId, 10),
        detalleCompras,
      });

      if (response.status === 201) {
        console.log("Compra registrada con éxito");
        // Aquí puedes redirigir o manejar el estado post-creación
      }
    } catch (error) {
      console.error("Error al registrar la compra:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="fechaCompra"
          className="block text-sm font-medium text-gray-700"
        >
          Fecha y Hora de Compra
        </label>
        <input
          id="fechaCompra"
          type="datetime-local"
          value={fechaCompra}
          onChange={(e) => setFechaCompra(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="usuarioId"
          className="block text-sm font-medium text-gray-700"
        >
          ID de Usuario
        </label>
        <input
          id="usuarioId"
          type="number"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
          placeholder="Ingrese el ID de Usuario"
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="proveedorId"
          className="block text-sm font-medium text-gray-700"
        >
          Proveedor
        </label>
        <select
          id="proveedorId"
          value={proveedorId}
          onChange={(e) => setProveedorId(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400"
        >
          <option value="">Selecciona un proveedor</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.proveedorId} value={proveedor.proveedorId}>
              {proveedor.nombreProveedor}
            </option>
          ))}
        </select>
      </div>
      {detalleCompras.map((detalle, index) => (
        <div key={index} className="mb-4">
          <label
            htmlFor={`productoId${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Producto {index + 1}
          </label>
          <div className="flex mt-1">
            <select
              id={`productoId${index}`}
              value={detalle.productoId}
              onChange={(e) =>
                handleDetalleChange(index, "productoId", e.target.value)
              }
              required
              className="flex-1 mr-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="">Selecciona un producto</option>
              {productos.map((producto) => (
                <option key={producto.productoId} value={producto.productoId}>
                  {producto.nombreProducto}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={detalle.cantidad}
              onChange={(e) =>
                handleDetalleChange(index, "cantidad", e.target.value)
              }
              placeholder="Cantidad"
              required
              className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={agregarDetalleCompra}
        className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-4"
      >
        Agregar Producto
      </button>
      <button
        type="submit"
        className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Registrar Compra
      </button>
    </form>
  );
};

export default CompraForm;
