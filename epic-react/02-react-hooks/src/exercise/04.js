// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

import {useLocalStorageState} from '../utils'

const initialSquares = Array(9).fill(null)

function App() {
  return <Game />
}

function Game() {
  const [currentStep, setCurrentStep] = useLocalStorageState(
    'tic-tac-toe:current-step',
    [initialSquares],
  )
  const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [
    initialSquares,
  ]) // will have all steps with squares values

  const currentSquares = history[currentStep]

  const nextValue = calculateNextValue(currentSquares) // returns 'X' or 'O'
  const winner = calculateWinner(currentSquares) // returns 'X', 'O', or null
  const status = calculateStatus(winner, currentSquares, nextValue) // returns `Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`

  // squareIndex goes from 0 to 8. center square is index 4
  function selectSquare(squareIndex) {
    // return early if square already clicked
    if (
      currentSquares[squareIndex] === 'X' ||
      currentSquares[squareIndex] === 'O'
    )
      return

    // return early if there is already a winner
    if (winner) return

    // never mutate/directly change state in React - no assignation for state
    // use instead the setter functions else you will have hard bugs to track
    // better to copy state when it is array, object, etc before changing it
    const newHistory = history.slice(0, currentStep + 1) // new copied value from state to avoid mutating it

    const squaresCopy = [...currentSquares]
    squaresCopy[squareIndex] = nextValue

    setHistory([...newHistory, squaresCopy])
    setCurrentStep(newHistory.length)
  }

  function restart() {
    setHistory([initialSquares])
    setCurrentStep(0)
  }

  const moves = history.map((stepSquares, step) => {
    const desc = step === 0 ? 'Go to game start' : `Go to move #${step}`

    const isCurrentStep = step === currentStep

    return (
      <li key={step}>
        <button disabled={isCurrentStep} onClick={() => setCurrentStep(step)}>
          {desc} {isCurrentStep ? '(current)' : ''}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function Board({onClick, squares}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
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
