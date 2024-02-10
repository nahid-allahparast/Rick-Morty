import { HeartIcon } from "@heroicons/react/24/outline";
const Navbar = ({ characters }) => {
  return (
    <nav className="navbar">
      <div className="logo">LOGO 🚴‍♂️</div>
      <input type="text" className="text-field" placeholder="Search ..." />
      <div className="search-result"> found {characters.length} item</div>
      <button className="heart">
        <HeartIcon className="icon" />
      </button>
    </nav>
  );
};

export default Navbar;
