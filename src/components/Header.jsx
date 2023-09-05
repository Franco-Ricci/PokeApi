// eslint-disable-next-line react/prop-types
export function Header ({ Search, error}){
    return (
        <div className="title__container">
        <img
          
          className="title__img"
          src="../International_Pokémon_logo.svg.png"
          alt="Pokemon"
          aria-label="Pokemon Logo"
          onClick={() =>  window.location.reload()} 
        />

        {Search}
        {error && <p className="pokemon__error">Pokemon not found</p>}
      </div>
    )
}