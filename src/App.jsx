import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
import AlmacensComponent from "./AlmacenComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Menu";
import ListaAlmacenesComponent from "./ListaAlmacenesComponent";
import AlmacenEdit from "./AlmacenEdit";
import ListaUbicaciones from "./ListaUbicaciones";
import UbicacionEdit from "./UbicacionEdit";
import FormUbicacion from "./FormUbicacion";
import ListCategory from "./ListCategory";
import FormCategory from "./FormCategory";
import ListProduct from "./ListProduct";
import ProductForm from "./ProductForm";
import ProductEdit from "./ProductEdit";
import ListInventario from "./ListInventario";
import InventarioForm from "./InventarioForm";
import InventarioEdit from "./InventarioEdit";
import CompraForm from "./CompraForm";
import ListCompra from "./ListCompra";
import DetalleCompra from "./DetalleCompra";
import PedidoForm from "./PedidoForm";
import PedidoList from "./PedidoList";
import ExistenciaReporte from "./ExistenciaReporte";
import UbicacionReporte from "./UbicacionReporte";
import MovimientoReporte from "./MovimientoReporte";
import ReportePedidos from "./ReportePedidos ";
import ProveedorCreate from "./ProveedorCreate";
import ProveedorList from "./ProveedorList";
import ProveedorEdit from "./ProveedorEdit";
import ReporteProductoPedido from "./ReporteProductoPedido";
import ReporteVentasCategoria from "./ReporteVentasCategoria";
import Home from "./Home";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";
import LoginContainer from "./LoginContainer";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "./Unauthorized";

function App() {
  const [count, setCount] = useState(0);
  const isAuthenticated = !!localStorage.getItem("userToken");

  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<LoginContainer />} />
          <Route
            path="/Home"
            element={
              <PrivateRoute roles={[1, 2]}>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/AlmacensComponent"
            element={
              <PrivateRoute roles={[1]}>
                <AlmacensComponent />
              </PrivateRoute>
            }
          />
          <Route
            path="/ListaAlmacenesComponent"
            element={
              <PrivateRoute roles={[1]}>
                <ListaAlmacenesComponent />
              </PrivateRoute>
            }
          />
          <Route
            path="/AlmacenEdit/:id"
            element={
              <PrivateRoute roles={[1]}>
                <AlmacenEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/ListaUbicaciones"
            element={
              <PrivateRoute roles={[1]}>
                <ListaUbicaciones />
              </PrivateRoute>
            }
          />
          <Route
            path="/UbicacionEdit/:id"
            element={
              <PrivateRoute roles={[1]}>
                <UbicacionEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/FormUbicacion"
            element={
              <PrivateRoute roles={[1]}>
                <FormUbicacion />
              </PrivateRoute>
            }
          />
          <Route
            path="/ListCategory"
            element={
              <PrivateRoute roles={[1]}>
                <ListCategory />
              </PrivateRoute>
            }
          />
          <Route
            path="/FormCategory"
            element={
              <PrivateRoute roles={[1]}>
                <FormCategory />
              </PrivateRoute>
            }
          />
          <Route
            path="/ListProduct"
            element={
              <PrivateRoute roles={[1]}>
                <ListProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/ProductForm"
            element={
              <PrivateRoute roles={[1]}>
                <ProductForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/ProductEdit/:id"
            element={
              <PrivateRoute roles={[1]}>
                <ProductEdit />
              </PrivateRoute>
            }
            roles={[1]}
          />
          <Route
            path="/ListInventario"
            element={
              <PrivateRoute roles={[1]}>
                <ListInventario />
              </PrivateRoute>
            }
            roles={[1]}
          />
          <Route
            path="/InventarioForm"
            element={
              <PrivateRoute roles={[1]}>
                <InventarioForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/InventarioEdit/:inventarioId"
            element={
              <PrivateRoute roles={[1]}>
                <InventarioEdit />
              </PrivateRoute>
            }
            roles={[1]}
          />
          <Route
            path="/CompraForm"
            element={
              <PrivateRoute roles={[1]}>
                <CompraForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/ListCompra"
            element={
              <PrivateRoute roles={[1]}>
                <ListCompra />
              </PrivateRoute>
            }
          />
          <Route
            path="/DetalleCompra/:compraId"
            element={
              <PrivateRoute roles={[1]}>
                <DetalleCompra />
              </PrivateRoute>
            }
          />
          <Route
            path="/PedidoForm"
            element={
              <PrivateRoute roles={[1,2]}>
                <PedidoForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/PedidoList"
            element={
              <PrivateRoute roles={[1,2]}>
                <PedidoList />
              </PrivateRoute>
            }
          />
          <Route
            path="/ProveedorCreate"
            element={
              <PrivateRoute roles={[1]}>
                <ProveedorCreate />
              </PrivateRoute>
            }
            roles={[1]}
          />
          <Route
            path="/ProveedorList"
            element={
              <PrivateRoute roles={[1]}>
                <ProveedorList />
              </PrivateRoute>
            }
            roles={[1]}
          />
          <Route
            path="/ProveedorEdit"
            element={
              <PrivateRoute roles={[1,2]}>
                <ProveedorEdit />
              </PrivateRoute>
            }
            roles={[1]}
          />
          <Route
            path="/ExistenciaReporte"
            element={
              <PrivateRoute roles={[1]}>
                <ExistenciaReporte />
              </PrivateRoute>
            }
          />
          <Route
            path="/UbicacionReporte"
            element={
              <PrivateRoute roles={[1]}>
                <UbicacionReporte />
              </PrivateRoute>
            }
          />
          <Route
            path="/MovimientoReporte"
            element={
              <PrivateRoute roles={[1]}>
                <MovimientoReporte />
              </PrivateRoute>
            }
          />
          <Route
            path="/ReportePedidos"
            element={
              <PrivateRoute roles={[1]}>
                <ReportePedidos />
              </PrivateRoute>
            }
          />
          <Route
            path="/ReporteProductoPedido"
            element={
              <PrivateRoute roles={[1]}>
                <ReporteProductoPedido />
              </PrivateRoute>
            }
          />
          <Route
            path="/ReporteVentasCategoria"
            element={
              <PrivateRoute roles={[1]}>
                <ReporteVentasCategoria />
              </PrivateRoute>
            }
          />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
