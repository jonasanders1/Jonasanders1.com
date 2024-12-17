import { useState } from "react";
import "./header.css";

const Header = () => {
  /* ============== Change Background Header ============== */
  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header");
    if (this.scrollY >= 80) {
      header?.classList.add("scroll-header");
    } else {
      header?.classList.remove("scroll-header");
    }
  });

  /* ============== Menu Toggle ============== */
  const [isShowing, setIsShowing] = useState<Boolean>(false);
  const [activeNav, setActiveNav] = useState<string>("#home");
  return (
    <header className="header">
      <nav className="nav container">
        <a href="index.html" className="nav__logo">
          Jonas Andersen
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
                href="#about"
                onClick={() => setActiveNav("#about")}
                className={
                  activeNav === "#about" ? "nav__link active-link" : "nav__link"
                }
              >
                <i className="uil uil-user nav__icon"></i>
                About
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
                href="#services"
                onClick={() => setActiveNav("#services")}
                className={
                  activeNav === "#services"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                <i className="uil uil-briefcase-alt nav__icon"></i>
                Services
              </a>
            </li>

            <li className="nav__item" onClick={() => setIsShowing(false)}>
              <a
                href="#portfolio"
                onClick={() => setActiveNav("#portfolio")}
                className={
                  activeNav === "#portfolio"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                <i className="uil uil-scenery nav__icon"></i>
                Portfolio
              </a>
            </li>

            <li className="nav__item" onClick={() => setIsShowing(false)}>
              <a
                href="#contact"
                onClick={() => setActiveNav("#contact")}
                className={
                  activeNav === "#contact"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                <i className="uil uil-message nav__icon"></i>
                Contact
              </a>
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
