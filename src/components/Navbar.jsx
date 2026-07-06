import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">HobbyStack</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/saved">Saved Stack</Link>
      </div>
    </nav>
  );
}

export default Navbar;