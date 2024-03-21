import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AlmacensComponent from './AlmacenComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Menu'; 
import ListaAlmacenesComponent from './ListaAlmacenesComponent';
import AlmacenEdit from './AlmacenEdit';
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
        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
