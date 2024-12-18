import "./about.css";
import AboutImg from "../../assets/about.png";
import CV from "../../assets/Jonas-Andersen.pdf";
import Info from "./Info";
import SectionTitle from "../SectionTitle/SectionTitle";
import CustomButton from "../customButton/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
const About = () => {
  return (
    <section className="about section" id="about">
      <SectionTitle title="About me" subtitle="My Introduction" />

      <div className="about__container container grid">
        <img src={AboutImg} alt="" className="about__img" />
        <div className="about__data">
          <Info />
          <p className="about__description">
            Passionate about blending design and technology to create intuitive
            and efficient digital solutions.
          </p>

          <CustomButton
            title="Review my CV"
            isLink={false}
            onClick={() => window.open(CV, "_blank")}
            icon={<FontAwesomeIcon icon={faFileLines} />}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
