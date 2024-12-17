import React, { useState } from "react";
import "./portfolio.css"
import Header from "./Header";
import Images from "./Images";
import Footer from "./Footer";
import Description from "./Description";

interface ProjectItem {
  id: number;
  name: string;
  image: {
    projectImage: string[]
  };
  description: string;
  githubLink: string;
  previewLink: string;
  icon: string;
  language: string
  color: string
}


const ProjectCard: React.FC<{item : ProjectItem}> = ({item}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  // state for keeping track of the current image[index]
  // const[imageIndex, setImageIndex] = useState(0)

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  

  return (
    <div className="project__card">
        <div className="project__content">
          <Header name={item.name} icon={item.icon} language={item.language} color={item.color}/>
          <Images images={item.image}/>
          <Description description={item.description}/>
          <button onClick={openModal} className="read-more__button">Read more...</button>

          {isModalOpen && (
            <div className={`modal ${isModalOpen ? 'active' : ''}`}>
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  <i className='bx bx-x close-icon'></i>
                </span>
                <p>{item.description}</p>
              </div>
            </div>
          )}

        </div>
        <Footer previewLink={item.previewLink} githubLink={item.githubLink}/>
        
     </div>
  )
}

export default ProjectCard