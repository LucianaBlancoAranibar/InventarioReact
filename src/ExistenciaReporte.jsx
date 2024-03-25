import React, { useState, useEffect } from "react";
import axios from "axios";
const SidebarFilter = ({ title, items, onFilterChange, nameField }) => (
  <div className="shadow rounded bg-white p-4 mb-4">
    <h4 className="font-semibold mb-2">{title}</h4>
    <ul className="list-none p-0">
      {items.map((item) => (
        <li key={item[nameField]} className="mb-1">
          <label className="flex items-center text-sm cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600 mr-2"
              checked={item.selected}
              onChange={() => onFilterChange(item[nameField])}
            />
            <span>{item[nameField]}</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

// Un componente separado para los filtros podría ser útil para mejorar la legibilidad.
const CheckboxFilter = ({ name, label, checked, onChange }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={name}
      name={name}
      checked={checked}
      onChange={onChange}
      className="form-checkbox h-4 w-4 text-blue-600 mr-2"
    />
    <label htmlFor={name} className="text-sm font-medium text-gray-900">
      {label}
    </label>
  </div>
);

const InventarioReporte = () => {
  const [reporteInventario, setReporteInventario] = useState([]);
  const [filtros, setFiltros] = useState({
    categoria: true,
    entrante: true,
    saliente: true,
    disponible: true,
    // libreUsar: true,
  });

  const [almacenes, setAlmacenes] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const cargarDatosIniciales = async () => {
    const [inventarioData, almacenesData, categoriasData] = await Promise.all([
      cargarReporteInventario(),
      cargarAlmacenes(),
      cargarCategorias(),
    ]);
    setReporteInventario(inventarioData);
    setAlmacenes(almacenesData);
    setCategorias(categoriasData);
  };
  useEffect(() => {
    const obtenerReporteInventario = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7010/reporte-inventario"
        );
        setReporteInventario(response.data);
      } catch (error) {
        console.error("Error al obtener el reporte de inventario:", error);
      }
    };

    obtenerReporteInventario();
  }, []);

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFiltros({ ...filtros, [name]: checked });
  };

  // Puede mejorar aún más utilizando una función de renderizado condicional.
  const filterLabels = {
    categoria: "Categoría",
    entrante: "Entrante",
    saliente: "Saliente",
    disponible: "Disponible",
    // libreUsar: "Libre de Usar",
    // Agrega más filtros según necesites
  };
  useEffect(() => {
    // Funciones para cargar datos de la API
    const cargarAlmacenes = async () => {
      try {
        const respuesta = await axios.get(
          "https://localhost:7010/api/Almacens"
        );
        setAlmacenes(respuesta.data);
      } catch (error) {
        console.error("Error al obtener almacenes:", error);
      }
    };

    const cargarCategorias = async () => {
      try {
        const respuesta = await axios.get(
          "https://localhost:7010/api/Categoriums"
        );
        setCategorias(respuesta.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    // Llamada a las funciones para cargar datos
    cargarAlmacenes();
    cargarCategorias();
  }, []);

  const cargarReporteInventario = async () => {
    const response = await axios.get(
      "https://localhost:7010/reporte-inventario"
    );
    return response.data;
  };

  const cargarAlmacenes = async () => {
    const respuesta = await axios.get("https://localhost:7010/api/Almacens");
    return respuesta.data.map((almacen) => ({ ...almacen, selected: false }));
  };

  const cargarCategorias = async () => {
    const respuesta = await axios.get("https://localhost:7010/api/Categoriums");
    return respuesta.data.map((categoria) => ({
      ...categoria,
      selected: false,
    }));
  };

  const handleAlmacenFilterChange = (nombreAlmacen) => {
    setAlmacenes(
      almacenes.map((almacen) =>
        almacen.nombreAlmacen === nombreAlmacen
          ? { ...almacen, selected: !almacen.selected }
          : almacen
      )
    );
  };

  const handleCategoriaFilterChange = (nombreCategoria) => {
    setCategorias(
      categorias.map((categoria) =>
        categoria.nombreCategoria === nombreCategoria
          ? { ...categoria, selected: !categoria.selected }
          : categoria
      )
    );
  };

  const reporteFiltrado = reporteInventario.filter((item) => {
    const almacenSeleccionado = almacenes.find(
      (almacen) => almacen.selected && almacen.nombreAlmacen === item.almacen
    );
    const categoriaSeleccionada = categorias.find(
      (categoria) =>
        categoria.selected && categoria.nombreCategoria === item.categoria
    );
    return (
      (!almacenes.some((alm) => alm.selected) || almacenSeleccionado) &&
      (!categorias.some((cat) => cat.selected) || categoriaSeleccionada)
    );
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-5">
        Reporte de Inventario
      </h1>
      <div className="flex gap-4">
        <aside className="w-64" aria-label="Sidebar">
          <SidebarFilter
            title="ALMACENES"
            items={almacenes}
            onFilterChange={handleAlmacenFilterChange}
            nameField="nombreAlmacen"
          />
          <SidebarFilter
            title="CATEGORÍAS"
            items={categorias}
            onFilterChange={handleCategoriaFilterChange}
            nameField="nombreCategoria"
          />
        </aside>
        <div className="flex-grow">
          <div className="flex justify-end mb-4 gap-4">
            {Object.keys(filtros).map((key) => (
              <CheckboxFilter
                key={key}
                name={key}
                label={filterLabels[key]}
                checked={filtros[key]}
                onChange={handleFilterChange}
              />
            ))}
          </div>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Producto
                  </th>
                  {Object.keys(filtros).map(
                    (key) =>
                      filtros[key] && (
                        <th key={key} scope="col" className="px-6 py-3">
                          {filterLabels[key]}
                        </th>
                      )
                  )}
                </tr>
              </thead>
              <tbody>
                {reporteFiltrado.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {item.producto}
                    </td>
                    {filtros.categoria && (
                      <td className="px-6 py-4">{item.categoria}</td>
                    )}
                    {filtros.entrante && (
                      <td className="px-6 py-4">{item.entrante}</td>
                    )}
                    {filtros.saliente && (
                      <td className="px-6 py-4">{item.saliente}</td>
                    )}
                    {filtros.libreUsar && (
                      <td className="px-6 py-4">{item.disponible}</td>
                    )}
                    {filtros.disponible && (
                      <td className="px-6 py-4">{item.disponible}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventarioReporte;
