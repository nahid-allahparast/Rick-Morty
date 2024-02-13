import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const CharacterList = ({ characters, onSelectedId, selectedId }) => {
  return (
    <div className="character-list">
      {characters.map((item) => (
        <Character
          key={item.id}
          item={item}
          onSelectedId={onSelectedId}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
};

export default CharacterList;

export const Character = ({ item, onSelectedId, selectedId }) => {
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
      <button className="red" onClick={() => onSelectedId(item.id)}>
        {item.id === selectedId ? (
          <EyeSlashIcon className="icon" />
        ) : (
          <EyeIcon className="icon" />
        )}
      </button>
    </div>
  );
};
