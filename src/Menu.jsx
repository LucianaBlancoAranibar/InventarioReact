export default function Navigation() {
    return (
<nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="https://flowbite.com" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
      
    </div>
    <div class="bg-gray-50 dark:bg-gray-700">
    <div class="max-w-screen-xl px-4 py-3 mx-auto">
        <div class="flex items-center">
            <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                    <a href="/ListaAlmacenesComponent" class="text-gray-900 dark:text-white hover:underline" aria-current="page">Almacenes</a>
                </li>
                <li>
                    <a href="/ListaUbicaciones" class="text-gray-900 dark:text-white hover:underline">Ubicaciones</a>
                </li>
                <li>
                    <a href="/ListCategory" class="text-gray-900 dark:text-white hover:underline">Categoria</a>
                </li>
                <li>
                    <a href="/ListProduct" class="text-gray-900 dark:text-white hover:underline">Product</a>
                </li>
                <li>
                    <a href="/ListInventario" class="text-gray-900 dark:text-white hover:underline">Inventario</a>
                </li>
                <li>
                    <a href="/ListCompra" class="text-gray-900 dark:text-white hover:underline">Compra</a>
                </li>
                <li>
                    <a href="/PedidoList" class="text-gray-900 dark:text-white hover:underline">Pedido</a>
                </li>
                <li>
                    <a href="/ExistenciaReporte" class="text-gray-900 dark:text-white hover:underline">ExistenciaReporte</a>
                </li>
                <li>
                    <a href="/UbicacionReporte" class="text-gray-900 dark:text-white hover:underline">Ubicacion reporte</a>
                </li>
                <li>
                    <a href="/MovimientoReporte" class="text-gray-900 dark:text-white hover:underline">MovimientoReporte</a>
                </li>
            </ul>
        </div>
    </div>
    </div>
</nav>

);
}
