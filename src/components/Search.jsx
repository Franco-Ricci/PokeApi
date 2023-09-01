// eslint-disable-next-line react/prop-types
export function Search({ handleSearch}){

    return(
        <form>
            <input className="input__search" type="text" onChange={handleSearch} id="search" placeholder="Search your pokemon" />
            <label htmlFor="search"></label>
        </form>
    )
}