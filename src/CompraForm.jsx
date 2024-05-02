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
      const response = await axios.get("https://localhost:5001/api/Proveedors");
      setProveedores(response.data);
    } catch (error) {
      console.error("Error al obtener los proveedores:", error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await axios.get("https://localhost:5001/api/Productoes");
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
      const response = await axios.post("https://localhost:5001/api/Compras", {
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
  const eliminarDetalle = (index) => {
    setDetalleCompras(detalleCompras.filter((_, i) => i !== index));
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Registro de Compra</h2>
      <div className="mb-4">
        <label
          htmlFor="fechaCompra"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Fecha y Hora de Compra
        </label>
        <input
          id="fechaCompra"
          type="datetime-local"
          value={fechaCompra}
          onChange={(e) => setFechaCompra(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="usuarioId"
          className="block text-gray-700 text-sm font-bold mb-2"
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          className="block text-gray-700 text-sm font-bold mb-2"
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
            className="block text-gray-700 text-sm font-bold mb-2"
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
              className="shadow border rounded py-2 px-3 text-gray-700 mr-2"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
             {detalleCompras.length > 1 && (
              <button
                type="button"
                onClick={() => eliminarDetalle(index)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={agregarDetalleCompra}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
