
export async function getPoke({pagine,setPagine, setErrorFetch}){
    let API_URL 

    if(pagine == "" || pagine == null){
        API_URL = "https://pokeapi.co/api/v2/pokemon/"
    }else{
        API_URL= pagine
    }
    try {
        console.log("Fetching data from:", API_URL);

        const response = await fetch(API_URL)

        if (!response.ok) {
            console.log(!response.ok)
            setErrorFetch(true)
            throw new Error(`Network response was not ok (${response.status})`);
        }
        const json = await response.json()
        const pokemons = json.results
        const pagination = json
        setPagine(pagination)

        const pokemonData = pokemons.map(async(pokemon) =>{
            const url = pokemon.url
            const response = await fetch(url)
            const pokeData = await response.json()


            return {
                id: pokeData.id,
                name: pokeData.name,
                image: pokeData.sprites.other.dream_world.front_default,
                type: pokeData.types.map(type => type.type.name)
            }

        })

        return Promise.all(pokemonData)

    } catch (error) {
        console.error("Error occurred:", error.message)
        throw new Error("Error searching")

    }
}

export async function getAllPokemons ({setErrorFetch}){
    const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"

    try {
        const response = await fetch(API_URL)
        if(!response.ok){
            setErrorFetch(true)
        }
        const json = await response.json()

        const pokemons = json.results


        const pokemonData = pokemons.map(async(pokemon) =>{
            const url = pokemon.url
            const response = await fetch(url)
            const pokeData = await response.json()

            return {
                id: pokeData.id,
                name: pokeData.name,
                image: pokeData.sprites.other.dream_world.front_default,
                type: pokeData.types.map(type => type.type.name)
            }

        })

        return Promise.all(pokemonData)

}   catch(e){
    throw new Error(e.message)

}
}