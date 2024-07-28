import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark-theme");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark-theme");
    }
  };

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Link className="nav_logo" to={"#"}>
          Rahil Ahmed Samani
        </Link>

        <div
          className={`nav_menu ${isMenuOpen ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav_list grid">
            <li className="nav_item">
              <Link to={"#home"} className="nav_link active-link">
                <i className="uil uil-estate nav_icon"></i> Home
              </Link>
            </li>
            <li className="nav_item">
              <Link to={"#about"} className="nav_link">
                <i className="uil uil-user nav_icon"></i> About
              </Link>
            </li>
            <li className="nav_item">
              <Link to={"#skills"} className="nav_link">
                <i className="uil uil-file-alt nav_icon"></i> Skills
              </Link>
            </li>
            <li className="nav_item">
              <Link to={"#qualification"} className="nav_link">
                <i className="uil uil-graduation-cap nav_icon"></i>{" "}
                Qualifications
              </Link>
            </li>
            <li className="nav_item">
              <Link to={"#projects"} className="nav_link">
                <i className="uil uil-scenery nav_icon"></i> Projects
              </Link>
            </li>
            <li className="nav_item">
              <Link to={"#contact"} className="nav_link">
                <i className="uil uil-message nav-icon nav_icon"></i> Contact Me
              </Link>
            </li>
          </ul>
          <i
            className="uil uil-times nav_close"
            id="nav-close"
            onClick={toggleMenu}
          ></i>
        </div>

        <div className="nav_btns">
          <i
            className={`uil ${
              theme === "light" ? "uil-moon" : "uil-sun"
            } change-theme`}
            id="theme-button"
            onClick={toggleTheme}
          ></i>
          <div className="nav_toggle" id="nav-toggle" onClick={toggleMenu}>
            <i className="uil uil-apps"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
