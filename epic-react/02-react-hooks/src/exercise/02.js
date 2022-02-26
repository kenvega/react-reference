// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// extra credit 1: in this example you don't need to read on every render the local storage
//  only the first time but for the other cases what matters is that writing more than reading local storage
//  defining a function every render it's cheaper than reading local storage on every render

function Greeting({initialName = ''}) {
  console.log('this prints every time the component renders')

  // extra credit 1: lazy state initializate
  function getInitialNameValue() {
    console.log(
      'this prints every time we set the initial value and read local storage',
    )
    return window.localStorage.getItem('name') || initialName
  }

  const [name, setName] = React.useState(getInitialNameValue)

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
