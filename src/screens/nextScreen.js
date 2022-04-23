/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import * as React from "react";
import Tooltip from "@reach/tooltip";
import { FaSearch, FaTimes } from "react-icons/fa";
import * as colors from "styles/colors";

import {
  Spinner,
  Input,
  PokemonList,
  Button,
  splitUrl,
} from "../components/lib/lib";
import { useNewPokemonList, usePokemonSearch } from "utils/pokemons";
import { Pokemon } from "components/pokemonItem/pokemon";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Search } from "components/search/search";
// import { usePokemonSearch } from "utils/pokemons";

function NextPokemonScreen() {
  const { id } = useParams();
  console.log(id);

  const location = useLocation();
  console.log(location.state);

  const [allPokemons, setAllPokemons] = React.useState([]);
  const { pokemons, error, isLoading, isError, isSuccess } = usePokemonSearch(
    location.state
  );
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
    navigate(`/next/${parseInt(id) + 1}`, { state: lastSegment });
  };

  const prev = async (link) => {
    const lastSegment = await splitUrl(link, "/");
    navigate(`/next/${parseInt(id) - 1}`, { state: lastSegment });
  };

  React.useEffect(() => {
    if (pokemons?.results) {
      console.log(pokemons);
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
      <div>
        <Search setAllPokemons={setAllPokemons} />
        {isError ? (
          <div css={{ color: colors.danger }}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null}
      </div>
      <div>
        {fetchLoading ? (
          <div css={{ width: "100%", margin: "0,auto" }}>
            <Spinner />
          </div>
        ) : (
          //  : queried ? (
          //   <div css={{ marginTop: 20, fontSize: "1.2em", textAlign: "center" }}>
          //     {isLoading ? (
          //       <div css={{ width: "100%", margin: "auto" }}>
          //         <Spinner />
          //       </div>
          //     ) : (
          //       <p>
          //         Hmmm... I couldn't find any books with the query "{query}."
          //         Please try another.
          //       </p>
          //     )}
          //   </div>
          // )
          <PokemonList css={{ marginTop: 20 }}>
            {allPokemons.map((pokemon, id) => (
              <Pokemon key={pokemon.name} pokemon={pokemon} />
            ))}
          </PokemonList>
        )}
        <div className="more-button">
          {pokemons?.previous != null ? (
            <Button onClick={() => prev(pokemons.previous)}>prev</Button>
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

export { NextPokemonScreen };
