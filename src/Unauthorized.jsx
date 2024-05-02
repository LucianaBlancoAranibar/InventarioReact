import React from 'react';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-100">
     

      {/* Sección de bienvenida */}
      <header className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Acceso no autorizado
          </h1>
          <p className="text-center text-gray-600 mt-4">
          401 Unauthorized Access
          </p>
        </div>
      </header>

     

      {/* Pie de página */}
      <footer className="bg-white shadow mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            © 2024 InnovElectronics. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
