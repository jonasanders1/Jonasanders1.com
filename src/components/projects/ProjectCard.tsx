import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./projects.css";
import { useNavigate } from "react-router-dom";
import CustomButton from "../customButton/CustomButton";
import Tag from "../tag/Tag";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  repoLink?: string;
  isHighlighted?: boolean;
}

const ProjectCard = ({
  id,
  title,
  description,
  technologies,
  demoLink,
  repoLink,
  isHighlighted = false,
}: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/project/${id}`);
  };

  return (
    <div className={`project__card ${isHighlighted ? 'highlighted' : ''}`} onClick={handleView}>
      <div className="project__content">
        <div className="project__title-container">
          <h3 className="project__title">{title}</h3>
          <FontAwesomeIcon icon={faArrowRight} className="project__arrow" />
        </div>
        <p className="project__description">{description}</p>

        <div className="project__footer">
          <div className="project__technologies">
            {technologies.map((technology, index) => (
              <Tag key={index} tech={technology} />
            ))}
          </div>
          <div className="project__links">
            {demoLink && (
              <CustomButton
                variant="primary"
                size="small"
                href={demoLink}
                icon={<FontAwesomeIcon icon={faExternalLink} />}
                isLink={true}
              >
                Live Demo
              </CustomButton>
            )}

            {repoLink && (
              <CustomButton
                variant="primary"
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
