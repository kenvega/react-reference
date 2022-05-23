// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

// The 1st argument is called "state" - the current value of count
// The 2nd argument is called "newState" - the value passed to setCount - also called action

// exercise:
// const countReducer = (state, newState) => {
//   return state + newState
// }

// extra credit 2: With action as an object
// const countReducer = (state, newState) => ({...state, ...newState})

// extra credit 3: Supporting action as an object or a function
// const countReducer = (state, action) => ({
//   ...state,
//   ...(typeof action === 'function' ? action(state) : action),
// })

// extra credit 4: with action as conventional redux format
const countReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {count: state.count + action.step}
    default:
      throw new Error(`Unsupported action type: ${action.type}`)
  }
}

function Counter({initialCount = 0, step = 1}) {
  // exercise: using useReducer instead of useState
  // const [count, setCount] = React.useReducer(countReducer, initialCount)
  // const increment = () => setCount(count + step)

  // extra credit 1: with another useReducer form - just to show you can pass anything as the action
  // const [count, changeCount] = React.useReducer(countReducer, initialCount)
  // const increment = () => changeCount(step)

  // extra credit 2: with action as an object
  // const [state, setState] = React.useReducer(countReducer, {
  //   count: initialCount,
  // })
  // const {count} = state
  // const increment = () => setState({count: count + step})

  // extra credit 3: with action as a function
  // const [state, setState] = React.useReducer(countReducer, {
  //   count: initialCount,
  // })
  // const {count} = state
  // const increment = () =>
  //   setState(currentState => ({count: currentState.count + step}))

  // extra credit 4: with action as conventional redux format
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  const increment = () => dispatch({type: 'INCREMENT', step})

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
