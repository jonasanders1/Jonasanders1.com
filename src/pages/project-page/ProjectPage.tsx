import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faCode,
  faExternalLink,
  faChevronLeft,
  faChevronRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import CustomButton from "../../components/customButton/CustomButton";
import "./projectPage.css";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useAuthStatus } from "../../hooks/useAuthStatus";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  repoLink?: string;
  images?: string[];
  image?: string;
}

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const isLoggedIn = useAuthStatus();

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;

      try {
        const projectDoc = await getDoc(doc(db, "projects", projectId));
        if (projectDoc.exists()) {
          setProject({ id: projectDoc.id, ...projectDoc.data() } as Project);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        alert("Failed to fetch project details.");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId, navigate]);

  // Reset image loading state when image changes
  // useEffect(() => {
  //   setIsImageLoading(true);
  // }, [currentImageIndex, project?.images, project?.image]);

  const handleDelete = async () => {
    if (
      !projectId ||
      !window.confirm("Are you sure you want to delete this project?")
    )
      return;

    try {
      await deleteDoc(doc(db, "projects", projectId));
      navigate("/");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Please try again.");
    }
  };

  const handleEdit = () => {
    if (!projectId) return;
    navigate(`/editproject/${projectId}`);
  };

  const handlePreviousImage = () => {
    if (!project?.images) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images!.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!project?.images) return;
    setCurrentImageIndex((prev) =>
      prev === project.images!.length - 1 ? 0 : prev + 1
    );
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  if (isLoading) {
    return (
      <div className="project-page">
        <div className="project-page__loading">
          <h2>Loading project details...</h2>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="project-page container">
      <div className="project-page__header">
        <SectionTitle
          title={project.title}
          backButton={true}
          useContainer={false}
          buttons={
            isLoggedIn
              ? [
                  {
                    icon: faPen,
                    onClick: handleEdit,
                    size: "small",
                    variant: "primary",
                    color: "var(--color-warning)",
                  },
                  {
                    icon: faTrash,
                    onClick: handleDelete,
                    size: "small",
                    variant: "primary",
                    color: "var(--color-error)",
                  },
                ]
              : []
          }
        />
      </div>

      <div className="project-page__content">
        <div className="project-page__grid">
          <div className="project-page__top-section">
            <div className="project-page__hero">
              <div className="project-page__image">
                {isImageLoading && (
                  <div className="project-page__image-loading">
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                    <span>Loading image...</span>
                  </div>
                )}
                {project.images && project.images.length > 0 ? (
                  <>
                    <img
                      src={project.images[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      loading="lazy"
                      onLoad={handleImageLoad}
                      style={{ opacity: isImageLoading ? 0 : 1 }}
                    />
                    {project.images.length > 1 && (
                      <>
                        <button
                          className="project-page__carousel-button project-page__carousel-button--prev"
                          onClick={handlePreviousImage}
                          aria-label="Previous image"
                        >
                          <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button
                          className="project-page__carousel-button project-page__carousel-button--next"
                          onClick={handleNextImage}
                          aria-label="Next image"
                        >
                          <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                        <div className="project-page__carousel-indicators">
                          {project.images.map((_, index) => (
                            <button
                              key={index}
                              className={`project-page__carousel-indicator ${
                                index === currentImageIndex ? "active" : ""
                              }`}
                              onClick={() => setCurrentImageIndex(index)}
                              aria-label={`Go to image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    onLoad={handleImageLoad}
                    style={{ opacity: isImageLoading ? 0 : 1 }}
                  />
                ) : (
                  <div className="project-page__image-placeholder">
                    <FontAwesomeIcon icon={faCode} size="3x" />
                  </div>
                )}
              </div>
            </div>

            <div className="project-page__top-content">
              <div className="project-page__technologies">
                <div className="project-page__tech-list">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="project-page__tech-item">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="project-page__description">
            <h2>About the Project</h2>
            <p>{project.description}</p>
          </div>

          <div className="project-page__links">
            {project.demoLink && (
              <CustomButton
                variant="primary"
                size="large"
                href={project.demoLink}
                icon={<FontAwesomeIcon icon={faExternalLink} />}
                isLink={true}
              >
                View Live Demo
              </CustomButton>
            )}

            {project.repoLink && (
              <CustomButton
                variant="secondary"
                size="large"
                href={project.repoLink}
                icon={<FontAwesomeIcon icon={faGithub} />}
                isLink={true}
              >
                View Source Code
              </CustomButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
