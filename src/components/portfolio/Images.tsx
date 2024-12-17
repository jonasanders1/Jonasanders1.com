import React from 'react'

interface ImagesProps {
   images: {
        projectImage: string[];
    }
}

const Images: React.FC<ImagesProps> = ({images}) => {
  return (
    <img className='project__image' src={images.projectImage[0]}/>
  )
}

export default Images