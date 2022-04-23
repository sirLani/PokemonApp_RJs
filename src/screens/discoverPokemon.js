/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import * as React from "react";
import Tooltip from "@reach/tooltip";
import { FaSearch, FaTimes } from "react-icons/fa";
import * as colors from "styles/colors";

import { Spinner, PokemonList, Button, splitUrl } from "../components/lib/lib";
import { usePokemonSearch } from "utils/pokemons";
import { Pokemon } from "components/pokemonItem/pokemon";

import { useNavigate } from "react-router-dom";
import { Search } from "components/search/search";

function DiscoverPokemonScreen() {
  const [query] = React.useState("");
  const [allPokemons, setAllPokemons] = React.useState([]);
  const { pokemons, error, isError } = usePokemonSearch(query);

  const [fetchLoading, setfetchLoading] = React.useState();
  const navigate = useNavigate();

  const fetchPokemons = (pokemonList) => {
    setfetchLoading(true);
    const list = [];
    pokemonList.map(async (pokemon) => {
      await fetch(pokemon.url).then((result) => {
        result.json().then((res) => {
          list.push(res);
          setfetchLoading(false);
        });
      });
    });
    return list;
  };

  const next = async (link) => {
    const lastSegment = await splitUrl(link, "/");
    navigate(`/next/${1}`, { state: lastSegment });
  };

  React.useEffect(() => {
    if (pokemons?.results) {
      const pokemonList = pokemons.results;
      const pokiList = fetchPokemons(pokemonList);
      setAllPokemons(pokiList);
    } else if (pokemons?.name) {
      const list = [];
      list.push(pokemons);
      setAllPokemons(list);
    }
  }, [pokemons]);

  return (
    <div>
      {isError ? (
        <div css={{ color: colors.danger }}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}
      <div>
        <Search setAllPokemons={setAllPokemons} />
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

        <div className="more-button">
          {pokemons?.previous != null ? (
            <Button onClick={() => {}}>prev</Button>
          ) : (
            <></>
          )}
          {pokemons?.next != null ? (
            <Button onClick={() => next(pokemons.next)}>next</Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export { DiscoverPokemonScreen };
