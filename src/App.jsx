import { useState } from 'react'
import Calculator from './components/Calculator'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Modern Calculator</h1>
        <Calculator />
      </div>
    </div>
  )
}

export default App