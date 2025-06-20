import React from "react";
import "./loadingSpinner.css";
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
  return (
    <div className={`loading-spinner loading-spinner--${size} ${className}`}>
      {/* <div className="loading-spinner__circle"></div> */}
      <FontAwesomeIcon icon={faSpinner} className="loading-spinner__icon" />
      {text && <p className="loading-spinner__text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner; 