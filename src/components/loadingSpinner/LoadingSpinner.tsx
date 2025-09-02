import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface LoadingSpinnerProps {
  text?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "Loading...",
  size = "medium",
  className = "",
}) => {
  const sizeClasses = {
    small: "text-2xl",
    medium: "text-4xl",
    large: "text-6xl"
  };
  
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <FontAwesomeIcon 
        icon={faSpinner} 
        className={`animate-spin text-primary-light dark:text-primary-dark ${sizeClasses[size]}`} 
      />
      {text && <p className="text-text-light dark:text-text-dark">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;