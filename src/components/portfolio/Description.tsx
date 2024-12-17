import React from 'react'

interface DescriptionProps {
    description: string;
}

const Description: React.FC<DescriptionProps> = ({description}) => {
  
  const words = description.split(" ")
  const shortedDescription = words.slice(0, 10).join(" ")



  return (
    <div className='project__description'>
      <p>{shortedDescription}...</p>
    </div>
  )
}

export default Description