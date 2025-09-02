import { useState, useEffect } from "react";
import lightLogo from "../../assets/logo-light.png";
import darkLogo from "../../assets/logo-dark.png";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [scrollHeader, setScrollHeader] = useState(false);
  
  /* ============== Change Background Header ============== */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        setScrollHeader(true);
      } else {
        setScrollHeader(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { themeName } = useTheme();

  /* ============== Menu Toggle ============== */
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>("#home");
  
  return (
    <header className={`w-full fixed top-0 left-0 z-[100] bg-body-light dark:bg-body-dark transition-shadow duration-300 lg:top-auto lg:bottom-0 ${
      scrollHeader ? "shadow-[0_-1px_4px_rgba(0,0,0,0.15)]" : ""
    }`}>
      <nav className="h-[calc(3rem+1.5rem)] flex justify-between items-center gap-4 container lg:h-[calc(3rem+2rem)]">
        <a href="#home" className="flex justify-center items-center">
          <img
            src={themeName === "light" ? lightLogo : darkLogo}
            width={30}
            alt="logo"
            className="transition-all duration-300"
          />
        </a>

        <div className={`lg:fixed lg:left-0 lg:w-full lg:px-6 lg:py-8 lg:pb-16 lg:shadow-[0_-1px_4px_rgba(0,0,0,0.15)] lg:rounded-t-3xl lg:transition-all lg:duration-300 lg:bg-body-light lg:dark:bg-body-dark ${
          isShowing ? "lg:bottom-0" : "lg:bottom-[-100%]"
        }`}>
          <ul className="flex gap-8 lg:grid lg:grid-cols-3 lg:gap-8">
            <li onClick={() => setIsShowing(false)}>
              <a
                href="#home"
                onClick={() => setActiveNav("#home")}
                className={`flex flex-col items-center text-small font-medium transition-all duration-300 ${
                  activeNav === "#home" 
                    ? "text-primary-light dark:text-primary-dark" 
                    : "text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark"
                }`}
              >
                <i className="uil uil-estate hidden lg:block text-[1.2rem]"></i>
                Home
              </a>
            </li>

            <li onClick={() => setIsShowing(false)}>
              <a
                href="#projects"
                onClick={() => setActiveNav("#projects")}
                className={`flex flex-col items-center text-small font-medium transition-all duration-300 ${
                  activeNav === "#projects"
                    ? "text-primary-light dark:text-primary-dark"
                    : "text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark"
                }`}
              >
                <i className="uil uil-scenery hidden lg:block text-[1.2rem]"></i>
                Projects
              </a>
            </li>

            <li onClick={() => setIsShowing(false)}>
              <a
                href="#skills"
                onClick={() => setActiveNav("#skills")}
                className={`flex flex-col items-center text-small font-medium transition-all duration-300 ${
                  activeNav === "#skills"
                    ? "text-primary-light dark:text-primary-dark"
                    : "text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark"
                }`}
              >
                <i className="uil uil-file-alt hidden lg:block text-[1.2rem]"></i>
                Skills
              </a>
            </li>

            <li onClick={() => setIsShowing(false)}>
              <a
                href="#qualification"
                onClick={() => setActiveNav("#qualification")}
                className={`flex flex-col items-center text-small font-medium transition-all duration-300 ${
                  activeNav === "#qualification"
                    ? "text-primary-light dark:text-primary-dark"
                    : "text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark"
                }`}
              >
                <i className="uil uil-briefcase-alt hidden lg:block text-[1.2rem]"></i>
                Qualification
              </a>
            </li>
            {/* Admin */}
            <li onClick={() => setIsShowing(false)}>
              <a 
                href="#" 
                className="flex flex-col items-center text-small font-medium transition-all duration-300 text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark" 
                onClick={() => navigate("/login")}
              >
                <i className="uil uil-file-alt hidden lg:block text-[1.2rem]"></i>
                Admin
              </a>
            </li>
            <li>
              <span className="flex flex-col items-center text-small font-medium">
                <ThemeToggle />
                <span>Theme</span>
              </span>
            </li>
          </ul>
          <i
            className="uil uil-times lg:block hidden absolute right-5 bottom-4 text-2xl cursor-pointer text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark"
            onClick={() => setIsShowing(false)}
          ></i>
        </div>

        <div className="lg:block hidden text-[1.1rem] cursor-pointer font-medium text-text-light dark:text-text-dark" onClick={() => setIsShowing(true)}>
          <i className="uil uil-apps"></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;