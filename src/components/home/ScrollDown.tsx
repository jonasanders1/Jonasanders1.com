import { CSSProperties } from "react";

const ScrollDown: React.FC<CSSProperties> = () => {
  return (
    <div className="home__scroll">
      <a href="#projects" className="home__scroll-button">
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
            className="wheel"
            d="M123.359,79.775l0,72.843"
            style={{
              strokeWidth: "20px",
              stroke: "var(--color-text)",
            }}
          ></path>
          <path
            id="mouse"
            className="mouse"
            d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
            style={{
              fill: "none",
              stroke: "var(--color-text)",
              strokeWidth: "20px",
            }}
          ></path>
        </svg>
        <span className="home__scroll-name">Scroll down</span>
      </a>
    </div>
  );
};

export default ScrollDown;
