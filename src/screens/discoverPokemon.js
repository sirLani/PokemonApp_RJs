/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import * as React from "react";
import Tooltip from "@reach/tooltip";
import { FaSearch, FaTimes } from "react-icons/fa";
import * as colors from "styles/colors";
import { useQuery } from "react-query";

import { Spinner, Input, PokemonList } from "../components/lib/lib";
import {
  useFetchPokemonSearch,
  usePokemon,
  usePokemonSearch,
} from "utils/pokemons";
import { Pokemon } from "components/pokemonItem/pokemon";
// import { usePokemonSearch } from "utils/pokemons";

function DiscoverPokemonScreen() {
  const [query, setQuery] = React.useState("");
  const [queried, setQueried] = React.useState();
  const [allPokemons, setAllPokemons] = React.useState([]);
  const { pokemons, error, isLoading, isError, isSuccess } =
    usePokemonSearch(query);

  const [shouldQuery, setShouldQuery] = React.useState(false);

  const [isAllPokemonsLoading, setIsAllPokemonsLoading] = React.useState(false);

  const fetchPokemons = (pokemonList) => {
    setIsAllPokemonsLoading(true);
    const list = [];
    pokemonList.map(async (pokemon) => {
      await fetch(pokemon.url).then((result) => {
        result.json().then((res) => {
          list.push(res);
        });
      });
    });
    console.log(list);
    return list;
  };
  // const { data, error, isLoading, isError, isSuccess } = useQuery(
  //   "pokis",
  //   fetchPokemons(allPokemons),
  //   { enabled: shouldQuery }
  // );

  // const {
  //   pokemonList,
  //   error: listError,
  //   isLoading: listLoading,
  //   isError: listIsError,
  //   isSuccess: listIsSuccess,
  // } = useFetchPokemonSearch(allPokemons);

  // const splitUrl = (url) => {
  //   const lastSegment = url.split("pokemon").pop();
  //   return lastSegment;
  // };

  React.useEffect(() => {
    if (pokemons?.results) {
      const pokemonList = pokemons.results;
      const pokiList = fetchPokemons(pokemonList);
      console.log(pokiList);
      setAllPokemons(pokiList);
    }
  }, [pokemons]);

  function handleSearchClick(event) {
    event.preventDefault();
    setQueried(true);
    setQuery(event.target.elements.search.value);
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSearchClick}>
          <Input
            placeholder="Search books..."
            id="search"
            type="search"
            css={{ width: "100%" }}
          />
          <Tooltip label="Search Books">
            <label htmlFor="search">
              <button
                type="submit"
                css={{
                  border: "0",
                  position: "relative",
                  marginLeft: "-35px",
                  background: "transparent",
                }}
              >
                {isLoading ? (
                  <Spinner />
                ) : isError ? (
                  <FaTimes aria-label="error" css={{ color: colors.danger }} />
                ) : (
                  <FaSearch aria-label="search" />
                )}
              </button>
            </label>
          </Tooltip>
        </form>

        {isError ? (
          <div css={{ color: colors.danger }}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null}
      </div>
      <div>
        {queried ? null : (
          <div css={{ marginTop: 20, fontSize: "1.2em", textAlign: "center" }}>
            <p>Welcome to the discover page.</p>
            <p>Here, check out a list of Pokemons...</p>
            {isLoading ? (
              <div css={{ width: "100%", margin: "auto" }}>
                <Spinner />
              </div>
            ) : isSuccess ? (
              <p>Here you go! Find more books with the search bar above.</p>
            ) : isSuccess && !pokemons.results.length ? (
              <p>
                Hmmm... I couldn't find any pokemon to suggest for you. Sorry.
              </p>
            ) : null}
          </div>
        )}
        {allPokemons.length > 0 ? (
          <PokemonList css={{ marginTop: 20 }}>
            {allPokemons.map((pokemon, id) => (
              <Pokemon key={id} pokemon={pokemon} />
            ))}
          </PokemonList>
        ) : queried ? (
          <div css={{ marginTop: 20, fontSize: "1.2em", textAlign: "center" }}>
            {isLoading ? (
              <div css={{ width: "100%", margin: "auto" }}>
                <Spinner />
              </div>
            ) : (
              <p>
                Hmmm... I couldn't find any books with the query "{query}."
                Please try another.
              </p>
            )}
          </div>
        ) : (
          <div css={{ width: "100%", margin: "0,auto" }}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export { DiscoverPokemonScreen };
