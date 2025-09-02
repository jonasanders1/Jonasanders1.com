import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import {
  faPen,
  faTrash,
  faCode,
  faExternalLink,
  faChevronLeft,
  faChevronRight,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import CustomButton from "../../components/customButton/CustomButton";

import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import Tag from "../../components/tag/Tag";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  repoLink?: string;
  images?: string[];
  image?: string;
  createdAt?: Date;
}

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[]>(
    []
  );
  const isLoggedIn = useAuthStatus();

  // Helper function to format date
  const formatDate = (dateValue: any): string => {
    try {
      const date = dateValue?.toDate?.() || new Date(dateValue);
      return isNaN(date.getTime()) ? 'Invalid Date' : 
        date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return 'Invalid Date';
    }
  };

  // Preload all images
  const preloadImages = async (imageUrls: string[]) => {
    const imagePromises = imageUrls.map((url) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
      });
    });

    try {
      const images = await Promise.all(imagePromises);
      setPreloadedImages(images);
      setIsImageLoading(false);
    } catch (error) {
      console.error("Error preloading images:", error);
      setIsImageLoading(false);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;

      try {
        const projectDoc = await getDoc(doc(db, "projects", projectId));
        if (projectDoc.exists()) {
          const projectData = {
            id: projectDoc.id,
            ...projectDoc.data(),
          } as Project;
          setProject(projectData);

          // Preload images if they exist
          if (projectData.images && projectData.images.length > 0) {
            setIsImageLoading(true);
            await preloadImages(projectData.images);
          } else if (projectData.image) {
            // Single image case
            setIsImageLoading(true);
            await preloadImages([projectData.image]);
          } else {
            setIsImageLoading(false);
          }
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

  if (isLoading) {
    return (
      <div className="project-page">
        <div className="project-page__loading">
          <LoadingSpinner text="Loading project details..." size="large" />
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
          title=""
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
        {/* Hero Image */}
        <div className="project-page__hero">
          <div className="project-page__image">
            {isImageLoading && (
              <div className="project-page__image-loading">
                <LoadingSpinner size="small" text="Loading images..." />
              </div>
            )}
            {project.images && project.images.length > 0 ? (
              <>
                <img
                  src={preloadedImages[currentImageIndex]?.src || project.images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
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
                src={preloadedImages[0]?.src || project.image}
                alt={project.title}
                style={{ opacity: isImageLoading ? 0 : 1 }}
              />
            ) : (
              <div className="project-page__image-placeholder">
                <FontAwesomeIcon icon={faCode} size="3x" />
                <p>No image available</p>
              </div>
            )}
          </div>
        </div>

        {/* Project Content */}
        <div className="project-page__content-wrapper">
          {/* Project Header */}
          <div className="project-page__header-section">
            <h1 className="project-page__project-title">{project.title}</h1>
            {project.createdAt && (
              <div className="project-page__project-date">
                <span><FontAwesomeIcon icon={faCalendar} color="var(--color-primary)" /> {formatDate(project.createdAt)}</span>
              </div>
            )}
          </div>
         
          {/* Technologies */}
          <div className="project-page__technologies-section">
          
            <div className="project-page__tech-list">
              {project.technologies.map((tech, index) => (
                <Tag key={index} tech={tech} />
              ))}
            </div>
          </div>

          {/* Project Description */}
          <div className="project-page__description-section">
            <h2 className="project-page__description-title">
              About the Project
            </h2>
            <p className="project-page__description-text">
              {project.description}
            </p>
          </div>

          <div className="project-page__project-links">
            {project.demoLink && (
              <CustomButton
                variant="secondary"
                size="small"
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
                size="small"
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
