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
            Tu solución todo en uno para gestionar el inventario.
          </p>
        </div>
      </header>

      {/* Sección de características */}
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-2">Registro de Compras a Proveedores</h2>
              <p className="text-gray-700">
              Gestión de Compras Eficiente: Esta característica central permite a los usuarios registrar y gestionar las compras realizadas a proveedores de manera eficaz. Incluye la capacidad de crear nuevas órdenes de compra, especificando detalles como los productos adquiridos, cantidades, precios, y el proveedor específico. 
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-2">Gestión de Pedidos</h2>
              <p className="text-gray-700">
              El usuario pueden visualizar los pedidos en tiempo real, actualizar el estado de los pedidos (como pendiente, en preparación, enviado), y comunicarse con los clientes para informarles sobre el estado de sus compras. Esta característica busca optimizar el proceso de cumplimiento de pedidos, mejorando la experiencia del cliente y la eficiencia operativa.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-2">Control de Inventario Relacionado con Compras y Pedidos</h2>
              <p className="text-gray-700">
              Sincronización de Inventario con Actividades de Compra y Pedido: Este aspecto del sistema asegura que el inventario se actualice automáticamente basado en las compras a proveedores y los pedidos realizados por los clientes. Cada compra registrada incrementa el inventario disponible, mientras que cada pedido realizado lo reduce.
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
           A TRABAJAR
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
