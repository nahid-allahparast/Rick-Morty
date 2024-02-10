import "./App.css";
import CharacterDetails from "./component/CharacterDetails";
import CharacterList from "./component/CharacterList";
import Loader from "./component/Loader";
import Navbar from "./component/Navbar";
import { useEffect, useState } from "react";

const App = () => {
  const [characters, setcharacters] = useState([]);
  const [isLoading, setIsLoadinf] = useState(false);
  useEffect(() => {
    async function fetchCharacters() {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setcharacters(data.results.slice(0, 5));
      setIsLoad((isLoad) => !isLoading);
    }
    fetchCharacters();
    // fetch("https://rickandmortyapi.com/api/character")
    //   .then((res) => res.json())
    //   .then((data) => setcharacters(data.results.slice(0,5)));
  }, []);

  return (
    <div className="app">
      <Navbar characters={characters} />
      <div className="main">
        {isLoading === true ? (
          <Loader />
        ) : (
          <CharacterList characters={characters} />
        )}

        <CharacterDetails />
      </div>
    </div>
  );
};

export default App;
