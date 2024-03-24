import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UsuarioList.css';


const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const { data } = await axios.get('https://localhost:7010/api/Usuarios');
        setUsuarios(data);
      } catch (error) {
        toast.error("Error al obtener los datos de los usuarios.");
      }
    };

    fetchUsuarios();
  }, []);

  const getRol = (rol) => {
    switch (rol) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Vendedor';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="usuario-list-container">
      <h2>Lista de Usuarios</h2>
      <table className="usuario-table">
        <thead>
          <tr>
            <th>Nombre de Usuario</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.usuarioId}>
              <td>{usuario.nombreUsuario}</td>
              <td>{getRol(usuario.rol)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuarioList;
