import "./projects.css";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  repoLink?: string;
  image?: string;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  demoLink,
  repoLink,
  image,
}: ProjectCardProps) => {
  return (
    <div className="project__card">
      <div className="header__container">
        <h3 className="project__title">{title}</h3>
        {image && (
          <img src={image} alt={title} className="project__image" />
        )}
      </div>

      <p className="project__description">{description}</p>
      <div className="project__technologies">
        {technologies.map((technology, index) => (
          <span key={index} className="project__technology">
            {technology}
          </span>
        ))}
      </div>

      <div className="project__links">
        <a
          href={demoLink}
          className={demoLink ? "project__link" : "project__link disabled"}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Project <i className="uil uil-arrow-right"></i>
        </a>
        <a
          href={repoLink}
          className={repoLink ? "project__link" : "project__link disabled"}
          target="_blank"
          rel="noopener noreferrer"
        >
          Check Out Code <i className="uil uil-github"></i>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
