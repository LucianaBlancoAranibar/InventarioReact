import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
const EditProduct = () => {
    const [nombreProducto, setNombreProducto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precioUnitario, setPrecioUnitario] = useState("");
    const [costo, setCosto] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [categorias, setCategorias] = useState([]); // Define el estado paraa las categorías
    const [imagen, setImagen] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const cargarProduct = async () => {
          try {
            const respuesta = await axios.get(`https://localhost:7010/api/Productoes/${id}`);
            // Asegúrate de que los campos en `respuesta.data` coincidan con tu API
            setNombreProducto(respuesta.data.nombreProducto);
            setDescripcion(respuesta.data.descripcion);
            setPrecioUnitario(respuesta.data.precioUnitario);
            setCosto(respuesta.data.costo);
          } catch (error) {
            console.error("Error al cargar el almacén:", error);
          }
        };
    
        if (id) {
          cargarProduct();
        }
      }, [id]);
     
    useEffect(() => {
      // Cargar las categorías al montar el componente
      const obtenerCategorias = async () => {
        try {
          const respuesta = await axios.get("https://localhost:7010/api/Categoriums");
          setCategorias(respuesta.data); // Guarda las categorías obtenidas en el estado
        } catch (error) {
          console.error("Error al obtener categorías:", error);
        }
      };
  
      obtenerCategorias();
    }, []);
  
    const editarProduct = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("NombreProducto", nombreProducto);
      formData.append("Descripcion", descripcion);
      formData.append("PrecioUnitario", precioUnitario);
      formData.append("Costo", costo);
      formData.append("CategoriaId", categoriaId);
      if (imagen) {
        formData.append("Imagen", imagen);
      }
  
      try {
        const respuesta = await axios.put(`https://localhost:7010/api/Productoes/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        console.log("Producto registrado:", respuesta.data);
        setNombreProducto("");
        setDescripcion("");
        setPrecioUnitario("");
        setCosto("");
        setCategoriaId("");
      } catch (error) {
        console.error("Error al editar producto:", error);
      }
    };
  

  return (
    <section className="container mx-auto mt-8">
      <div className="mx-auto max-w-2xl lg:py-16">
        <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>
        <form onSubmit={editarProduct}>
          <div className="mb-6">
            <label htmlFor="nombreProducto" className="block mb-2 text-sm font-medium text-gray-900">Nombre del Producto</label>
            <input
              type="text"
              id="nombreProducto"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900">Descripción</label>
            <input
              type="text"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="precioUnitario" className="block mb-2 text-sm font-medium text-gray-900">Precio Unitario</label>
            <input
              type="number"
              id="precioUnitario"
              value={precioUnitario}
              onChange={(e) => setPrecioUnitario(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="costo" className="block mb-2 text-sm font-medium text-gray-900">Costo</label>
            <input
              type="number"
              id="costo"
              value={costo}
              onChange={(e) => setCosto(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="categoriaId" className="block mb-2 text-sm font-medium text-gray-900">Categoría</label>
            <select
              id="categoriaId"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.categoriaId} value={categoria.categoriaId}>
                  {categoria.nombreCategoria}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="imagen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen del Producto</label>
            <input
              type="file"
              id="imagen"
              onChange={(e) => setImagen(e.target.files[0])}
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Registrar 
          </button>
        </form>
      </div>
    </section>

  );
};

export default EditProduct;
