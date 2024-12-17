import React from "react";

import { ImagesProps } from "../../types";

const Images: React.FC<ImagesProps> = ({ images }) => {
  return <img className="project__image" src={images.projectImage[0]} />;
};

export default Images;
