import React, { useState } from "react";
import Tag from "../tag/Tag";

interface TechnologyInputProps {
  technologies: string[];
  onAddTechnology: (tech: string) => void;
  onRemoveTechnology: (tech: string) => void;
  className?: string;
}

const TechnologyInput: React.FC<TechnologyInputProps> = ({
  technologies,
  onAddTechnology,
  onRemoveTechnology,
  className = "",
}) => {
  const [tag, setTag] = useState("");

  const handleAddTag = () => {
    if (tag.trim() !== "" && !technologies.includes(tag)) {
      onAddTechnology(tag);
      setTag("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className={`technology-input ${className}`}>
      <label className="technology-input__label">Technologies</label>
      <div className="technology-input__container">
        <input
          type="text"
          className="technology-input__field"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add technology (Press Enter)"
        />
        <div className="technology-input__tags">
          {technologies.map((tech, index) => (
            <Tag
              key={index}
              tech={tech}
              onClick={() => onRemoveTechnology(tech)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologyInput; 