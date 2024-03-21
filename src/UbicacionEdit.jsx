import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const UbicacionEdit = () => {
  const [nombreUbicacion, setNombreUbicacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarUbicacion = async () => {
      try {
        const respuesta = await axios.get(`https://localhost:7010/api/Ubicaciones/${id}`);
        setNombreUbicacion(respuesta.data.NombreUbicacion);
        setDescripcion(respuesta.data.Descripcion);
      } catch (error) {
        console.error("Error al cargar la ubicación:", error);
      }
    };

    if (id) {
      cargarUbicacion();
    }
  }, [id]);

  const editarUbicacion = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7010/api/Ubicaciones/${id}`, {
        NombreUbicacion: nombreUbicacion,
        Descripcion: descripcion,
      });
      navigate('/ListaUbicacionesComponent'); // Redirige a la lista de ubicaciones
    } catch (error) {
      console.error("Error al editar la ubicación:", error);
    }
  };

  return (
    <section className="container mx-auto mt-8">
      {/* Formulario similar al de AlmacenEdit */}
    </section>
  );
};

export default UbicacionEdit;
