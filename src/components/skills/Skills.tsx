import SkillsBox from "./SkillsBox";
import { skillsData } from "./skillsData";
import SectionTitle from "../SectionTitle/SectionTitle";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Skills = () => {
  const navigate = useNavigate();
  return (
    <section className="section" id="skills">
      <SectionTitle 
        title="Skills" 
        subtitle="My technical level" 
        buttons={[
          {
            icon: faPlus,
            onClick: () => navigate("/addnewskill"),
            variant: "add",
          },
        ]} 
      />

      <div className="container grid grid-cols-2 gap-4 justify-center lg:grid-cols-1">
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