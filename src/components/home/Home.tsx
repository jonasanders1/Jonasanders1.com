import Data from "./Data";
import ScrollDown from "./ScrollDown";
import Social from "./Social";

const Home = () => {
  return (
    <section className="section" id="home">
      <div className="container h-[60vh] grid grid-cols-[50px_130px_1fr] grid-rows-2 place-items-center place-content-center lg:grid-cols-3 lg:grid-rows-[50px_1fr_150px] md:h-[75vh]">
        <Social />
        <Data />
        <ScrollDown />
      </div>
    </section>
  );
};

export default Home;