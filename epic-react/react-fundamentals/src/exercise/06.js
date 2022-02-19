// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  // normal exercise
  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const value = e.target.elements[0].value
  //   console.log('value: ', value)
  //   onSubmitUsername(value)
  // }

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <div>
  //       <label htmlFor="my-input-text">Username:</label>
  //       <input id="my-input-text" type="text" />
  //     </div>
  //     <button type="submit">Submit</button>
  //   </form>
  // )

  // extra credit 1: useRef
  // const usernameInputRef = React.useRef()
  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const value = usernameInputRef.current.value
  //   console.log('value: ', value)
  //   onSubmitUsername(value)
  // }

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <div>
  //       <label htmlFor="my-input-text">Username:</label>
  //       <input ref={usernameInputRef} id="my-input-text" type="text" />
  //     </div>
  //     <button type="submit">Submit</button>
  //   </form>
  // )

  // extra credit 2: validate lower case username
  // const [error, setError] = React.useState(null)
  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const value = e.target.elements[0].value
  //   console.log('value: ', value)
  //   onSubmitUsername(value)
  // }

  // const handleChange = event => {
  //   const value = event.target.value
  //   const isLowerCase = value.toLowerCase() === value
  //   setError(!isLowerCase)
  // }

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <div>
  //       <label htmlFor="my-input-text">Username:</label>
  //       <input id="my-input-text" type="text" onChange={handleChange} />
  //       <div>{error ? 'username should be lowercase' : ''}</div>
  //     </div>
  //     <button type="submit" disabled={error}>
  //       Submit
  //     </button>
  //   </form>
  // )

  // extra credit 3: control the input with React and prevent user from putting uppercase text
  const [value, setValue] = React.useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const value = e.target.elements[0].value
    onSubmitUsername(value)
  }

  const handleChange = event => {
    setValue(event.target.value.toLowerCase())
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="my-input-text">Username:</label>
        <input
          id="my-input-text"
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
