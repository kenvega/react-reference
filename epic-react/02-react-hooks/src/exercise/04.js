// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

function App() {
  return <Game />
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

const initialSquares = Array(9).fill(null)

function Board() {
  // lazy initialization of state to avoid reading from local storage on every render
  const [squares, setSquares] = React.useState(
    () => JSON.parse(window.localStorage.getItem('squares')) || initialSquares,
  )

  React.useEffect(() => {
    window.localStorage.setItem('squares', JSON.stringify(squares))
  }, [squares])

  const nextValue = calculateNextValue(squares) // returns 'X' or 'O'
  const winner = calculateWinner(squares) // returns 'X', 'O', or null
  const status = calculateStatus(winner, squares, nextValue) // returns `Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`

  // squareIndex goes from 0 to 8. center square is index 4
  function selectSquare(squareIndex) {
    // return early if square already clicked
    if (squares[squareIndex] === 'X' || squares[squareIndex] === 'O') return

    // return early if there is already a winner
    if (winner) return

    // never mutate/directly change state in React - no assignation for state
    // use instead the setter functions else you will have hard bugs to track
    // better to copy state when it is array, object, etc before changing it
    const squaresCopy = [...squares]
    squaresCopy[squareIndex] = nextValue
    setSquares(squaresCopy)
  }

  function restart() {
    setSquares(initialSquares)
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

// --------––-------------
// HELPER FUNCTIONS TO USE
// --------––-------------

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default App
