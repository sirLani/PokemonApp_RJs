/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import * as React from "react";
import { FaCheckCircle, FaHeart, FaSearch } from "react-icons/fa";
import Tooltip from "@reach/tooltip";

import * as colors from "styles/colors";

import { CircleButton, Spinner } from "../lib/lib";

function TooltipButton({
  label,
  highlight,
  onClick,
  handleClick,
  icon,
  ...rest
}) {
  //   function handleClick() {

  //       run(onClick());

  //   }

  return (
    <Tooltip label={label}>
      <CircleButton
        css={{
          backgroundColor: colors.gray20,
          ":hover,:focus": {
            // color: isLoading
            //   ? colors.gray80
            //   : isError
            //   ? colors.danger
            //   : highlight,
          },
        }}
        // disabled={isLoading}
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
  //   const listItem = useListItem(book.id)
  const [added, setAdded] = React.useState();
  const addToFavourites = (pokemon) => {
    console.log(pokemon);
    localStorage.setItem(pokemon.pokemon.name, JSON.stringify(pokemon.pokemon));
    setAdded(true);
  };

  React.useEffect(() => {
    // addToFavourites(pokemon);
  });

  return (
    <React.Fragment>
      {pokemon ? (
        Boolean(pokemon) ? (
          <TooltipButton
            label="Add to favorites"
            highlight={colors.yellow}
            onClick={() => addToFavourites(pokemon)}
            icon={<FaHeart color={added ? colors.danger : colors.base} />}
          />
        ) : (
          <TooltipButton
            label="Remove from favorites"
            highlight={colors.green}
            onClick={() => {}}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
    </React.Fragment>
  );
}

export { StatusButtons };
