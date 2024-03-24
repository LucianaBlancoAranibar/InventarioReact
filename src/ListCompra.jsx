import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ListaCompras = () => {
  const [compras, setCompras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        // Obtener las compras
        const { data } = await axios.get('https://localhost:7010/api/Compras');

        // Mapear las compras y enriquecerlas con los nombres de usuarios y proveedores
        const comprasConNombres = await Promise.all(data.map(async (compra) => {
          // Suponiendo que tienes endpoints como /api/Usuarios/{id} y /api/Proveedores/{id}
          const [usuarioRes, proveedorRes] = await Promise.all([
            axios.get(`https://localhost:7010/api/Usuarios/${compra.usuarioId}`),
            axios.get(`https://localhost:7010/api/Proveedors/${compra.proveedorId}`)
          ]);

          // Retorna la compra con los nombres de usuario y proveedor
          return {
            ...compra,
            nombreUsuario: usuarioRes.data.nombreUsuario, // Asumiendo que la respuesta es un objeto con un campo 'nombre'
            nombreProveedor: proveedorRes.data.nombreProveedor
          };
        }));
        console.log(comprasConNombres);
    
        setCompras(comprasConNombres);
      } catch (error) {
        console.error('Error al obtener las compras:', error);
      }
    };

    fetchCompras();
  }, []);
  const handleVerDetalle = (compraId) => {
    navigate(`/DetalleCompra/${compraId}`);
  };
  const irACrearCompra= () => {
    navigate('/CompraForm'); // Navega a la ruta deseada
  };
  return (
    <div className="container mx-auto mt-8">
           <button
        onClick={irACrearCompra}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear Compra
      </button>
      <h2 className="text-2xl font-semibold mb-4">Lista de Compras</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Fecha de Compra</th>
              <th className="px-4 py-2 border">Nombre de Usuario</th>
              <th className="px-4 py-2 border">Nombre de Proveedor</th>
              {/* <th className="px-4 py-2 border">Detalles de Compra</th> */}
              <th className="px-4 py-2 border">Detalles de Compra</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{new Date(compra.fechaCompra).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{compra.nombreUsuario || 'No Disponible'}</td>
                <td className="border px-4 py-2">{compra.nombreProveedor || 'No Disponible'}</td>
              
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleVerDetalle(compra.compraId)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaCompras;
