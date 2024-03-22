import { useState } from 'react';
import reactLogo from './assets/react.svg'; 
import viteLogo from '/vite.svg'; 
import './App.css';
import AlmacensComponent from './AlmacenComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Menu';
import ListaAlmacenesComponent from './ListaAlmacenesComponent';
import AlmacenEdit from './AlmacenEdit';
import ProveedorCreate from './Proveedor/ProveedorCreate';
import ProveedorList from './Proveedor/ProveedorList';
import ProveedorEdit from './Proveedor/ProveedorEdit'; 

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/AlmacensComponent" element={<AlmacensComponent />} />
          <Route path="/ListaAlmacenesComponent" element={<ListaAlmacenesComponent />} />
          <Route path="/AlmacenEdit/:id" element={<AlmacenEdit />} />
          <Route path="/ProveedorCreate" element={<ProveedorCreate />} />
          <Route path="/ProveedorList" element={<ProveedorList />} />
          <Route path="/ProveedorEdit/:id" element={<ProveedorEdit />} />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
