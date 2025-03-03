import React, {useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cola Grid</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button>
    </div>
  )
}

export default App
