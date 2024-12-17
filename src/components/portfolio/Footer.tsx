import React from "react";
import { FooterProps } from "../../types";

const Footer: React.FC<FooterProps> = ({ previewLink, githubLink }) => {
  return (
    <div className="project__footer">
      {githubLink !== "" && (
        <a href={githubLink} target="_blank" className="project__button">
          <i className="bx bx-code-alt image-button"></i>
          <span>code</span>
        </a>
      )}
      {githubLink === "" && (
        <a className="disabled__button">
          <i className="bx bx-code-alt image-button"></i>
          <span>code</span>
        </a>
      )}

      {previewLink !== "" ? (
        <a href={previewLink} target="_blank" className="project__button">
          <i className="bx bx-right-arrow-alt"></i>
          <span>demo</span>
        </a>
      ) : (
        <a className="disabled__button">
          <i className="bx bx-right-arrow-alt"></i>
          <span>demo</span>
        </a>
      )}
    </div>
  );
};

export default Footer;
