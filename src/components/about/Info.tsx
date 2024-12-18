
const Info = () => {
  
  return (
    <div className="about__info grid">
      <div className="about__box">
        <i className="bx bx-award about__icon"></i>
        <h3 className="about__title">Experience</h3>
        <span className="about__subtitle">3 Years Learning</span>
      </div>

      <div className="about__box">
        <i className="bx bx-briefcase-alt about__icon"></i>
        <h3 className="about__title">Completed</h3>
        <span className="about__subtitle">48 + small projects</span>
      </div>

      <div className="about__box">
        <i className="uil uil-graduation-cap about__icon"></i>
        <h3 className="about__title">Education</h3>
        <span className="about__subtitle">Web dev / ML</span>
      </div>
    </div>
  );
};

export default Info;
