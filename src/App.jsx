import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import { AuthProvider, useAuth } from "./Usuario/UseAuth";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AlmacensComponent from "./AlmacenComponent";
import Navigation from "./Menu";
import ListaAlmacenesComponent from "./ListaAlmacenesComponent";
import AlmacenEdit from "./AlmacenEdit";
import ProveedorCreate from "./Proveedor/ProveedorCreate";
import ProveedorList from "./Proveedor/ProveedorList";
import ProveedorEdit from "./Proveedor/ProveedorEdit";
import Login from "./Usuario/Login";
import UsuarioCreate from "./Usuario/UsuarioCreate";
import UsuarioList from "./Usuario/UsuarioList";
import Home from "./Home/Home";

function App() {
  const [count, setCount] = useState(0);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <RoutesConfig />
      </BrowserRouter>
    </AuthProvider>
  );
}

function RoutesConfig() {
  const auth = useAuth(); 

  if (auth.loading) {
    return <div>Loading...</div>; 
  }
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={<Home />} />
  
      {/* Rutas protegidas */}
      <Route
        path="/ProveedorList"
        element={
          <PrivateRoute roles={['Administrador']}>
            <ProveedorList />
          </PrivateRoute>
        }
      />
      <Route
        path="/ProveedorEdit/:id"
        element={
          <PrivateRoute roles={['Administrador']}>
            <ProveedorEdit />
          </PrivateRoute>
        }
      />
      <Route
        path="/AlmacensComponent"
        element={
          <PrivateRoute roles={['Administrador']}>
            <AlmacensComponent />
          </PrivateRoute>
        }
      />
      <Route
        path="/ListaAlmacenesComponent"
        element={
          <PrivateRoute roles={['Administrador']}>
            <ListaAlmacenesComponent />
          </PrivateRoute>
        }
      />
      <Route
        path="/AlmacenEdit/:id"
        element={
          <PrivateRoute roles={['Administrador']}>
            <AlmacenEdit />
          </PrivateRoute>
        }
      />
      <Route
        path="/ProveedorCreate"
        element={
          <PrivateRoute roles={['Administrador']}>
            <ProveedorCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="/ProveedorList"
        element={
          <PrivateRoute roles={['Administrador']}>
            <ProveedorList  />
          </PrivateRoute>
        }
      />
      <Route
        path="/ProveedorEdit/:id"
        element={
          <PrivateRoute roles={['Administrador']}>
            <ProveedorEdit />
          </PrivateRoute>
        }
      />
      <Route
        path="/UsuarioCreate"
        element={
          <PrivateRoute roles={['Administrador']}>
            <UsuarioCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="/UsuarioList"
        element={
          <PrivateRoute roles={['Administrador']}>
            <UsuarioList />
          </PrivateRoute>
        }
      />
      
      {/* Asegúrate de que esta sea la última ruta en tu lista de <Routes> para que funcione como una ruta de captura todo. */}
      <Route path="*" element={<Navigate to="/Login" replace />} />
    </Routes>
  );
}

export default App;