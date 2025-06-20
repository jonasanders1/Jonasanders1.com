import Data from "./Data";
import ScrollDown from "./ScrollDown";
import Social from "./Social";
import "./home.css";

const Home = () => {
  return (
    <section className="home section" id="home">
      <div className="home__container container grid">
        {/* <div className="home__content grid"> */}
          <Social />
          <Data />
          <ScrollDown />
        {/* </div> */}
      </div>
    </section>
  );
};

export default Home;
