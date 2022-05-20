// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import {useState, useEffect} from 'react'
import {
  fetchPokemon, // the function we call to get the pokemon info
  PokemonInfoFallback, // the thing we show while we're loading the pokemon info
  PokemonDataView, // the stuff we use to display the pokemon info
  PokemonForm,
} from '../pokemon'

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
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!pokemonName) return

    setError(null)
    setPokemon(null)
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setPokemon(pokemonData)
      })
      .catch(error => setError(error))
  }, [pokemonName])

  if (error) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }

  if (!pokemonName) {
    return <div>Submit a pokemon</div>
  }

  if (pokemonName && !pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
  }

  return <PokemonDataView pokemon={pokemon} />
}

export default App
