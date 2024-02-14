import { Toaster, toast } from "react-hot-toast";
import "./App.css";
import CharacterDetails from "./component/CharacterDetails";
import CharacterList from "./component/CharacterList";
import Loader from "./component/Loader";
import Navbar, { Favorite, Search, SearchResult } from "./component/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import FavoritesList from "./component/FavoritesList";

function App() {
  const [characters, setcharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        setcharacters(res.data.results.slice(0, 6));
      } catch (error) {
        toast.error(error.response.data.error);
        setcharacters([]);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [query]);

  const selectedIdHandler = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const addFavoritesHandler = (character) => {
    setFavorites((prevFavorites) => [...prevFavorites, character]);
  };
  const isAddetToFavorite = favorites
    .map((fave) => fave.id)
    .includes(selectedId);
  // useEffect(() => {
  //   async function fetchCharacters() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch("https://rickandmortyapi.com/api/character");
  //       if (!res.ok) throw new Error("some thing is wrong");
  //       const data = await res.json();
  //       setcharacters(data.results.slice(0, 5));
  //     } catch (error) {
  //       toast.error(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchCharacters();
  // }, []);
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("this is an ERROR from then catch method");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setcharacters(data.results.slice(0, 5));
  //     })
  //     .catch((error) => {
  //       toast.error(error.message);
  //     })
  //     .finally(setIsLoading(false));
  // }, []);
  return (
    <div className="app">
      <Navbar favorites={favorites}>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favorite numOfFavorite={favorites.length} />
      </Navbar>
      <div className="main">
        {isLoading === true ? (
          <Loader />
        ) : (
          <CharacterList
            characters={characters}
            onSelectedId={selectedIdHandler}
            selectedId={selectedId}
          />
        )}
        <CharacterDetails
          selectedId={selectedId}
          onAddToFavorites={addFavoritesHandler}
          isAddetToFavorite={isAddetToFavorite}
        />

        <Toaster />
      </div>
    </div>
  );
}

export default App;
