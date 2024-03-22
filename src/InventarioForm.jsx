import React, { useState, useEffect } from "react";
import axios from "axios";

const FormInventario = () => {
  const [productos, setProductos] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [nuevoInventario, setNuevoInventario] = useState({
    productoId: "",
    ubicacionId: "",
    cantidad: "",
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const respuestaProductos = await axios.get("https://localhost:7010/api/Productoes");
        const respuestaUbicaciones = await axios.get("https://localhost:7010/api/Ubicacions");
        setProductos(respuestaProductos.data);
        setUbicaciones(respuestaUbicaciones.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    cargarDatos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoInventario(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productoSeleccionado = productos.find(p => p.productoId.toString() === nuevoInventario.productoId);
    const ubicacionSeleccionada = ubicaciones.find(u => u.ubicacionId.toString() === nuevoInventario.ubicacionId);
  
    if (!productoSeleccionado || !ubicacionSeleccionada) {
      console.error("Producto o ubicación seleccionada no válida");
      return; // Termina la ejecución si no se encuentran
    }
  
    try {
      const inventarioParaEnviar = {
        cantidad: parseInt(nuevoInventario.cantidad, 10),
        productoId: nuevoInventario.productoId,
        ubicacionId: nuevoInventario.ubicacionId,
        NombreProducto: productoSeleccionado.nombreProducto,
        NombreUbicacion: ubicacionSeleccionada.nombreUbicacion,
      };
  
      const respuesta = await axios.post("https://localhost:7010/api/Inventarios", inventarioParaEnviar);
      console.log("Inventario creado:", respuesta.data);
      // Resto del código...
    } catch (error) {
      console.error("Error al crear el inventario:", error);
    }
  };
  

  return (
    <section className="container mx-auto mt-8">
      <div className="mx-auto max-w-2xl lg:py-16">
        <h2 className="text-2xl font-semibold mb-4">Registrar Inventario</h2>
        <form onSubmit={handleSubmit}>
          <select
            name="productoId"
            value={nuevoInventario.productoId}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione un producto</option>
            {productos.map((producto) => (
              <option key={producto.productoId} value={producto.productoId}>
                {producto.nombreProducto} {/* Cambiado para mostrar el nombre del producto */}
              </option>
            ))}
          </select>

          <select
            name="ubicacionId"
            value={nuevoInventario.ubicacionId}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione una ubicación</option>
            {ubicaciones.map((ubicacion) => (
              <option key={ubicacion.ubicacionId} value={ubicacion.ubicacionId}>
                {ubicacion.nombreUbicacion}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={nuevoInventario.cantidad}
            onChange={handleInputChange}
            required
          />

          <button type="submit">Registrar Inventario</button>
        </form>
      </div>
    </section>
  );
};

export default FormInventario;
