/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { PokemonDetails } from "components/lib/lib";
import { Modal, ModalContents, ModalOpenButton } from "components/modal/modal";
import { StatusButtons } from "components/status-button/statusButton";
import * as colors from "styles/colors";

import * as React from "react";

export function Pokemon({ pokemon }) {
  const pokemonMeta = {
    alignSelf: "center",
  };
  return (
    <Modal>
      <ModalOpenButton>
        <div className="pokemon">
          <div className="pokemon__name">
            <p css={{ textTransform: "capitalize" }}>{pokemon.name}</p>
          </div>
          <div className="pokemon__image">
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
            />
          </div>
          <div className="pokemon__meta">
            <div css={pokemonMeta}>Weight: {pokemon.weight}</div>
            <div css={pokemonMeta}>Height: {pokemon.height}</div>
          </div>
        </div>
      </ModalOpenButton>

      <ModalContents aria-label="Pokemon details" title={pokemon.name}>
        <PokemonDetails>
          <div className="pokemon__details">
            <div className="pokemon__meta ">
              <div>Weight: {pokemon.weight}</div>
              <div>Height: {pokemon.height}</div>
            </div>

            <div className="pokemon__meta ">
              <h4>Stats:</h4>

              {pokemon.stats.map((stat, id) => (
                <div key={id}>
                  {stat.stat.name}: {stat.base_stat}
                </div>
              ))}
            </div>

            <div className="pokemon__ability">
              <h4>Ability:</h4>
              <div className="pokemon__attacks">
                {pokemon.abilities.map((ability, id) => (
                  <span key={id}>{ability.ability.name}</span>
                ))}
              </div>
            </div>
            <div className="pokemon__ability">
              <h4>Attacks:</h4>
              <div className="pokemon__attacks">
                {pokemon.moves.map((move, id) => (
                  <div key={id} css={{ display: "flex" }}>
                    <p css={{ marginRight: "8px" }}>{id + 1}.</p>
                    <span>{move.move.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pokemon__image">
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
            />
            <div
              css={{
                marginTop: "10px",
                color: colors.gray80,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "100%",
              }}
            >
              <StatusButtons pokemon={pokemon} />
            </div>
          </div>
        </PokemonDetails>
      </ModalContents>
    </Modal>
  );
}
