import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <NavLink to="/" className="navbar-brand">
          Coffee R Us
        </NavLink>
        
        {/* Navigation links */}
        <div className="navbar-links">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/shop">
            Shop
          </NavLink>

          <NavLink to="/admin">
            Portal
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;