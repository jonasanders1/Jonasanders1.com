import SkillsBox from "./SkillsBox";
import { skillsData } from "./skillsData";
import "./skills.css";
import SectionTitle from "../SectionTitle/SectionTitle";

const Skills = () => {
  return (
    <section className="skills section" id="skills">
      <SectionTitle title="Skills" subtitle="My technical level" button={true} buttonPath="/addnewskill" />

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
