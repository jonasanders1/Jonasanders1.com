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
  isHighlighted?: boolean;
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

      // Sort projects to show highlighted ones first
      const sortedProjects = projectsList.sort((a, b) => {
        if (a.isHighlighted && !b.isHighlighted) return -1;
        if (!a.isHighlighted && b.isHighlighted) return 1;
        return 0;
      });

      setProjects(sortedProjects);
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
    <section className="section" id="projects">
      <SectionTitle
        title="Projects"
        subtitle="A collection of my work"
        buttons={[
          {
            icon: faPlus,
            onClick: () => navigate("/addproject"),
            variant: "add",
            label: "Add Project",
          },
        ]}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-light dark:border-primary-dark border-t-transparent"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="container text-center py-16">
          <p className="text-lg text-text-light dark:text-text-dark mb-8">
            No projects available yet.
          </p>
        </div>
      ) : (
        <div className="container grid grid-cols-2 gap-6 justify-center xl:grid-cols-1 xl:gap-8 lg:gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              demoLink={project.demoLink}
              repoLink={project.repoLink}
              isHighlighted={project.isHighlighted}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;