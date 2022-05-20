// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useState, useEffect} from 'react'
import {ErrorBoundary} from 'react-error-boundary' // to avoid having to write the class based component
import {
  fetchPokemon, // the function we call to get the pokemon info
  PokemonInfoFallback, // the thing we show while we're loading the pokemon info
  PokemonDataView, // the stuff we use to display the pokemon info
  PokemonForm,
} from '../pokemon'

// it's prefered to unmonunt and remount when recovering from an error
// but if we are just changing the props then is not necessary to remount the errorboundary and the components inside

function App() {
  const [pokemonName, setPokemonName] = useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* you can reset the error state in ErrorBoundary adding a key prop to the component */}
        {/* this unmounts and re-mounts the component that's why the error state is reset */}
        {/* but the key prop remounts the components inside too. So it's better handled with the onReset prop */}
        {/* react-error-boundary also has resetKeys to reset its state when keys changes ONLY IF there is an error*/}
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          {/* when there is an error in PokemonInfo it will search for the nearest ErrorBoundary */}
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div>
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Reset to normal</button>
    </div>
  )
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = useState({
    status: pokemonName ? 'pending' : 'idle',
    pokemon: null,
    error: null,
  })

  const {status, pokemon, error} = state
  console.log('state: ', state)

  useEffect(() => {
    if (!pokemonName) return

    setState({status: 'pending'})

    fetchPokemon(pokemonName)
      .then(pokemonData => {
        // setting a state avoids making sure and order for setState call functions is made
        // thus you are less prone to errors on that part
        setState({pokemon: pokemonData, status: 'resolved'})
      })
      .catch(error => {
        setState({error: error, status: 'rejected'})
      })
  }, [pokemonName])

  // render different UI based on the status
  // makes code more clear and avoid bugs
  if (status === 'idle') {
    // start
    return <div>Submit a pokemon</div>
  } else if (status === 'pending') {
    // loading
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    // error on request
    // will be handled by the error boundary
    throw error
  } else if (status === 'resolved') {
    // succesful request
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error(
    'This status state should be impossible because no other status was defined',
  )
}

export default App
