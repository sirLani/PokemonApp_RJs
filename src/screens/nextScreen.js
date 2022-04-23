/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import * as React from "react";
import * as colors from "styles/colors";

import { Spinner, PokemonList, Button, splitUrl } from "../components/lib/lib";
import { usePokemonSearch } from "utils/pokemons";
import { Pokemon } from "components/pokemonItem/pokemon";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Search } from "components/search/search";

function NextPokemonScreen() {
  const { id } = useParams();

  const location = useLocation();

  const [allPokemons, setAllPokemons] = React.useState([]);
  const { pokemons, error, isError } = usePokemonSearch(location.state);
  const [fetchLoading, setfetchLoading] = React.useState(true);

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
