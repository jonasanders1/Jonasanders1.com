import { useState, useEffect } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import ProjectCard from "./ProjectCard";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

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

  if (isLoading) {
    return (
      <section className="projects section" id="projects">
        <SectionTitle title="Projects" subtitle="Loading projects..." />
      </section>
    );
  }

  return (
    <section className="projects section" id="projects">
      <SectionTitle
        title="Projects"
        subtitle="The projects I have worked on"
        button={true}
        buttonPath="/addproject"
      />

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
            image={project.image}
            onDelete={fetchProjects}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
