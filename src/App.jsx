import "./App.css";
import { allCharacters } from "../data/data";
import CharacterDetails from "./component/CharacterDetails";
import CharacterList from "./component/CharacterList";
import Navbar from "./component/Navbar";
import { useEffect, useState } from "react";

const App = () => {
  const [Charcters, setcharacters] = useState(allCharacters);
  useEffect(() => {
    async function fetchCharacters() {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setcharacters(data.results.slice(0, 5));
    }
    fetchCharacters();
    // fetch("https://rickandmortyapi.com/api/character")
    //   .then((res) => res.json())
    //   .then((data) => setcharacters(data.results.slice(0,5)));
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharacterList allCharacters={allCharacters} Charcters={Charcters} />
        <CharacterDetails />
      </div>
    </div>
  );
};

export default App;
