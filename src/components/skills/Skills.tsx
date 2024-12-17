// import Backend from "./Backend";
// import Frontend from "./Frontend";

// import "./skills.css";
import SkillsBox from "./SkillsBox";
import skillsJSON from "./skills.json";
import "./SkillsBox.css";

type Skill = {
  skill_title: string;
  skill_level: string;
  skill_icon: string;
};

type SkillCategory = {
  [key: string]: Skill[] | undefined;
};

const Skills = () => {
  const skillsData: SkillCategory[] = skillsJSON as SkillCategory[];

  return (
    <section className="skills section" id="skills">
      <h2 className="section__title">Skills</h2>
      <span className="section__subtitle">My technical level</span>

      <div className="skills__container container grid">
        {skillsData.map((category, index) => {
          const categoryName = Object.keys(category)[0];
          const skills = category[categoryName];
          return skills ? (
            <SkillsBox key={index} title={categoryName} skills={skills} />
          ) : null;
        })}
      </div>
    </section>
  );
};

export default Skills;
