export default function Navigation() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="https://flowbite.com" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="text-xl font-semibold dark:text-white">
            Flowbite
          </span>
        </a>
        <div className="hidden md:flex space-x-10">
          {/* Mejorando la estética de los botones y menús desplegables */}
          <div className="group inline-block relative">
            <button className="outline-none focus:outline-none px-3 py-1 bg-gray-50 dark:bg-gray-700 rounded-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
              <span className="pr-1 font-semibold flex-1 text-gray-900 dark:text-white">
                Gestión de Inventario
              </span>
              <span>
                <svg
                  className="fill-current h-4 w-4 transform group-hover:-rotate-180
                                transition duration-200 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l-2-2h4l-2 2zm-7-2l9 9 9-9H2z" />
                </svg>
              </span>
            </button>
            <ul
              className="bg-white border rounded-md transform scale-0 group-hover:scale-100 absolute 
                        transition duration-200 ease-in-out origin-top min-w-32 shadow-lg"
            >
              <li className="rounded-md px-3 py-1 hover:bg-gray-100">
                <a href="/ListaAlmacenesComponent">Almacenes</a>
              </li>
             
              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                <a href="/ListaUbicaciones">Ubicaciones</a>
              </li>
              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                <a href="/ListCategory">Categoría</a>
              </li>
              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                <a href="/ListProduct">Producto</a>
              </li>
              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                <a href="/ListInventario">Inventario</a>
              </li>

            </ul>
          </div>
          {/* Grupo de Operaciones */}
          <div className="group inline-block">
            <button className="outline-none focus:outline-none px-3 py-1 bg-gray-50 dark:bg-gray-700 rounded-sm flex items-center">
              <span className="pr-1 font-semibold flex-1 text-gray-900 dark:text-white">
                Operaciones
              </span>
              <span>
                <svg
                  className="fill-current h-4 w-4 transform group-hover:-rotate-180
                                transition duration-150 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l-2-2h4l-2 2zm-7-2l9 9 9-9H2z" />
                </svg>
              </span>
            </button>
            <ul
              className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
                        transition duration-150 ease-in-out origin-top min-w-32"
            >
              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                <a href="/ListCompra">Compra</a>
              </li>
              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                <a href="/PedidoList">Pedido</a>
              </li>
            </ul>
          </div>
          {/* Grupo de Reportes */}
          <div className="group inline-block">
            <button className="outline-none focus:outline-none px-3 py-1 bg-gray-50 dark:bg-gray-700 rounded-sm flex items-center">
              <span className="pr-1 font-semibold flex-1 text-gray-900 dark:text-white">
                Reportes
              </span>
              <span>
                <svg
                  className="fill-current h-4 w-4 transform group-hover:-rotate-180
                             transition duration-150 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l-2-2h4l-2 2zm-7-2l9 9 9-9H2z" />
                </svg>
              </span>
            </button>
            <ul
              className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
                     transition duration-150 ease-in-out origin-top min-w-32"
            >
              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                <a href="/ExistenciaReporte">Existencia Reporte</a>
              </li>
              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                <a href="/UbicacionReporte">Ubicación Reporte</a>
              </li>
              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                <a href="/MovimientoReporte">Movimiento Reporte</a>
              </li>
              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                <a href="/ReportePedidos">Reporte Pedidos</a>
              </li>
              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                <a href="/ReporteProductoPedido">Producto Más Pedido</a>
              </li>
              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                <a href="/ReporteVentasCategoria">Ventas por Categoría</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </nav>
  );
}
