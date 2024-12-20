import "./projects.css";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  repoLink?: string;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  demoLink,
  repoLink,
}: ProjectCardProps) => {
  return (
    <div className="project__card">
      <h3 className="project__title">{title}</h3>

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
          Demo <i className="uil uil-arrow-right"></i>
        </a>
        <a
          href={repoLink}
          className={repoLink ? "project__link" : "project__link disabled"}
          target="_blank"
          rel="noopener noreferrer"
        >
          Code <i className="uil uil-github"></i>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
