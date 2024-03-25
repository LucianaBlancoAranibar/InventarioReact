import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
        const config = {
          headers: {
            'Authorization': `Bearer ${token}` // Incluye el token en el encabezado de la solicitud
          }
        };
 
        const respuesta = await axios.get("https://localhost:7010/api/Proveedors", config);
        setProveedores(respuesta.data);
      } catch (error) {
        if (error.response) {
          // La solicitud fue hecha y el servidor respondió con un estado de error
          console.error("Error al obtener proveedores:", error.response.status);
          // Aquí puedes manejar diferentes códigos de estado como 401 o 403
          if (error.response.status === 401) {
            // Manejar error de autenticación
          } else if (error.response.status === 403) {
            // Manejar error de autorización
          }
        } else {
          // La solicitud fue hecha pero no se recibió respuesta del servidor
          console.error("Error de red o servidor no disponible");
        }
      }
    };
 
    obtenerProveedores();
  }, []);
  const editarProveedor = (id) => {
    navigate(`/ProveedorEdit/${id}`);
  };
 
  const eliminarProveedor = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este proveedor?"
    );
    if (confirmar) {
      try {
        await axios.delete(`https://localhost:7010/api/Proveedors/${id}`);
        setProveedores(
          proveedores.filter((proveedor) => proveedor.proveedorId !== id)
        );
        toast.success("Proveedor eliminado con éxito!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        console.error("Error al eliminar proveedor:", error);
        toast.error("Error al eliminar proveedor.");
      }
    }
  };
 
  return (
    <section className="container mx-auto mt-8 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4 lg:mb-0">
          Lista de Proveedores
        </h2>
        <button
          onClick={() => navigate("/ProveedorCreate")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Proveedor
        </button>
      </div>
      <div className="overflow-x-auto mt-6">
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
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
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
                <td className=" border px-4 py-2 ">
                  <button
                    onClick={() => editarProveedor(proveedor.proveedorId)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarProveedor(proveedor.proveedorId)}
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
      <ToastContainer />
    </section>
  );
};
 
export default ProveedorList;