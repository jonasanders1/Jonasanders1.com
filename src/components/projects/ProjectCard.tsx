import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
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
    <div 
      className={`
        relative rounded-[1.25rem] overflow-hidden bg-container-light dark:bg-container-dark
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]
        flex flex-col border border-border-light dark:border-border-dark
        transition-all duration-300 ease-in-out cursor-pointer
        hover:transform hover:-translate-y-1 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]
        group
        ${isHighlighted ? 'border-2 border-primary-light dark:border-primary-dark' : ''}
      `}
      onClick={handleView}
    >
      {isHighlighted && (
        <div className="absolute top-0 left-0 bg-primary-light dark:bg-primary-dark text-button-text-light dark:text-button-text-dark px-3 py-1 rounded-br-[2rem] text-smaller font-semibold uppercase tracking-[0.5px] z-10">
          Featured
        </div>
      )}
      
      <div className="p-7 flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-h2 font-bold transition-all duration-300 ease-in-out leading-tight flex-1 group-hover:text-primary-light dark:group-hover:text-primary-dark">
            {title}
          </h3>
          <FontAwesomeIcon 
            icon={faArrowRight} 
            className="opacity-0 transition-all duration-300 ease-in-out text-primary-light dark:text-primary-dark ml-2 group-hover:opacity-100 group-hover:translate-x-1" 
          />
        </div>
        
        <p className="text-normal text-text-light dark:text-text-dark overflow-hidden line-clamp-3">
          {description}
        </p>

        <div className="flex flex-col gap-4 mt-auto">
          <div className="flex flex-wrap gap-2">
            {technologies.map((technology, index) => (
              <Tag key={index} tech={technology} />
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
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