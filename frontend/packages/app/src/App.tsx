import React, {useState } from 'react'
import { DataGrid } from './components/DataGrid';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cola Grid Demo</h1>
      <DataGrid />
    </div>
  )
}

export default App
