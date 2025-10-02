import { useState } from 'react'
import Display from './Display'
import Button from './Button'
import './Calculator.css'

const Calculator = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const handleNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const handleOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = performOperation(currentValue, inputValue, operation)

      if (newValue === 'Error') {
        setDisplay('Error')
        setPreviousValue(null)
        setOperation(null)
        setWaitingForOperand(true)
        return
      }

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const performOperation = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        if (secondValue === 0) {
          return 'Error'
        }
        return firstValue / secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = performOperation(previousValue, inputValue, operation)
      
      if (newValue === 'Error') {
        setDisplay('Error')
        setPreviousValue(null)
        setOperation(null)
        setWaitingForOperand(true)
        return
      }

      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const handleBackspace = () => {
    if (display.length > 1 && !waitingForOperand) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  return (
    <div className="calculator">
      <Display value={display} operation={operation} />
      <div className="button-grid">
        <Button text="C" onClick={handleClear} className="btn-clear" />
        <Button text="⌫" onClick={handleBackspace} className="btn-function" />
        <Button text="/" onClick={() => handleOperation('/')} className="btn-operator" />
        <Button text="*" onClick={() => handleOperation('*')} className="btn-operator" />
        
        <Button text="7" onClick={() => handleNumber(7)} />
        <Button text="8" onClick={() => handleNumber(8)} />
        <Button text="9" onClick={() => handleNumber(9)} />
        <Button text="-" onClick={() => handleOperation('-')} className="btn-operator" />
        
        <Button text="4" onClick={() => handleNumber(4)} />
        <Button text="5" onClick={() => handleNumber(5)} />
        <Button text="6" onClick={() => handleNumber(6)} />
        <Button text="+" onClick={() => handleOperation('+')} className="btn-operator" />
        
        <Button text="1" onClick={() => handleNumber(1)} />
        <Button text="2" onClick={() => handleNumber(2)} />
        <Button text="3" onClick={() => handleNumber(3)} />
        <Button text="=" onClick={handleEquals} className="btn-equals" />
        
        <Button text="0" onClick={() => handleNumber(0)} className="btn-zero" />
        <Button text="." onClick={handleDecimal} />
      </div>
    </div>
  )
}

export default Calculator