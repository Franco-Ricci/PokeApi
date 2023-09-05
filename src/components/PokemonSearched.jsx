export function PokemonSearched({results}){
    return (
        results.map((pokemon) => (
            <div
              className={`pokemon__content--${pokemon.type[0]}`}
              key={pokemon.id}
            >
              <h1>{pokemon.name}</h1>
              <img
                className="pokemon__img"
                src={pokemon.image}
                alt={pokemon.name}
              />
              <p className="pokemon__id">#{pokemon.id}</p>
              {pokemon.type && pokemon.type.length > 0 && (
                <p className="pokemon__type">{pokemon.type.join(", ")}</p>
              )}
            </div>
          ))
    )
}