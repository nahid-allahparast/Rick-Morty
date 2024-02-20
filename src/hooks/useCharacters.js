import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(query) {
  const [characters, setcharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );
        setcharacters(data.results.slice(10, 18));
      } catch (err) {
        // if (axios.isCancel()) {
        //   setcharacters([]);
        //   toast.error(err.response.data.error);
        // }

        if (err.name !== "CanceledError") {
          setcharacters([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getData();
    return () => {
      controller.abort();
    };
  }, [query]);
  return { isLoading, characters };
}
