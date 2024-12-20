import SectionTitle from "../SectionTitle/SectionTitle";
import { projectsData } from "./ProjectsData";
import ProjectCard from "./ProjectCard";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

const Projects = () => {
  const navigate = useNavigate();
  return (
    <section className="projects section" id="projects">
      <SectionTitle title="Projects" subtitle="The projects i have worked on" />

      <div className="projects__container container grid">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            technologies={project.technologies}
            demoLink={project.demoLink}
            repoLink={project.repoLink}
          />
        ))}

        <div className="project__card add-project">
          <button
            className="project__add-button"
            onClick={() => {
              if (auth.currentUser) {
                navigate("/addnewproject");
              } else {
                navigate("/login");
              }
            }}
          >
            <i className="uil uil-plus"></i>
            Add New Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
