import React from "react";
import { SkillsBoxProps } from "../../types";

const SkillsBox: React.FC<SkillsBoxProps> = ({ title, skills }) => {
  return (
    <div className="flex-1 min-w-[300px] border border-border-light dark:border-border-dark p-8 rounded-[1.25rem] bg-container-light dark:bg-container-dark md:p-4">
      <h3 className="text-normal font-medium text-center mb-6 transition-colors text-title-light dark:text-title-dark">
        {title}
      </h3>
      <div className="flex justify-center flex-wrap gap-6">
        {skills.map((skill, index) => (
          <div className="flex items-center gap-2 p-2" key={index}>
            <i className={`bx bxl-${skill.skillIcon} text-[2rem] text-primary-light dark:text-primary-dark`}></i>
            <div>
              <h3 className="text-normal font-medium leading-[18px] transition-colors text-title-light dark:text-title-dark">
                {skill.skillTitle}
              </h3>
              <span className="text-tiny transition-colors text-text-light dark:text-text-dark">
                {skill.skillLevel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsBox;