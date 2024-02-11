import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { character, episodes } from "../../data/data";

const CharcterDetails = () => {
  return (
    <div className="detail-component">
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
              {" "}
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
          {episodes.map((episode, index) => (
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
    </div>
  );
};

export default CharcterDetails;
export function TeChildren() {
  return <h1>test</h1>;
}
