import { Toaster } from "react-hot-toast";
import "./App.css";
import CharacterDetails from "./component/CharacterDetails";
import CharacterList from "./component/CharacterList";
import Loader from "./component/Loader";
import Navbar, { Favorite, Search, SearchResult } from "./component/Navbar";
import { useEffect, useState } from "react";
import useCharacters from "./hooks/useCharacters";

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacters(query);
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("FAVORITES")) || []
  );
  useEffect(() => {
    localStorage.setItem("FAVORITES", JSON.stringify(favorites));
  }, [favorites]);

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
  const DeleteFavoriteHandler = (id) => {
    setFavorites((prevFav) => prevFav.filter((item) => item.id !== id));
  };
  return (
    <div className="app">
      <Navbar favorites={favorites}>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favorite
          favorites={favorites}
          onDeleteFavorites={DeleteFavoriteHandler}
        />
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
