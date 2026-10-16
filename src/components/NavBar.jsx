import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      {/* NavLink lets users navigate without reloading the page */}
      <NavLink to="/">Home</NavLink>
      <NavLink to="/shop">Shop</NavLink>
      <NavLink to="/admin">Portal</NavLink>
    </nav>
  );
}

export default Navbar;