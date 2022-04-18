/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import * as React from "react";
import Tooltip from "@reach/tooltip";
import { FaSearch, FaTimes } from "react-icons/fa";
import * as colors from "styles/colors";

import { Spinner, Input } from "../components/lib/lib";

function DiscoverPokemonScreen() {
  const [query, setQuery] = React.useState("");
  const [queried, setQueried] = React.useState();
  const [isError, setIsError] = React.useState(false);

  const [isLoading, setIsloading] = React.useState(false);
  //   const {books, error, isLoading, isError, isSuccess} = useBookSearch(query)

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
            <pre>hducsudiid</pre>
          </div>
        ) : null}
      </div>
      <div>
        {queried ? null : (
          <div css={{ marginTop: 20, fontSize: "1.2em", textAlign: "center" }}>
            <p>Welcome to the discover page.</p>
            <p>Here, check out a list of Pokemons...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export { DiscoverPokemonScreen };
