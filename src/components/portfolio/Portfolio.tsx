import { useState } from "react"
import "./portfolio.css"
import { projectsSets } from "./projects"
import ProjectCard from "./ProjectCard"


const Portfolio = () => {

  
  const [active, setActive] = useState("all")
  const [projects, setProjects] = useState(projectsSets.mobile.concat(projectsSets.web))




  const handleActive = (type: string) => {
      setActive(type)

      switch(type){
        case type = "all":
          const allProjects = projectsSets.mobile.concat(projectsSets.web)
          setProjects(allProjects)
          break;
        case type = "mobile":
          setProjects(projectsSets.mobile)
          break;
        case type = "web":
          setProjects(projectsSets.web)
      }
  }

  return (
    <section className="portfolio section" id="portfolio">
        <h2 className="section__title">Portfolio</h2>
        <span className="section__subtitle">The projects i have worked on</span>

        <div className="portfolio__container container grid">
            {/* Filter */}
            <div className="filter__container">
                <button className={`filter__button ${active === "all" ? "active" : ""}`} onClick={() => handleActive("all")}>All projects</button>
                <button className={`filter__button ${active === "mobile" ? "active" : ""}`} onClick={() => handleActive("mobile")}>Mobile apps</button>
                <button className={`filter__button ${active === "web" ? "active" : ""}`} onClick={() => handleActive("web")}>Web projects</button>
            </div>

            {/* Projects */}
            <div className="projects grid">
              {
                projects.map((item, index) => (
                  <ProjectCard key={index} item={item}/>
                ))
              }
            </div>

        </div>

    </section>
  )
}

export default Portfolio