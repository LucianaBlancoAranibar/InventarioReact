import React, { useState, useEffect } from "react";
import axios from "axios";

const RegistroPedido = () => {
  const [pedido, setPedido] = useState({
    fechaPedido: "",
    fechaEntrega: "",
    cliente: "",
    usuarioId: "",
    detallePedidos: [],
  });
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/Productoes"
        );
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleChange = (e) => {
    setPedido({
      ...pedido,
      [e.target.name]: e.target.value,
    });
  };

  const handleDetalleChange = (e, index) => {
    const detalles = [...pedido.detallePedidos];
    detalles[index][e.target.name] = e.target.value;
    setPedido({
      ...pedido,
      detallePedidos: detalles,
    });
  };

  const agregarDetalle = () => {
    setPedido({
      ...pedido,
      detallePedidos: [
        ...pedido.detallePedidos,
        { productoId: "", cantidad: "" },
      ],
    });
  };
  const eliminarDetalle = (index) => {
    setPedido({
      ...pedido,
      detallePedidos: pedido.detallePedidos.filter((_, i) => i !== index),
    });
  };
  const enviarPedido = async (e) => {
    e.preventDefault();
    // Transforma productoId a número, si es necesario
    const pedidoConIds = {
      ...pedido,
      detallePedidos: pedido.detallePedidos.map((detalle) => ({
        ...detalle,
        productoId: Number(detalle.productoId),
        cantidad: Number(detalle.cantidad),
      })),
    };

    try {
      const response = await axios.post(
        "https://localhost:5001/api/Pedidoes",
        pedidoConIds
      );
      console.log("Pedido registrado:", response.data);
      // Manejar la respuesta satisfactoria
    } catch (error) {
      console.error("Error al registrar el pedido:", error);
      // Manejar el error
    }
  };

  return (
    <form onSubmit={enviarPedido} className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Registro de Pedido</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="fechaPedido"
        >
          Fecha de Pedido
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="datetime-local"
          name="fechaPedido"
          value={pedido.fechaPedido}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="fechaEntrega"
        >
          Fecha de Entrega
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="datetime-local"
          name="fechaEntrega"
          value={pedido.fechaEntrega}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="cliente"
        >
          Cliente
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="cliente"
          value={pedido.cliente}
          onChange={handleChange}
          placeholder="Cliente"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="usuarioId"
        >
          ID del Usuario
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          name="usuarioId"
          value={pedido.usuarioId}
          onChange={handleChange}
          placeholder="ID del Usuario"
          required
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Detalle de Productos</h3>
        {pedido.detallePedidos.map((detalle, index) => (
          <div key={index} className="mb-4 flex">
            <select
              className="shadow border rounded py-2 px-3 text-gray-700 mr-2"
              name="productoId"
              value={detalle.productoId}
              onChange={(e) => handleDetalleChange(e, index)}
              required
            >
              <option value="">Seleccione un producto</option>
              {productos.map((producto) => (
                <option key={producto.productoId} value={producto.productoId}>
                  {producto.nombreProducto}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="cantidad"
              value={detalle.cantidad}
              onChange={(e) => handleDetalleChange(e, index)}
              placeholder="Cantidad"
              className="shadow border rounded py-2 px-3 text-gray-700 flex-1"
              required
            />
            {pedido.detallePedidos.length > 1 && (
              <button
                type="button"
                onClick={() => eliminarDetalle(index)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={agregarDetalle}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Producto
        </button>
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Registrar Pedido
      </button>
    </form>
  );
};

export default RegistroPedido;
