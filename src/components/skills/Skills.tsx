import SkillsBox from "./SkillsBox";
import { skillsData } from "./skillsData";
import "./skills.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Skills = () => {
  const navigate = useNavigate();
  return (
    <section className="skills section" id="skills">
      <SectionTitle title="Skills" subtitle="My technical level" buttons={[
        {
          icon: faPlus,
          onClick: () => navigate("/addnewskill"),
          variant: "add",
        },
      ]} />

      <div className="skills__container container grid">
        {skillsData.map((category, index) => (
          <SkillsBox
            key={index}
            title={category.category}
            skills={category.skills}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;
