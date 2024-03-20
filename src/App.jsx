import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AlmacensComponent from './AlmacenComponent';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <AlmacensComponent />
    </>
  )
}

export default App
