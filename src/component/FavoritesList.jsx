import axios from "axios";
import { useEffect, useState } from "react";

const FavoritesList = ({ favorites }) => {
  const [favo, setFavo] = useState([]);
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/${favorites}`
      );
      setFavo([...favo, data]);
      console.log(favo);
    }
    getData();
  }, [favorites]);
  return (
    <div>
      {favo.map((item) => (
        <h1 key={item.id}>{item.name}</h1>
      ))}
    </div>
  );
};

export default FavoritesList;
