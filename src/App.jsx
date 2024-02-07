import "./App.css";
import { allCharacters } from "../data/data";
import CharacterDetails from "./component/CharacterDetails";
import CharacterList from "./component/CharacterList";
import Navbar from "./component/Navbar";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharacterList allCharacters={allCharacters} />
        <CharacterDetails />
      </div>
    </div>
  );
};

export default App;
