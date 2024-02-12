import { Toaster, toast } from "react-hot-toast";
import "./App.css";
import CharacterDetails from "./component/CharacterDetails";
import CharacterList, { Character } from "./component/CharacterList";
import Loader from "./component/Loader";
import Navbar, { Search, SearchResult } from "./component/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [characters, setcharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [detailCharacter, setDetailCharacter] = useState({});
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        // console.log(res)
        setcharacters(res.data.results);
      } catch (error) {
        toast.error(error.response.data.error);
        setcharacters([]);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [query]);
  const detailHandler = (id) => {
    async function getDetail() {
      try {
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        setDetailCharacter(res.data);
        console.log(res.data);
        console.log(id);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
    getDetail();
  };
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
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <div className="main">
        {isLoading === true ? (
          <Loader />
        ) : (
          <CharacterList
            characters={characters}
            onFetchDetail={detailHandler}
          />
        )}

        <CharacterDetails detailCharacter={detailCharacter} />

        <Toaster />
      </div>
    </div>
  );
}

export default App;
