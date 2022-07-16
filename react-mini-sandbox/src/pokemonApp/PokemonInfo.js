import React from "react";
import { fetchPokemon } from "./fetchPokemon";

export default function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    fetchPokemon(pokemonName)
      .then((pokemonData) => setPokemon(pokemonData))
      .catch((errorData) => setError(errorData))
      .finally(() => {
        console.log("states");
        console.log("pokemonName: ", pokemonName);
        console.log("error: ", error);
        console.log("pokemon: ", pokemon);
      });
  }, [pokemonName]);

  if (!pokemonName) {
    return "Submit a pokemon";
  }

  if (!error) {
    return "Oh no...";
  }

  if (!pokemon) {
    return "...";
  }

  return <pre>{JSON.stringify(pokemon, null, 2)}</pre>;
}
