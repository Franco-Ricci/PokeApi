import { useEffect, useState } from "react";
import { getPoke, getAllPokemons } from "./API";
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
  const [error, setError] = useState("");

  const [hasSearched, setHasSearched] = useState(true);
  const [loading, setLoading] = useState(true);

  const [pagine, setPagine] = useState("");

  function handleSearch(e) {
    let newSearch = e.currentTarget.value;
    setSearch(newSearch);
  }

  function refreshPage() {
    window.location.reload();
  }

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

  useEffect(() => {
    async function searchPokemon() {
      try {
        let allPokes = await getAllPokemons();

        setAllPokemons(allPokes);

        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    }

    searchPokemon();
  }, []);

  useEffect(() => {
    async function data() {
      try {
        const prob = await getPoke({ pagine, setPagine });

        setPoke(prob);
      } catch (error) {
        console.error(error.message);
      }
    }
    data();
  }, [pagine]);

  return (
    <>
      <main className="container">
        {!loading && (
          <Header refreshPage={refreshPage} Search={<Search handleSearch={handleSearch} />} handleSearch={handleSearch} error={error} />
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
