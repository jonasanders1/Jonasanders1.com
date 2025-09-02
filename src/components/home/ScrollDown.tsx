import { CSSProperties } from "react";

const ScrollDown: React.FC<CSSProperties> = () => {
  return (
    <div className="col-start-2 col-end-3 row-start-2 row-end-3 lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4 lg:justify-self-center lg:self-center md:col-span-2 md:justify-self-start">
      <a href="#projects" className="flex items-center text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors">
        <svg
          width="32px"
          height="32px"
          className="home__scroll-mouse"
          viewBox="0 0 247 390"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 1.5,
          }}
        >
          <path
            className="animate-[scroll_2s_ease_infinite]"
            d="M123.359,79.775l0,72.843"
            style={{
              strokeWidth: "20px",
              stroke: "currentColor",
            }}
          ></path>
          <path
            id="mouse"
            className="mouse"
            d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
            style={{
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "20px",
            }}
          ></path>
        </svg>
        <span className="font-medium mr-1 ml-[2px] transition-colors text-small">Scroll down</span>
      </a>
    </div>
  );
};

export default ScrollDown;