import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import {MainComponent} from './components/MainComponent'

function App() {
  const [count, setCount] = useState(0)

  return(
    <MainComponent param1 = {["Robotyka", "Szachy", "Teatr", "Fotografia"]}/>
  )
}

export default App
