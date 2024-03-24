import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetalleCompra = () => {
  const [compra, setCompra] = useState(null);
  const [loading, setLoading] = useState(true);
  const { compraId } = useParams();

  useEffect(() => {
    const fetchDetalleCompra = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://localhost:7010/api/Compras/${compraId}`
        );
        setCompra(response.data);
      } catch (error) {
        console.error("Error al obtener el detalle de la compra:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalleCompra();
  }, [compraId]);

  const subtotales = compra?.detalleCompras.map(
    (detalle) => detalle.cantidad * detalle.costo
  );
  const totalCompra = subtotales?.reduce((acc, curr) => acc + curr, 0) || 0;

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (!compra) return <div className="text-center mt-5">No se encontraron detalles para esta compra.</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Detalle de la Compra {compraId}
      </h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Información de la Compra</h3>
        <p className="mt-2 text-sm text-gray-600">
          Fecha de compra: {new Date(compra.fechaCompra).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">Nombre de usuario: {compra.nombreUsuario}</p>
        <p className="text-sm text-gray-600">Nombre de proveedor: {compra.nombreProveedor}</p>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Productos Comprados</h3>
        <div className="mt-4">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Producto
                </th>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Costo
                </th>
              </tr>
            </thead>
            <tbody>
              {compra.detalleCompras.map((detalle, index) => {
                const subtotal = detalle.cantidad * detalle.costo;
                return (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border-b border-gray-200 px-5 py-5 text-sm">
                      {detalle.nombreProducto}
                    </td>
                    <td className="border-b border-gray-200 px-5 py-5 text-sm">
                      {detalle.cantidad}
                    </td>
                    <td className="border-b border-gray-200 px-5 py-5 text-sm">
                      {detalle.costo}
                    </td>
                    <td className="border-b border-gray-200 px-5 py-5 text-sm">
                      {subtotal.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
              {/* Fila para el total */}
              <tr className="font-bold">
                <td colSpan="3" className="text-right px-5 py-5">
                  Total de la Compra:
                </td>
                <td className="border-b border-gray-200 px-5 py-5 text-sm">
                  {totalCompra.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetalleCompra;
