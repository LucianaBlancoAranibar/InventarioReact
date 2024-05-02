import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
const ProveedorCreate = () => {
  const [nombreProveedor, setNombreProveedor] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccionProveedor, setDireccionProveedor] = useState("");
  const navigate = useNavigate();
 
  const irAListaProveedores = () => {
    navigate("/ProveedorList"); // Asegúrate de que esta ruta es correcta
  };
 
  const registrarProveedor = async () => {
    try {
      const respuesta = await axios.post(
        "https://localhost:5001/api/Proveedors",
        {
          NombreProveedor: nombreProveedor,
          Telefono: telefono,
          Email: email,
          DireccionProveedor: direccionProveedor,
        }
      );
      console.log("Proveedor registrado:", respuesta.data);
      toast.success("Proveedor creado con éxito!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setNombreProveedor("");
      setTelefono("");
      setEmail("");
      setDireccionProveedor("");
    } catch (error) {
      console.error("Error al registrar proveedor:", error);
      toast.error("Error al crear proveedor.");
    }
  };
 
  return (
    <section className="container mx-auto mt-8">
      <div className="mx-auto max-w-2xl lg:py-16">
        <h2 className="text-2xl font-semibold mb-4">Registrar Proveedor</h2>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            registrarProveedor();
          }}
        >
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="nombreProveedor"
            >
              Nombre del Proveedor
            </label>
            <input
              type="text"
              id="nombreProveedor"
              value={nombreProveedor}
              onChange={(e) => setNombreProveedor(e.target.value)}
              className="bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 block w-full"
              placeholder="Ingrese el nombre del proveedor"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="telefono"
            >
              Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              value={telefono}
              onChange={(e) => {
                // Permitir solo números y limitar la longitud a 8 caracteres
                const valor = e.target.value;
                if (
                  valor === "" ||
                  (/^\d+$/.test(valor) && valor.length <= 8)
                ) {
                  setTelefono(valor);
                }
              }}
              className="bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 block w-full"
              placeholder="Ingrese el teléfono del proveedor"
              maxLength="8"
              required
            />
          </div>
 
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 block w-full"
              placeholder="Ingrese el correo electrónico del proveedor"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="direccionProveedor"
            >
              Dirección
            </label>
            <input
              type="text"
              id="direccionProveedor"
              value={direccionProveedor}
              onChange={(e) => setDireccionProveedor(e.target.value)}
              className="bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 block w-full"
              placeholder="Ingrese la dirección del proveedor"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Registrar Proveedor
            </button>
          </div>
          <div>
            <button
              type="button"
              className="shadow bg-green-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              onClick={irAListaProveedores}
            >
              Volver a la Lista
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};
 
export default ProveedorCreate;