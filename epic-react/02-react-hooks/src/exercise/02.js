// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// extra credit 1: in this example you don't need to read on every render the local storage
//  only the first time but for the other cases what matters is that writing more than reading local storage
//  defining a function every render it's cheaper than reading local storage on every render

// function Greeting({initialName = ''}) {
//   console.log('this prints every time the component renders')

//   // extra credit 1: lazy state initializate
//   function getInitialNameValue() {
//     console.log(
//       'this prints every time we set the initial value and read local storage',
//     )
//     return window.localStorage.getItem('name') || initialName
//   }

//   const [name, setName] = React.useState(getInitialNameValue)

//   React.useEffect(() => {
//     window.localStorage.setItem('name', name)
//   }, [name])
//   // extra credit 2: use the dependency array to run the effect only when name state changes

//   function handleChange(event) {
//     setName(event.target.value)
//   }

//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// extra credit 3: create a custom hook to handle local storage
// it has to be general to be reusable
// because it uses the local storage it needs a key parameter
// function useLocalStorageState(key, defaultValue) {
//   const [state, setState] = React.useState(
//     window.localStorage.getItem(key) || defaultValue,
//   )

//   React.useEffect(() => {
//     window.localStorage.setItem(key, state)
//   }, [key, state])

//   return [state, setState]
// }

// function Greeting({initialName = ''}) {
//   const [name, setName] = useLocalStorageState('name', initialName)

//   function handleChange(event) {
//     setName(event.target.value)
//   }

//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// extra credit 4: create a more flexible custom hook to handle local storage (handle any js data type)
function useLocalStorageState(
  key,
  defaultValue,
  {serializer = JSON.stringify, deserializer = JSON.parse} = {},
) {
  // because useEffect does shallow comparison (equivalent to ===)
  // object data types should go through a JSON.stringify and JSON.parse

  const [state, setState] = React.useState(() => {
    const localStorageValue = window.localStorage.getItem(key)
    if (localStorageValue) {
      return deserializer(localStorageValue)
    }

    return defaultValue
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, serializer(state))
  }, [key, serializer, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

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
