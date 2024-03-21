import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const respuesta = await axios.get('https://localhost:7010/api/Proveedors');
        setProveedores(respuesta.data);
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
      }
    };

    obtenerProveedores();
  }, []);

  const editarProveedor = (id) => {
    navigate(`/Proveedor/ProveedorEditar/${id}`);
  };

  const eliminarProveedor = async (id) => {
    try {
      await axios.delete(`https://localhost:7010/api/Proveedors/${id}`);
      setProveedores(proveedores.filter((proveedor) => proveedor.ProveedorId !== id));
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
    }
  };

  return (
    <section className="container mx-auto mt-8">
      <div className="mx-auto max-w-4xl lg:py-16">
        <h2 className="text-2xl font-semibold mb-4">Lista de Proveedores</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor.proveedorId}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {proveedor.nombreProveedor}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {proveedor.telefono}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {proveedor.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {proveedor.direccionProveedor}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => editarProveedor(proveedor.proveedorId)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProveedorList;
