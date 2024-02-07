import {HeartIcon} from "@heroicons/react/24/outline"
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">LOGO 🚴‍♂️</div>
      <input type="text" className="text-field" placeholder="Search ..."/>
      <div className="search-result"> found X item</div>
      <button className="heart">
        <HeartIcon className="icon"/>
      </button>
    </nav>
  );
};

export default Navbar;
