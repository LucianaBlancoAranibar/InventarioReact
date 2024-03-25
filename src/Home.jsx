export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
     

      {/* Sección de bienvenida */}
      <header className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Bienvenido a InnovElectronics
          </h1>
          <p className="text-center text-gray-600 mt-4">
            Tu solución todo en uno para gestionar [actividad principal de la
            app].
          </p>
        </div>
      </header>

      {/* Sección de características */}
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-2">Característica 1</h2>
              <p className="text-gray-700">
                Descripción breve de lo que hace esta característica.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-2">Característica 2</h2>
              <p className="text-gray-700">
                Descripción breve de lo que hace esta característica.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-2">Característica 3</h2>
              <p className="text-gray-700">
                Descripción breve de lo que hace esta característica.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Llamada a la acción */}
      <div className="bg-blue-500">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-white text-center">
            ¿Listo para comenzar?
          </h2>
          <p className="text-white text-center mt-4">
           +A TRABAJAR
          </p>
          
        </div>
      </div>

      {/* Pie de página */}
      <footer className="bg-white shadow mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            © 2024 NombreApp. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
