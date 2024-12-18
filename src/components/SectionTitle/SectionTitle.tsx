import "./sectionTitle.css";

type SectionTitleProps = {
  title: string;
  subtitle: string;
};

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <>
      <h2 className="section__title" >{title}</h2>
      <span className="section__subtitle">{subtitle}</span>
    </>
  );
};

export default SectionTitle;
