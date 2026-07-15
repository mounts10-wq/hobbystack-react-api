import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const navLinkClassName = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <Link to="/" className="logo">HobbyBook</Link>

      <div className="nav-links">
        <NavLink to="/" className={navLinkClassName}>Home</NavLink>
        <NavLink to="/search" className={navLinkClassName}>Search</NavLink>
        <NavLink to="/saved" className={navLinkClassName}>Saved Books</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;