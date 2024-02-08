import { character } from "../../data/data";

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
      
    </div>
  );
};

export default CharcterDetails;
