import React from "react";

export function Pokemon({ pokemon }) {
  console.log({ pokemon });
  return (
    <div className="pokemon">
      <div className="pokemon__name">
        <p>{pokemon.name}</p>
      </div>
      <div className="pokemon__image">
        <img
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
        />
      </div>
      <div className="pokemon__meta">
        <span>Weight: {pokemon.weight}</span>
        <span>Height: {pokemon.height}</span>
      </div>
      {/* <div className="pokemon__attacks">
        {pokemon.attacks.special.slice(0, 3).map((attack) => (
          <span key={`${attack.name}-${attack.damage}`}>{attack.name}</span>
        ))}
      </div> */}
    </div>
  );
}
