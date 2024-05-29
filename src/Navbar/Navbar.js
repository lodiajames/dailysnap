import "./Navbar.css";
import { Link } from "react-router-dom";
import { RxFontFamily } from "react-icons/rx";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="cire">
          Daily
          <RxFontFamily />
        </span>
        <span className="amily">rame</span>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create-post">Post Now</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
