import { useEffect, useState } from "react";

const ScrollUp = () => {
  const [showScroll, setShowScroll] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 560) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a 
      href="#" 
      className={`fixed right-8 z-[10] p-2 rounded-lg bg-primary-light dark:bg-primary-dark opacity-80 transition-all duration-400 hover:bg-hover-light dark:hover:bg-hover-dark ${
        showScroll ? "bottom-12" : "bottom-[-20%]"
      }`}
    >
      <i className="uil uil-arrow-up text-2xl text-button-text-light dark:text-button-text-dark"></i>
    </a>
  );
};

export default ScrollUp;