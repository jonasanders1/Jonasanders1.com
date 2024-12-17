import React from "react";
import "./SkillsBox.css";

interface Skill {
  skill_title: string;
  skill_level: string;
  skill_icon: string;
}

interface SkillsBoxProps {
  title: string; // Frontend, Backend, etc.
  skills: Skill[];
}

const SkillsBox: React.FC<SkillsBoxProps> = ({ title, skills }) => {
  return (
    <div className="skills__content">
      <h3 className="skills__title">{title}</h3>
      <div className="skills__grid">
        {skills.map((skill, index) => (
          <div className="skills__data" key={index}>
            <i className={`bx bxl-${skill.skill_icon}`}></i>
            <div>
              <h3 className="skills__name">{skill.skill_title}</h3>
              <span className="skills__level">{skill.skill_level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsBox;
