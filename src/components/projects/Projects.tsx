import { useState, useEffect } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import ProjectCard from "./ProjectCard";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  repoLink: string;
  image?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const fetchProjects = async () => {
    try {
      const projectsQuery = query(
        collection(db, "projects"),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(projectsQuery);
      const projectsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];

      setProjects(projectsList);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="projects section" id="projects">
      <SectionTitle
        title="Projects"
        subtitle="The projects I have worked on"
        buttons={[
          {
            icon: faPlus,
            onClick: () => navigate("/addproject"),
            variant: "add",
          },
        ]}
      />

      {isLoading ? (
        <div className="projects__container container grid">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="project__card skeleton">
              <div className="project__content">
                <div className="skeleton-title"></div>
                <div className="skeleton-description"></div>
                <div className="skeleton-description"></div>
                <div className="skeleton-description"></div>
                <div className="project__technologies">
                  {[1, 2, 3].map((techIndex) => (
                    <div key={techIndex} className="skeleton-tech"></div>
                  ))}
                </div>
                <div className="skeleton-links">
                  <div className="skeleton-button"></div>
                  <div className="skeleton-button"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="projects__container container grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              demoLink={project.demoLink}
              repoLink={project.repoLink}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
