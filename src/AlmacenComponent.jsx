import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlmacenComponent = () => {
  const [almacenes, setAlmacenes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');

  useEffect(() => {
    obtenerAlmacenes();
  }, []);

  const obtenerAlmacenes = async () => {
    try {
      const respuesta = await axios.get('https://localhost:7010/api/Almacens');
      setAlmacenes(respuesta.data);
    } catch (error) {
      console.error('Error al obtener almacenes:', error);
    }
  };

  const registrarAlmacen = async () => {
    try {
      const respuesta = await axios.post('https://localhost:7010/api/Almacens', {
        nombre: nombre,
        direccion: direccion
      });
      console.log('Almacén registrado:', respuesta.data);
      setNombre('');
      setDireccion('');
      obtenerAlmacenes();
    } catch (error) {
      console.error('Error al registrar almacén:', error);
    }
  };

  const eliminarAlmacen = async (id) => {
    try {
      await axios.delete(`https://localhost:7010/api/Almacens/${id}`);
      console.log('Almacén eliminado:', id);
      obtenerAlmacenes();
    } catch (error) {
      console.error('Error al eliminar almacén:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Almacenes</h2>
      <ul>
        {almacenes.map((almacen) => (
          <li key={almacen.almacenId} className="flex justify-between items-center border-b py-2">
            <div>
              <span className="text-lg font-semibold">{almacen.nombreAlmacen}</span>
              <span className="block text-gray-500">{almacen.direccionAlmacen}</span>
            </div>
            <button onClick={() => eliminarAlmacen(almacen.almacenId)} className="text-red-500 hover:text-red-700">Eliminar</button>
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-bold mt-6 mb-2">Registrar Almacén</h3>
      <div className="flex space-x-4">
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del almacén" className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500" />
        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Dirección del almacén" className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500" />
        <button onClick={registrarAlmacen} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">Registrar</button>
      </div>
    </div>
  );
};

export default AlmacenComponent;
