// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useState, useEffect} from 'react'
import {
  fetchPokemon, // the function we call to get the pokemon info
  PokemonInfoFallback, // the thing we show while we're loading the pokemon info
  PokemonDataView, // the stuff we use to display the pokemon info
  PokemonForm,
} from '../pokemon'

// generic ErrorBoundary component that can render different fallback components
// to show when an error happens making it more flexible to use
class ErrorBoundary extends React.Component {
  state = {error: null}

  static getDerivedStateFromError(error) {
    return {error}
  }
  render() {
    const {error} = this.state
    if (error) {
      return <this.props.FallbackComponent error={error} />
    }
    console.log('ErrorBoundary', this.state.error)
    return this.props.children
  }
}

function App() {
  const [pokemonName, setPokemonName] = useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* you can reset the error state in ErrorBoundary adding a key prop to the component */}
        {/* this unmounts and re-mounts the component that's why the error state is reset */}
        <ErrorBoundary key={pokemonName} FallbackComponent={ErrorFallback}>
          {/* when there is an error in PokemonInfo it will search for the nearest ErrorBoundary */}
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

function ErrorFallback({error}) {
  return (
    <div>
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = useState({
    status: 'idle',
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
