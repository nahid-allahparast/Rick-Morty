import { HeartIcon } from "@heroicons/react/24/outline";
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
export function Favorite({numOfFavorite}) {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge ">{numOfFavorite}</span>
    </button>
  );
}
