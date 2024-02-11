import { Toaster, toast } from "react-hot-toast";
import "./App.css";
import CharacterDetails from "./component/CharacterDetails";
import CharacterList from "./component/CharacterList";
import Loader from "./component/Loader";
import Navbar from "./component/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [characters, setcharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "https://rickandmortyapi.com/api/characterd"
        );
        setcharacters(res.data.results);
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);
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
      <Navbar characters={characters} />
      <div className="main">
        {isLoading === true ? (
          <Loader />
        ) : (
          <CharacterList characters={characters} />
        )}

        <CharacterDetails />
        <Toaster />
      </div>
    </div>
  );
};

export default App;
