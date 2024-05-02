import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditInventario = () => {
  const [cantidad, setCantidad] = useState('');
  const [nombreProducto, setNombreProducto] = useState('');
  const [nombreUbicacion, setNombreUbicacion] = useState('');
  const { inventarioId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarInventario = async () => {
      try {
        const { data } = await axios.get(`https://localhost:5001/api/Inventarios/${inventarioId}`);
        setCantidad(data.cantidad);
        setNombreProducto(data.nombreProducto );
        setNombreUbicacion(data.nombreUbicacion );
      } catch (error) {
        console.error('Error al cargar el inventario:', error);
      }
    };
  
    cargarInventario();
  }, [inventarioId]);
  

  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Asegúrate de que estás enviando el ID y la Cantidad correctamente
    try {
        const response = await axios.put(`https://localhost:5001/api/Inventarios/${inventarioId}`, {
            inventarioId: parseInt(inventarioId, 10), // Asegúrate de convertir a entero si es necesario
            cantidad: parseInt(cantidad, 10) // Solo necesitas enviar la cantidad
        });

        if (response.status === 204) {
            console.log('Inventario actualizado con éxito');
            navigate('/ListInventario'); // Ajusta esta ruta según sea necesario
        }
    } catch (error) {
        console.error('Error al actualizar el inventario:', error);
    }
};


  return (
    <section>
      <h2>Editar Inventario</h2>
      <form onSubmit={handleSubmit}>
        <div>Producto: {nombreProducto}</div>
        <div>Ubicación: {nombreUbicacion}</div>
        <input
          type="number"
          value={cantidad}
          onChange={handleCantidadChange}
          required
        />
        <button type="submit">Actualizar</button>
      </form>
    </section>
  );
};

export default EditInventario;
