import React from "react"

interface HeaderProps {
    name: string
    icon: string
    language: string
    color: string
}



const Header: React.FC<HeaderProps> = ({name, icon, language, color}) => {
  return (
    <div className="header__container">
      <h3>{name}</h3>

      <div className="programming__language" style={{color: color}}>
        <p>{language}</p>
        <i className={`bx bxl-${icon}`}></i>
      </div>
      
    </div>
  )
}

export default Header