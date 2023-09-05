import { useEffect, useState, useRef } from "react";
import { getPoke, getAllPokemons } from "./Api";
import "./index.css";
import { Search } from "./components/Search";
import { Navigation } from "./components/Navigation";
import { AllPokemonList } from "./components/AllPokemonList";
import { PokemonSearched } from "./components/PokemonSearched";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { Error404 } from "./components/Error404";

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

  const [pagine, setPagine] = useState("");


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
      console.log(search);
      console.log(results);
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


//handle pagination and make an api call for 20 pokemons
  useEffect(() => {
    async function data() {
      try {
        const prob = await getPoke({ pagine, setPagine, setErrorFetch});
        setPoke(prob);
        console.log(pagine)
         setLoading(false); 
             
      } catch (error) {
        console.error(error.message);

        setLoading(false); 
      }
    }
    data();
  }, [pagine]);

  return (
    <>
      <main className="container" ref={scrollUp}>
      {errorFetch && (<Error404/>)}
        {!loading && (
          <Header Search={<Search handleSearch={handleSearch} />} error={error} />
       )}

        <div className="pokemon__container">
          {loading && (
            <Loader/>
          )}{" "}
          {hasSearched == false
            ? 
             
             <AllPokemonList poke={poke}/>
            
            : results.length !== 0 // Check if searchResults is not empty
            ? <PokemonSearched results={results}/>
            : ""}
        </div>

        {!loading && search === "" && (
          <Navigation pagine={pagine} setPagine={setPagine}/>
        )}
      </main>
    </>
  );
}

export default App;
