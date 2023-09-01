// eslint-disable-next-line react/prop-types
export function Header ({refreshPage, Search, error}){
    return (
        <div className="title__container">
        <img
          onClick={refreshPage}
          className="title__img"
          src="../public\International_Pokémon_logo.svg.png"
          alt="Pokemon"
          aria-label="Pokemon Logo"
        />

        {Search}
        {error && <p className="pokemon__error">Pokemon not found</p>}
      </div>
    )
}