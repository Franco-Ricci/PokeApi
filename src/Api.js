
export function getPoke({pagine,setPagine,setPoke}){


fetch(pagine)
.then((response) => {
  if (!response.ok) {
    throw new Error(`Network response was not ok (${response.status})`);
  }
  return response.json();
})
.then((data) => {
  console.log("Fetching data from:", pagine);
 
  setPagine(data)
  console.log(data)
  let allData = data.results

  Promise.all(
    allData.map(async (result)=>{
     let urlPoke = result.url
    const response = await fetch(urlPoke);
      const pokeData = await response.json();
      return ({
        id: pokeData.id,
        name: pokeData.name,
        image: pokeData.sprites.other.dream_world.front_default,
        type: pokeData.types.map(type => type.type.name)
      }); 
}))
.then((pokemonData) => {
  setPoke(pokemonData)
})
.catch((error)=>{
  console.error(error)
})
  })
}

export async function getAllPokemons (){
    const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"

    try {
        const response = await fetch(API_URL)
        if(!response.ok){
          throw new Error(`Network response was not ok (${response.status})`);
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