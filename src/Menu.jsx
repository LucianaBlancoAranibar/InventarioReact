import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a
          href="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            TecnoSend
          </span>
        </a>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Link
                  to="/ListaAlmacenesComponent"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Lista
                </Link>
              </li>
              <li>
                <Link
                  to="/ProveedorList"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Proveedores
                </Link>
              </li>
              <li>
                <Link
                  to="/UsuarioList"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Usuarios
                </Link>
              </li>
              <li>
                <Link
                  to="/company"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Company
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Features
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
