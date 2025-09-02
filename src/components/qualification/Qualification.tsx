import { useState } from "react";
import { qualificationData } from "./qualificationData";
import { QualificationItem } from "../../types";
import SectionTitle from "../SectionTitle/SectionTitle";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Qualification = () => {
  const navigate = useNavigate();
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const renderQualificationData = (type: "education" | "experience") => {
    return qualificationData
      .filter((item) => item.type === type)
      .map((item: QualificationItem, index: number) => (
        <div
          className={`grid grid-cols-[1fr_max-content_1fr] gap-6 ${
            index % 2 === 1 ? "rtl" : ""
          }`}
          key={item.id}
        >
          <div className={index % 2 === 1 ? "ltr" : ""}>
            <h3 className="text-normal font-medium text-title-light dark:text-title-dark">
              {item.title}
            </h3>
            <span className="inline-block text-smaller text-text-light dark:text-text-dark mb-4">
              {item.subtitle}
            </span>
            <div className="flex items-center gap-1 text-smaller text-text-light dark:text-text-dark">
              <i className="uil uil-calendar-alt"></i> {item.calendar}
            </div>
          </div>
          <div>
            <span className="inline-block w-[13px] h-[13px] bg-primary-light dark:bg-primary-dark rounded-full"></span>
            {index !== qualificationData.filter(d => d.type === type).length - 1 && (
              <span className="block w-[1px] h-full bg-primary-light dark:bg-primary-dark translate-x-[6px]"></span>
            )}
          </div>
          <div></div>
        </div>
      ));
  };

  return (
    <section className="section mb-12" id="qualification">
      <SectionTitle 
        title="Qualification" 
        subtitle="My personal journey" 
        buttons={[
          {
            icon: faPlus,
            onClick: () => navigate("/addnewqualification"),
            variant: "add",
          },
        ]} 
      />

      <div className="container max-w-container">
        <div className="flex justify-center mb-8">
          <div
            onClick={() => toggleTab(1)}
            className={`text-h3 font-medium mx-4 cursor-pointer flex items-center transition-colors ${
              toggleState === 1
                ? "text-primary-light dark:text-primary-dark"
                : "text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark"
            }`}
          >
            <i className="uil uil-graduation-cap text-[1.8rem] mr-1"></i>
            Education
          </div>

          <div
            onClick={() => toggleTab(2)}
            className={`text-h3 font-medium mx-4 cursor-pointer flex items-center transition-colors ${
              toggleState === 2
                ? "text-primary-light dark:text-primary-dark"
                : "text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark"
            }`}
          >
            <i className="uil uil-briefcase-alt text-[1.8rem] mr-1"></i>
            Experience
          </div>
        </div>

        <div className="grid grid-cols-[0.5fr] justify-center">
          <div
            className={toggleState === 1 ? "block" : "hidden"}
          >
            {renderQualificationData("education")}
          </div>

          <div
            className={toggleState === 2 ? "block" : "hidden"}
          >
            {renderQualificationData("experience")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;