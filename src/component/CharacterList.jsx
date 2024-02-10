import { EyeIcon } from "@heroicons/react/24/outline";

const CharacterList = ({ Charcters }) => {
  return (
    <div className="character-list">
      {Charcters.map((item) => (
        <Character key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CharacterList;

const Character = ({ item }) => {
  return (
    <div className="template character">
      <img src={item.image} />

      <div className="info">
        <h3 className="name">
          <span>{item.gender === "Male" ? "🧑" : "👩"} </span>
          <span>{item.name}</span>
        </h3>
        <div>
          <span className={`status ${item.status === "Dead" && "red"}`}></span>
          <span> {item.status}</span>
          <span> - {item.species}</span>
        </div>
      </div>
      <button className="red">
        <EyeIcon className="icon" />
      </button>
    </div>
  );
};
