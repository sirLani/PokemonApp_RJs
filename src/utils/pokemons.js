import pokemonPlaceholderSvg from "assets/placeholder.svg";
import { useQuery, queryCache } from "react-query";
import { client } from "./api-client";

const loadingPokemon = {
  name: "Loading...",
  meta: "loading...",
  PokemonImageUrl: pokemonPlaceholderSvg,
  publisher: "Loading Publishing",
  synopsis: "Loading...",
  loadingBook: true,
};

const loadingPokemons = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-pokemon-${index}`,
  ...loadingPokemon,
}));

const pokemonQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

const getPokemonSearchConfig = (client, query) => ({
  queryKey: ["pokemonSearch", { query }],
  queryFn: () => client(`/pokemon/${query}`).then((data) => data),
  config: {
    onSuccess(pokemons) {
      queryCache.setQueryData(
        ["pokemon", { pokemonId: pokemons.id }],
        pokemons,
        pokemonQueryConfig
      );
    },
  },
});

function usePokemonSearch(query) {
  const result = useQuery(getPokemonSearchConfig(client, query));
  return { ...result, pokemons: result.data ?? loadingPokemons };
}

const usePokemon = (pokemonList) => ({
  queryKey: ["pokemonList", pokemonList.id],
  queryFn: () =>
    pokemonList.forEach(async (pokemon) => {
      await fetch(pokemon.url).then((result) => {
        result.json().then((res) => {
          // list.push(res);
        });
      });
    }),
});

function useFetchPokemonSearch(pokemonList) {
  const result = useQuery(usePokemon(pokemonList));
  return { ...result, pokemonList: result.data ?? loadingPokemons };
}

export { usePokemonSearch, useFetchPokemonSearch };
