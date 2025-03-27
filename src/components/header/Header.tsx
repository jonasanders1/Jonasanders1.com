import { useState } from "react";
import "./header.css";
import lightLogo from "../../assets/logo-light.png";
import darkLogo from "../../assets/logo-dark.png";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
// import ThemeToggle from "./ThemeToggle";
const Header = () => {
  const navigate = useNavigate();
  /* ============== Change Background Header ============== */
  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header");
    if (this.scrollY >= 80) {
      header?.classList.add("scroll-header");
    } else {
      header?.classList.remove("scroll-header");
    }
  });

  const { themeName } = useTheme();

  /* ============== Menu Toggle ============== */
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>("#home");
  return (
    <header className="header">
      <nav className="nav container">
        <a href="#home" className="nav__logo">
          <img
            src={themeName === "light" ? lightLogo : darkLogo}
            width={30}
            alt="logo"
          />
        </a>

        <div className={isShowing ? "nav__menu show-menu" : "nav__menu"}>
          <ul className="nav__list grid">
            <li className="nav__item" onClick={() => setIsShowing(false)}>
              <a
                href="#home"
                onClick={() => setActiveNav("#home")}
                className={
                  activeNav === "#home" ? "nav__link active-link" : "nav__link"
                }
              >
                <i className="uil uil-estate nav__icon"></i>
                Home
              </a>
            </li>

            <li className="nav__item" onClick={() => setIsShowing(false)}>
              <a
                href="#projects"
                onClick={() => setActiveNav("#projects")}
                className={
                  activeNav === "#projects"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                <i className="uil uil-scenery nav__icon"></i>
                Projects
              </a>
            </li>

            <li className="nav__item" onClick={() => setIsShowing(false)}>
              <a
                href="#skills"
                onClick={() => setActiveNav("#skills")}
                className={
                  activeNav === "#skills"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                <i className="uil uil-file-alt nav__icon"></i>
                Skills
              </a>
            </li>

            <li className="nav__item" onClick={() => setIsShowing(false)}>
              <a
                href="#qualification"
                onClick={() => setActiveNav("#qualification")}
                className={
                  activeNav === "#qualification"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                <i className="uil uil-briefcase-alt nav__icon"></i>
                Qualification
              </a>
            </li>
            {/* Admin */}
            <li className="nav__item" onClick={() => setIsShowing(false)}>
              <a href="#" className="nav__link" onClick={() => navigate("/login")}>
                <i className="uil uil-file-alt nav__icon"></i>
                Admin
              </a>
            </li>
            <li className="nav__item toggle-theme">
              <span className="nav__link toggle-theme-container">
                <ThemeToggle />
                <span className="toggle-theme-text">Theme</span>
              </span>
            </li>
          </ul>
          <i
            className="uil uil-times nav__close"
            onClick={() => setIsShowing(false)}
          ></i>
        </div>

        <div className="nav__toggle" onClick={() => setIsShowing(true)}>
          <i className="uil uil-apps"></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
