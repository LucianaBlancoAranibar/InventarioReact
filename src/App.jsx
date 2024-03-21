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


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/AlmacensComponent" element={<AlmacensComponent />} />
        <Route path="/ListaAlmacenesComponent" element={<ListaAlmacenesComponent />} />
        <Route path="/AlmacenEdit/:id" element={<AlmacenEdit />} />
        <Route path="/ListaUbicaciones" element={<ListaUbicaciones />} />
        <Route path="/UbicacionEdit/:id" element={<UbicacionEdit />} />
        <Route path="/FormUbicacion" element={<FormUbicacion />} />
        <Route path="/ListCategory" element={<ListCategory />} />
        <Route path="/FormCategory" element={<FormCategory />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
