import { useEffect, useState, useRef } from "react";
import { getPoke,  getAllPokemons } from "./Api";
import "./index.css";
import { Search } from "./components/Search";
import { Navigation } from "./components/Navigation";
import { AllPokemonList } from "./components/AllPokemonList";
import { PokemonSearched } from "./components/PokemonSearched";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";


function App() {
  const [poke, setPoke] = useState([]);

  const [search, setSearch] = useState("");

  const [results, setResults] = useState([]);

  const [allPokemons, setAllPokemons] = useState();

  //state to handle search error
  const [error, setError] = useState("");

  //state to handle fetch error
  const [errorFetch, setErrorFetch] = useState(null);

  const [hasSearched, setHasSearched] = useState(true);
  
  const [loading, setLoading] = useState(true);

  const [pagine, setPagine] = useState("https://pokeapi.co/api/v2/pokemon/");


  const scrollUp = useRef(null);

  //function to make it scroll up when click buttons
  const handleTopScroll = () => {
    if (scrollUp.current) {
      scrollUp.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    handleTopScroll()
  }, [pagine])
  

  //save the search value in state
  function handleSearch(e) {
    let newSearch = e.currentTarget.value;
    setSearch(newSearch);
  }

  //filter by name
  useEffect(() => {
    if (search !== "") {
      const busqueda = allPokemons.filter((e) => e.name.includes(search));
      setResults(busqueda);
      setError(busqueda.length === 0);
      setHasSearched(null);

    } else {
      setResults([]);
      setError(false);
      setHasSearched(false);
    }
  }, [search]);

  //bring all pokemons
  useEffect(() => {
    async function searchPokemon() {
      try {
        let allPokes = await getAllPokemons({setErrorFetch});

        setAllPokemons(allPokes);

        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    }

    searchPokemon();
  }, []);


  useEffect(() => {
    getPoke({pagine, setPagine, setPoke, setErrorFetch})
  }, [pagine]);
  
  return (
    <>
      <main className="container" ref={scrollUp}>

        {!loading && errorFetch == null &&(
          <Header Search={<Search handleSearch={handleSearch} />} error={error} />
       )}

        <div className="pokemon__container">
          {loading && errorFetch ==null &&(
            <Loader/>
          )}{" "}
          {hasSearched == false
            ? 
             
             <AllPokemonList poke={poke}/>
            
            : results.length !== 0 // Check if searchResults is not empty
            ? <PokemonSearched results={results}/>
            : ""}
        </div>

        {!loading && search === "" && errorFetch ==null && (
          <Navigation pagine={pagine} setPagine={setPagine}/>
        )}
      </main>
    </>
  );
}

export default App;
