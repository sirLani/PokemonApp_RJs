/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import * as React from "react";
import { Spinner, PokemonList } from "components/lib/lib";
import { Pokemon } from "components/pokemonItem/pokemon";
import { Favorites } from "utils/pokemons";

function FavouriteScreen() {
  const [allPokemons, setAllPokemons] = React.useState([]);

  const [fetchLoading, setfetchLoading] = React.useState(true);

  React.useEffect(() => {
    setfetchLoading(false);
    const pokiList = Favorites();
    setAllPokemons(pokiList);
  }, []);

  return (
    <div>
      <div>
        {fetchLoading ? (
          <div css={{ width: "100%", margin: "0,auto" }}>
            <Spinner />
          </div>
        ) : allPokemons?.length > 0 ? (
          <PokemonList css={{ marginTop: 20 }}>
            {allPokemons.map((pokemon, id) => (
              <Pokemon key={pokemon.name} pokemon={pokemon} />
            ))}
          </PokemonList>
        ) : (
          <div css={{ marginTop: 20, fontSize: "1.2em", textAlign: "center" }}>
            <p>
              Hmmm... I couldn't find any favorite pokemon Please try to pick a
              favorite.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export { FavouriteScreen };
