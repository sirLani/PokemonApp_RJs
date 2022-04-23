/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import * as React from "react";
import Tooltip from "@reach/tooltip";
import { FaSearch, FaTimes } from "react-icons/fa";
import * as colors from "styles/colors";

import { Spinner, PokemonList } from "../components/lib/lib";
import { Pokemon } from "components/pokemonItem/pokemon";

function FavouriteScreen() {
  const [allPokemons, setAllPokemons] = React.useState([]);

  const [fetchLoading, setfetchLoading] = React.useState(true);

  React.useEffect(() => {
    const list = [];
    Object.keys(localStorage).map((k) => {
      console.log(k);
      const pokiList = localStorage.getItem(k);
      list.push(JSON.parse(pokiList));
      setfetchLoading(false);
      setAllPokemons(list);
    });

    console.log(list);
  }, []);

  return (
    <div>
      <div></div>
      <div>
        {fetchLoading ? (
          <div css={{ width: "100%", margin: "0,auto" }}>
            <Spinner />
          </div>
        ) : (
          <PokemonList css={{ marginTop: 20 }}>
            {allPokemons.map((pokemon, id) => (
              <Pokemon key={pokemon.name} pokemon={pokemon} />
            ))}
          </PokemonList>
        )}
      </div>
    </div>
  );
}

export { FavouriteScreen };
