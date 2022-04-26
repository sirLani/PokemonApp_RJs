/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import * as colors from "styles/colors";
import { usePokemonSearch } from "utils/pokemons";

const { default: Tooltip } = require("@reach/tooltip");
const { Input, Spinner } = require("components/lib/lib");

function Search({ setAllPokemons }) {
  const [query, setQuery] = React.useState("");
  const [queried, setQueried] = React.useState(false);
  const { pokemons, error, isLoading, isError, isSuccess } = usePokemonSearch(
    query.toLowerCase()
  );

  function handleSearchClick(event) {
    event.preventDefault();
    if (event.target.elements.search.value === "") {
      alert("Kindly type in your search");
    } else {
      setQueried(true);
      setQuery(event.target.elements.search.value);
    }
  }

  React.useEffect(() => {
    if (pokemons?.name) {
      const list = [];
      list.push(pokemons);
      setAllPokemons(list);
      setQueried(false);
    }
  }, [pokemons, setAllPokemons]);
  return (
    <React.Fragment>
      {isError ? (
        <div css={{ color: colors.danger }}>
          <p>There was an error:</p>
          <pre>The pokemon you searched for was not found</pre>
          <pre>{error.message}</pre>
        </div>
      ) : null}
      <form onSubmit={handleSearchClick}>
        <Input
          placeholder="Search pokemons..."
          id="search"
          type="search"
          css={{ width: "100%" }}
        />
        <Tooltip label="Search pokemons">
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
      {queried ? (
        <div css={{ width: "100%", margin: "auto" }}>
          <Spinner />
        </div>
      ) : (
        <div css={{ marginTop: 20, fontSize: "1.2em", textAlign: "center" }}>
          <p>Welcome to the discover page.</p>
          <p>Here, check out a list of Pokemons...</p>
          {isLoading ? (
            <div css={{ width: "100%", margin: "auto" }}>
              <Spinner />
            </div>
          ) : isSuccess ? (
            <p>Here you go! Find more Pokemons with the search bar above.</p>
          ) : isSuccess && !pokemons ? (
            <p>
              Hmmm... I couldn't find any pokemon to suggest for you. Sorry.
            </p>
          ) : null}
        </div>
      )}
    </React.Fragment>
  );
}

export { Search };
