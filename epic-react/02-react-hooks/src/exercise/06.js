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
  // const [status, setStatus] = useState('idle')
  // const [pokemon, setPokemon] = useState(null)
  // const [error, setError] = useState(null)

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
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  } else if (status === 'resolved') {
    // succesful request
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error(
    'This status state should be impossible because no other status was defined',
  )
}

export default App
