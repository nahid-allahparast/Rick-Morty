import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "./Loader";

const CharcterDetails = ({
  children,
  selectedId,
  onAddToFavorites,
  isAddetToFavorite,
}) => {
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
      <CharacterDetailInfo
        character={character}
        onAddToFavorites={onAddToFavorites}
        isAddetToFavorite={isAddetToFavorite}
      />

      <EpisodeList episodes={episodes} />
    </div>
  );
};

export default CharcterDetails;

const CharacterDetailInfo = ({
  character,
  onAddToFavorites,
  isAddetToFavorite,
}) => {
  return (
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
          {isAddetToFavorite ? (
            <p>Already added to favorites✔️</p>
          ) : (
            <button
              onClick={() => onAddToFavorites(character)}
              className="btn btn--primary"
            >
              Add to favorites
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const EpisodeList = ({ episodes }) => {
  const [sortBy, setSortBy] = useState(true);
  let sortedEpisode;
  if (sortBy) {
    sortedEpisode = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  } else {
    sortedEpisode = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  }
  return (
    <div className="template character-episode">
      <div className="character-episode__title">
        <h2>List of Episode</h2>
        <button
          className="icon"
          onClick={() => setSortBy((is) => !is)}
          style={{ rotate: sortBy ? "0deg" : "-180deg" ,color: "var(--rose-500)"}}
        >
          <ArrowDownCircleIcon />
        </button>
      </div>
      <ul className="character-episode__list" >
        {sortedEpisode.map((episode, index) => (
          <li className="episode" key={episode.id}>
            <div>
              {String(index + 1).padStart(2, "0")}-
              <strong>{episode.name}</strong>
            </div>
            <div className="badge badge--secondary">{episode.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
