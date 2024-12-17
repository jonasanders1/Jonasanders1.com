import "./Skills.css";
import SkillsBox from "./SkillsBox";
import { skillsData } from "./skillsData"; 

const Skills = () => {
  return (
    <section className="skills section" id="skills">
      <h2 className="section__title">Skills</h2>
      <span className="section__subtitle">My technical level</span>

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
