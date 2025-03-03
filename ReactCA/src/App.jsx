import React from 'react'

const App = () => {
  return (
    <div>
      <div className ="container bg-red-500 mx-auto">
        <h1 className="text-8xl text-sky-500">Hello Tailwind and React!</h1>
        <div>
          <h2 className="text-3xl">This is 2xl</h2>
        </div>
        <div>
          <button className="bg-amber-500 px-5 py-2 rounded-2xl hover:bg-amber-800">Click me!</button>
        </div>
      </div>
    </div>
  )
}

export default App