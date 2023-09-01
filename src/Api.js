
export async function getPoke({pagine,setPagine}){
    let API 

    if(pagine == "" || pagine == null){
        API = "https://pokeapi.co/api/v2/pokemon/"
    }else{
        API= pagine
        console.log(pagine)
        console.log("aqui")
    }
    try {
        console.log("Fetching data from:", API);
        console.log(pagine)
        const response = await fetch(API)
        const json = await response.json()
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
          }
        const pokemons = json.results
        const pagination = json
        setPagine(pagination)
        console.log(pagination)
        console.log(pokemons)

        const pokemonData = pokemons.map(async(pokemon) =>{
            const url = pokemon.url
            const response = await fetch(url)
            const pokeData = await response.json()
            console.log(pokeData)

            return {
                id: pokeData.id,
                name: pokeData.name,
                image: pokeData.sprites.other.dream_world.front_default,
                type: pokeData.types.map(type => type.type.name)
            }

        })

        return Promise.all(pokemonData)
       

        // return pokemons.map(pokemon => ({
        //     name:pokemon.name,
        //     url:pokemon.url
        // }))
    } catch (error) {
        console.error("Error occurred:", error.message)
        throw new Error("Error searching")
    }
}
 
export async function getAllPokemons (){
    const API_URL = "https://pokeapi.co/api/v2/pokemon"

    try {
        const response = await fetch(API_URL)
        const json = await response.json()

        const pokemons = json.results
        console.log(pokemons)

        const pokemonData = pokemons.map(async(pokemon) =>{
            const url = pokemon.url
            const response = await fetch(url)
            const pokeData = await response.json()
            console.log(pokeData)

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