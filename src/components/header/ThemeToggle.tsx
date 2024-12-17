import "./themeToggle.css";
// import { useTheme } from "../../contexts/ThemeContext";
interface ThemeToggleProps {
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  // const { themeName, theme } = useTheme();

  return (
    <button
      // className={
      //   themeName === "dark" ? "switch-container dark-mode" : "switch-container"
      // }
      className="switch-container nav__item"
      // style={{ backgroundColor: theme.primary }}
      onClick={toggleTheme}
    >
      <div
        // className={themeName === "dark" ? "switch dark-mode" : "switch"}
        className="switch"
      ></div>
    </button>
  );
};

export default ThemeToggle;
