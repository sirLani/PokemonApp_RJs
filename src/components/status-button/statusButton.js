/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import * as React from "react";
import { FaCheckCircle, FaHeart } from "react-icons/fa";
import Tooltip from "@reach/tooltip";

import * as colors from "styles/colors";

import { CircleButton } from "../lib/lib";

function TooltipButton({
  label,
  highlight,
  onClick,
  handleClick,
  icon,
  ...rest
}) {
  return (
    <Tooltip label={label}>
      <CircleButton
        css={{
          backgroundColor: colors.gray20,
        }}
        onClick={onClick}
        aria-label={label}
        {...rest}
      >
        {icon}
      </CircleButton>
    </Tooltip>
  );
}

function StatusButtons(pokemon) {
  const [added, setAdded] = React.useState();

  const addToFavourites = (pokemon) => {
    localStorage.setItem(pokemon.pokemon.name, JSON.stringify(pokemon.pokemon));
    setAdded(true);
  };

  const removeFromFavourites = (pokemon) => {
    localStorage.removeItem(pokemon.pokemon.name);
    setAdded(false);
  };

  React.useEffect(() => {
    const pokiList = Object.keys(localStorage);
    if (pokiList.includes(pokemon.pokemon.name)) {
      setAdded(true);
    }
  }, [pokemon.pokemon.name]);

  return (
    <React.Fragment>
      {pokemon ? (
        Boolean(pokemon) ? (
          <TooltipButton
            label={added ? "Remove from favorites" : "Add to favorites"}
            highlight={colors.yellow}
            onClick={() =>
              added ? removeFromFavourites(pokemon) : addToFavourites(pokemon)
            }
            icon={<FaHeart color={added ? colors.danger : colors.base} />}
          />
        ) : (
          <></>
        )
      ) : null}
    </React.Fragment>
  );
}

export { StatusButtons };
