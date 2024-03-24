import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsuarioCreate = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://localhost:7010/api/Usuarios/register', {
        NombreUsuario: nombreUsuario,
        Email: email,
        Contraseña: contraseña,
        Rol: parseInt(rol), 
      });

      toast.success('Usuario creado con éxito!');
      navigate('/'); 
    } catch (error) {
      toast.error(`Error al crear el usuario: ${error.message}`);
    }
  };

  
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-5 text-center">Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="nombreUsuario" className="block text-gray-700 text-sm font-bold mb-2">Nombre de Usuario:</label>
          <input
            type="text"
            id="nombreUsuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contraseña" className="block text-gray-700 text-sm font-bold mb-2">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rol" className="block text-gray-700 text-sm font-bold mb-2">Rol:</label>
          <select
            id="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona un rol</option>
            <option value="1">Administrador</option>
            <option value="2">Vendedor</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Crear Usuario
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UsuarioCreate;
