import { useTheme } from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { themeName, toggleTheme } = useTheme();

  return (
    <button
      className={`flex items-center h-5 aspect-[2/1] rounded-full relative transition-colors duration-300 cursor-pointer lg:h-[15px] ${
        themeName === "dark" 
          ? "bg-primary-dark" 
          : "bg-primary-light"
      }`}
      onClick={() => toggleTheme()}
      aria-label="Toggle theme"
    >
      <div
        className={`w-[15px] h-[15px] rounded-full transition-all duration-300 absolute bg-body-light dark:bg-body-dark lg:w-3 lg:h-3 ${
          themeName === "dark" 
            ? "left-[calc(100%-15px-3px)] lg:left-[calc(100%-15px)]" 
            : "left-[3px] lg:left-[2px]"
        }`}
      ></div>
    </button>
  );
};

export default ThemeToggle;