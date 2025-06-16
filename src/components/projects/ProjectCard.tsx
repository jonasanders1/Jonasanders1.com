import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./projects.css";
import { useNavigate } from "react-router-dom";
import CustomButton from "../customButton/CustomButton";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  repoLink?: string;
}

const ProjectCard = ({
  id,
  title,
  description,
  technologies,
  demoLink,
  repoLink,
}: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/project/${id}`);
  };

  return (
    <div className="project__card" onClick={handleView}>
      <div className="project__content">
        <h3 className="project__title">{title}</h3>
        <p className="project__description">{description}</p>

        <div className="project__footer">
          <div className="project__technologies">
            {technologies.map((technology, index) => (
              <span key={index} className="project__technology">
                {technology}
              </span>
            ))}
          </div>
          <div className="project__links">
            {demoLink && (
              <CustomButton
                variant="secondary"
                size="small"
                href={demoLink}
                icon={<FontAwesomeIcon icon={faArrowRight} />}
                isLink={true}
              >
                Live Demo
              </CustomButton>
            )}
            
            {repoLink && (
              <CustomButton
                variant="secondary"
                size="small"
                href={repoLink}
                icon={<FontAwesomeIcon icon={faGithub} />}
                isLink={true}
              >
                GitHub
              </CustomButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
