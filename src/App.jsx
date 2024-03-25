import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AlmacensComponent from './AlmacenComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Menu'; 
import ListaAlmacenesComponent from './ListaAlmacenesComponent';
import AlmacenEdit from './AlmacenEdit';
import ListaUbicaciones from './ListaUbicaciones';
import UbicacionEdit from './UbicacionEdit';
import FormUbicacion from './FormUbicacion';
import ListCategory from './ListCategory';
import FormCategory from './FormCategory';
import ListProduct from './ListProduct';
import ProductForm from './ProductForm';
import ProductEdit from './ProductEdit';
import ListInventario from './ListInventario';
import InventarioForm from './InventarioForm';
import InventarioEdit from './InventarioEdit';
import CompraForm from './CompraForm';
import ListCompra from './ListCompra';
import DetalleCompra from './DetalleCompra';
import PedidoForm from './PedidoForm';
import PedidoList from './PedidoList';
import ExistenciaReporte from './ExistenciaReporte'
import UbicacionReporte from './UbicacionReporte'
import MovimientoReporte from './MovimientoReporte'
import ReportePedidos from './ReportePedidos ';
import ProveedorCreate from "./ProveedorCreate";
import ProveedorList from "./ProveedorList";
import ProveedorEdit from "./ProveedorEdit";
import ReporteProductoPedido from "./ReporteProductoPedido";
import ReporteVentasCategoria from "./ReporteVentasCategoria";
import Home from "./Home"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Navigation />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/AlmacensComponent" element={<AlmacensComponent />} />
        <Route path="/ListaAlmacenesComponent" element={<ListaAlmacenesComponent />} />
        <Route path="/AlmacenEdit/:id" element={<AlmacenEdit />} />
        <Route path="/ListaUbicaciones" element={<ListaUbicaciones />} />
        <Route path="/UbicacionEdit/:id" element={<UbicacionEdit />} />
        <Route path="/FormUbicacion" element={<FormUbicacion />} />
        <Route path="/ListCategory" element={<ListCategory />} />
        <Route path="/FormCategory" element={<FormCategory />} />
        <Route path="/ListProduct" element={<ListProduct />} />
        <Route path="/ProductForm" element={<ProductForm />} />
        <Route path="/ProductEdit/:id" element={<ProductEdit />} />
        <Route path="/ListInventario" element={<ListInventario />} />
        <Route path="/InventarioForm" element={<InventarioForm />} />
        <Route path="/InventarioEdit/:inventarioId" element={<InventarioEdit />} />
        <Route path="/CompraForm" element={<CompraForm />} />
        <Route path="/ListCompra" element={<ListCompra />} />
        <Route path="/DetalleCompra/:compraId" element={<DetalleCompra />} />
        <Route path="/PedidoForm" element={<PedidoForm />} />
        <Route path="/PedidoList" element={<PedidoList />} />
        <Route path="/ProveedorCreate" element={<ProveedorCreate />} />
        <Route path="/ProveedorList" element={<ProveedorList />} />
        <Route path="/ProveedorEdit" element={<ProveedorEdit />} />
        <Route path="/ExistenciaReporte" element={<ExistenciaReporte />} />
        <Route path="/UbicacionReporte" element={<UbicacionReporte />} />
        <Route path="/MovimientoReporte" element={<MovimientoReporte />} />
        <Route path="/ReportePedidos" element={<ReportePedidos />} />
        <Route path="/ReporteProductoPedido" element={<ReporteProductoPedido />} />
        <Route path="/ReporteVentasCategoria" element={<ReporteVentasCategoria />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
