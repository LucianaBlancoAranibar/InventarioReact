import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ListaPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/Pedidoes?_=${new Date().getTime()}');
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  const cancelarPedido = async (id) => {
    try {
      await axios.put(`https://localhost:5001/api/Pedidoes/Cancelar/${id}`);
      const updatedPedidos = pedidos.map(pedido => {
        if (pedido.pedidoId === id) {
          return { ...pedido, estado: 3 };
        }
        return pedido;
      });

      setPedidos(updatedPedidos);
    } catch (error) {
      console.error('Error al cancelar el pedido:', error);
    }
  };
  const obtenerEstadoTexto = (estado) => {
    switch (estado) {
      case 1:
        return { texto: 'Pendiente', color: 'text-yellow-600' };
      case 2:
        return { texto: 'Enviado', color: 'text-green-600' };
      case 3:
        return { texto: 'Cancelado', color: 'text-red-600' };
      default:
        return { texto: 'Desconocido', color: 'text-gray-600' };
    }
  };
  const irACrearPedido= () => {
    navigate('/PedidoForm'); // Navega a la ruta deseada
  };
  return (
    <div className="container mx-auto mt-8">
        <button
        onClick={irACrearPedido}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear Pedido
      </button>
      <h2 className="text-2xl font-semibold mb-4">Lista de Pedidos</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Fecha de Pedido</th>
            <th className="px-4 py-2 border">Entrega</th>
            <th className="px-4 py-2 border">Cliente</th>
            <th className="px-4 py-2 border">Estado</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
        {pedidos.map((pedido) => {
            const { texto, color } = obtenerEstadoTexto(pedido.estado);
            return (
              <tr key={pedido.pedidoId}>
                <td className="border px-4 py-2">{pedido.fechaPedido}</td>
                <td className="border px-4 py-2">{pedido.fechaEntrega}</td>
                <td className="border px-4 py-2">{pedido.cliente}</td>
                <td className={`border px-4 py-2 ${color}`}>{texto}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => cancelarPedido(pedido.pedidoId)}
                    disabled={pedido.estado === 3}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPedidos;
