import { useState } from "react";
import { db } from "../../firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import "./projects.css";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  repoLink?: string;
  image?: string;
  onDelete?: () => void;
}

const ProjectCard = ({
  id,
  title,
  description,
  technologies,
  demoLink,
  repoLink,
  image,
  onDelete,
}: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isLoggedIn = useAuthStatus();
  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      setIsDeleting(true);
      await deleteDoc(doc(db, "projects", id));
      onDelete?.();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/editproject/${id}`);
  };

  return (
    <div className={`project__card ${isExpanded ? 'expanded' : ''}`}>
      {isLoggedIn && (
        <div className="project__actions">
          <button 
            className="project__action-button"
            onClick={handleEdit}
            aria-label="Edit project"
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button 
            className={`project__action-button ${isDeleting ? 'deleting' : ''}`}
            onClick={handleDelete}
            disabled={isDeleting}
            aria-label="Delete project"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}

      {image && (
        <div className={`project__image ${isExpanded ? 'expanded' : ''}`}>
          <img src={image} alt={title} />
          <button 
            className="project__image-expand"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse image" : "Expand image"}
          >
            <i className={`uil uil-angle-${isExpanded ? 'up' : 'down'}`}></i>
          </button>
        </div>
      )}
      
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
            <a
              href={demoLink}
              className={demoLink ? "project__link" : "project__link disabled"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Project <i className="uil uil-arrow-right"></i>
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
      </div>
    </div>
  );
};

export default ProjectCard;
