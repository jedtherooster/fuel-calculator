import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="header">
        <div className="logo"></div>
        <div className="links">
          <Link to="/">Calculator</Link>
          <Link to="/fuel-prices">Fuel Prices</Link>
        </div>
        <div className="account"></div>
      </div>
    </nav>
  );
}

export default Navbar;
