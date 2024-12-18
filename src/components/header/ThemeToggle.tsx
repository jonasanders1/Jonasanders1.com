import "./themeToggle.css";
import { useTheme } from "../../hooks/useTheme";
// interface ThemeToggleProps {
//   toggleTheme: () => void;
// }

const ThemeToggle = () => {
  const { themeName, toggleTheme } = useTheme();

  return (
    <button
      className={
        themeName === "dark"
          ? "switch-container dark-mode nav__item"
          : "switch-container nav__item"
      }
      onClick={() => toggleTheme()}
    >
      <div
        className={themeName === "dark" ? "switch dark-mode" : "switch"}
      ></div>
    </button>
  );
};

export default ThemeToggle;
