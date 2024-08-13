import "./Home.css";
import Hero from "../Sections/Hero";
import Education from "../Sections/Education";
import Projects from "../Sections/Projects";

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <Education />
      <Projects />
    </div>
  );
};

export default Home;
