import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProveedorEdit = () => {
    const [nombreProveedor, setNombreProveedor] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [direccionProveedor, setDireccionProveedor] = useState('');
    const { id } = useParams(); // Obtiene el ID desde la URL
    const navigate = useNavigate();
  
    useEffect(() => {
      // Carga los datos del proveedor cuando el componente se monta
      const cargarProveedor = async () => {
        try {
          const resultado = await axios.get(`https://localhost:7010/api/Proveedors/${id}`);
          const proveedor = resultado.data;
          setNombreProveedor(proveedor.nombreProveedor);
          setTelefono(proveedor.telefono);
          setEmail(proveedor.email);
          setDireccionProveedor(proveedor.direccionProveedor);
        } catch (error) {
          console.error('Error al obtener datos del proveedor:', error);
          // Opcionalmente, redirigir a una ruta de error o mostrar un mensaje
        }
      };
  
      cargarProveedor();
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const resultado = await axios.put(`https://localhost:7010/api/Proveedors/${id}`, {
          nombreProveedor,
          telefono,
          email,
          direccionProveedor
        });
        console.log('Proveedor actualizado:', resultado.data);
        navigate('/ProveedorList'); // Redirige al usuario a la lista de proveedores
      } catch (error) {
        console.error('Error al actualizar proveedor:', error);
      }
    };

  // JSX del componente
  return (
    <div className="edit-proveedor-container">
      <h2>Editar Proveedor</h2>
      <form onSubmit={handleSubmit} className="edit-proveedor-form">
        <div className="form-group">
          <label htmlFor="nombreProveedor">Nombre:</label>
          <input
            type="text"
            id="nombreProveedor"
            value={nombreProveedor}
            onChange={(e) => setNombreProveedor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccionProveedor">Dirección:</label>
          <input
            type="text"
            id="direccionProveedor"
            value={direccionProveedor}
            onChange={(e) => setDireccionProveedor(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProveedorEdit;
