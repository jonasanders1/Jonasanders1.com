import { useState } from "react";
import "./qualification.css";
import { qualificationData } from "./qualificationData";
import { QualificationItem } from "../../types";
import SectionTitle from "../SectionTitle/SectionTitle";

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const renderQualificationData = (type: "education" | "experience") => {
    return qualificationData
      .filter((item) => item.type === type)
      .map((item: QualificationItem, index: number) => (
        <div
          className={`qualification__data ${
            index % 2 === 0
              ? "qualification__data-left"
              : "qualification__data-right"
          }`}
          key={item.id}
        >
          <div>
            <h3 className="qualification__title">{item.title}</h3>
            <span className="qualification__subtitle">{item.subtitle}</span>
            <div className="qualification__calender">
              <i className="uil uil-calendar-alt"></i> {item.calendar}
            </div>
          </div>
          <div>
            <span className="qualification__rounder"></span>
            <span className="qualification__line"></span>
          </div>
        </div>
      ));
  };

  return (
    <section className="qualification section" id="qualification">
      <SectionTitle title="Qualification" subtitle="My personal journey" />

      <div className="qualification__container container">
        <div className="qualification__tabs">
          <div
            onClick={() => toggleTab(1)}
            className={
              toggleState === 1
                ? "qualification__button qualification__active button--flex"
                : "qualification__button button--flex"
            }
          >
            <i className="uil uil-graduation-cap qualification__icon"></i>
            Education
          </div>

          <div
            onClick={() => toggleTab(2)}
            className={
              toggleState === 2
                ? "qualification__button qualification__active button--flex"
                : "qualification__button button--flex"
            }
          >
            <i className="uil uil-briefcase-alt qualification__icon"></i>
            Experience
          </div>
        </div>

        <div className="qualification__sections">
          <div
            className={
              toggleState === 1
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            {renderQualificationData("education")}
          </div>

          <div
            className={
              toggleState === 2
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            {renderQualificationData("experience")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
