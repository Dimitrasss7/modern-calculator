import './Display.css'

const Display = ({ value, operation }) => {
  return (
    <div className="display">
      {operation && <div className="operation-indicator">{operation}</div>}
      <div className="display-value">{value}</div>
    </div>
  )
}

export default Display