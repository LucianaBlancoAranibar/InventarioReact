import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetalleCompra = () => {
  const [compra, setCompra] = useState(null);
  const [loading, setLoading] = useState(true);
  const { compraId } = useParams();

  useEffect(() => {
    const fetchDetalleCompra = async () => {
      setLoading(true); // Asegúrate de iniciar el indicador de carga
      try {
        const response = await axios.get(`https://localhost:7010/api/Compras/${compraId}`);
        const compraData = response.data;

        // Asegúrate de que detalleCompras existe y es un array
        if (Array.isArray(compraData.detalleCompras)) {
          // Si detalleCompras es un array, procede a obtener los nombres de productos, etc.
          const detallesConNombres = await Promise.all(compraData.detalleCompras.map(async (detalle) => {
            const productoRes = await axios.get(`https://localhost:7010/api/Productos/${detalle.productoId}`);
            return {
              ...detalle,
              productoNombre: productoRes.data.nombre // Asegúrate de que este es el campo correcto para el nombre del producto
            };
          }));

          compraData.detalleCompras = detallesConNombres;
        }
console.log(compraData);
        setCompra(compraData);
      } catch (error) {
        console.error('Error al obtener el detalle de la compra:', error);
        // Considera también actualizar el estado de error para mostrar el mensaje de error en la UI
      } finally {
        setLoading(false); // Finaliza el indicador de carga
      }
    };

    fetchDetalleCompra();
  }, [compraId]);

  if (loading) return <div>Cargando...</div>;
  if (!compra) return <div>No se encontraron detalles para esta compra.</div>;
  
   return (
  <div className="container mx-auto p-4">
    <h2 className="text-2xl font-semibold mb-4">Detalle de la Compra {compraId}</h2>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Información de la Compra</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Detalles y productos.</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Fecha de Compra</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(compra.fechaCompra).toLocaleDateString()}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Usuario</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{compra.nombreUsuario || 'No Disponible'}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Proveedor</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{compra.nombreProveedor || 'No Disponible'}</dd>
          </div>
          {compra.detalleCompras?.map((detalle, index) => (
            <React.Fragment key={index}>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Producto #{index + 1}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{detalle.productoNombre || 'No Disponible'}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Cantidad</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{detalle.cantidad}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Precio</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{detalle.precio}</dd>
              </div>
            </React.Fragment>
          ))}
        </dl>
      </div>
    </div>
  </div>
);

};
  
export default DetalleCompra;
