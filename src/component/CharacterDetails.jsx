import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "./Loader";

const CharcterDetails = ({ children, selectedId }) => {
  const [character, setcharacter] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function getDetails() {
      try {
        setIsloading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );

        setcharacter(data);

        const episodesId = data.episode.map((episode) =>
          episode.split("/").at(-1)
        );
        const { data: episodesData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodesData].flat().slice(0, 6));
        console.log(episodes);
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsloading(false);
      }
    }
    if (selectedId) getDetails();
  }, [selectedId]);

  if (!character || !selectedId)
    return (
      <h3
        style={{
          flex: 1,
          color: "var(--slate-200)",
          textAlign: "center",
          paddingTop: "1rem",
        }}
      >
        Please select a character
      </h3>
    );

  if (isLoading) return <Loader />;

  return (
    <div className="detail-component">
      {children}
      <div className="template character-details">
        <img
          className="character-details__img"
          src={character.image}
          alt={character.name}
        />
        <div className="character-details__info">
          <div className="name">
            <span>{character.gender === "Male" ? "🧑" : "👩"}</span>
            <span> {character.name}</span>
          </div>
          <div>
            <span
              className={`status ${character.status === "Dead" && "red"}`}
            ></span>
            <span>
              {character.status} - {character.species}
            </span>
          </div>
          <div className="location">
            <p>Last known location:</p>
            <p>{character.location.name}</p>
          </div>
          <div className="actions">
            <button className="btn btn--primary">Add to favorites</button>
          </div>
        </div>
      </div>
      <div className="template character-episode">
        <div className="character-episode__title">
          <h2>List of Episode</h2>
          <button className="icon">
            <ArrowDownCircleIcon />
          </button>
        </div>
        <ul className="character-episode__list">
          {episodes.map((episodes, index) => (
            <li className="episode" key={episodes.id}>
              <div>
                {String(index + 1).padStart(2, "0")}-
                <strong>{episodes.name}</strong>
              </div>
              <div className="badge badge--secondary">{episodes.air_date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharcterDetails;
