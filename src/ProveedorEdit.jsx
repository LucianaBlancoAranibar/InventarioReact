import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
const ProveedorEdit = () => {
  const [nombreProveedor, setNombreProveedor] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccionProveedor, setDireccionProveedor] = useState("");
  const { id } = useParams(); // Obtiene el ID desde la URL
  const navigate = useNavigate();
 
  const irAListaProveedores = () => {
    navigate("/ProveedorList"); // Asegúrate de que esta ruta es correcta
  };
 
  useEffect(() => {
    // Carga los datos del proveedor cuando el componente se monta
    const cargarProveedor = async () => {
      try {
        const resultado = await axios.get(
          `https://localhost:5001/api/Proveedors/${id}`
        );
        const proveedor = resultado.data;
        setNombreProveedor(proveedor.nombreProveedor);
        setTelefono(proveedor.telefono);
        setEmail(proveedor.email);
        setDireccionProveedor(proveedor.direccionProveedor);
      } catch (error) {
        console.error("Error al obtener datos del proveedor:", error);
      }
    };
 
    cargarProveedor();
  }, [id]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultado = await axios.put(
        `https://localhost:5001/api/Proveedors/${id}`,
        {
          ProveedorId: parseInt(id), // Asegúrate de que esto se envía y sea un número
          NombreProveedor: nombreProveedor,
          Telefono: telefono,
          Email: email,
          DireccionProveedor: direccionProveedor,
        }
      );
      console.log("Proveedor actualizado:", resultado.data);
 
      // Muestra el mensaje de éxito
      toast.success("Proveedor actualizado con éxito!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
 
      // Espera un momento antes de redirigir para que el usuario vea el mensaje
      setTimeout(() => navigate("/ProveedorList"), 2000);
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);
      toast.error("Error al actualizar proveedor.");
    }
  };
 
  return (
    <div className="edit-proveedor-container max-w-2xl mx-auto mt-10 p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Editar Proveedor
      </h2>
      <form onSubmit={handleSubmit} className="edit-proveedor-form">
        <div className="form-group mb-4">
          <label
            htmlFor="nombreProveedor"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="nombreProveedor"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={nombreProveedor}
            onChange={(e) => setNombreProveedor(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label
            htmlFor="telefono"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Teléfono:
          </label>
          <input
            type="text"
            id="telefono"
            value={telefono}
            onChange={(e) => {
              const valor = e.target.value;
              if (valor === "" || (/^\d+$/.test(valor) && valor.length <= 8)) {
                setTelefono(valor);
              }
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            maxLength="8"
            required
          />
        </div>
 
        <div className="form-group mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-6">
          <label
            htmlFor="direccionProveedor"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Dirección:
          </label>
          <input
            type="text"
            id="direccionProveedor"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={direccionProveedor}
            onChange={(e) => setDireccionProveedor(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={irAListaProveedores}
          >
            Volver a la Lista
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
 
export default ProveedorEdit;