import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";
function Navbar({ children }) {
  return (
    <nav className="navbar">
      <div className="logo">LOGO 🚴‍♂️</div>
      {children}
    </nav>
  );
}

export default Navbar;

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="Search ..."
    />
  );
}
export function SearchResult({ numOfResult }) {
  return <div className="search-result"> found {numOfResult} item</div>;
}
export function Favorite({ favorites, open, title, onOpen,onDeleteFavorites }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Modal open={openModal} onOpen={setOpenModal} title="List Of Favorites">
        {favorites.length === 0 ? (
          <h2 className="red">ther is no any favorite yet!</h2>
        ) : (
          favorites.map((item) => (
            <Character  item={item} key={item.id}>
              <button onClick={() => onDeleteFavorites(item.id)}>
                <TrashIcon className="red icon" />
              </button>
            </Character>
          ))
        )}
      </Modal>
      <button className="heart" onClick={() => setOpenModal(true)}>
        <HeartIcon className="icon " />
        <span className="badge ">{favorites.length}</span>
      </button>
    </>
  );
}
