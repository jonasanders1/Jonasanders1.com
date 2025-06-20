import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface ImagePreviewProps {
  title: string;
  images: (string | File)[];
  onRemove: (index: number) => void;
  className?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  title,
  images,
  onRemove,
  className = "",
}) => {
  if (images.length === 0) return null;

  return (
    <div className={`image-preview ${className}`}>
      <h4 className="image-preview__title">{title}</h4>
      <div className="image-preview__grid">
        {images.map((image, index) => (
          <div key={index} className="image-preview__item">
            <img
              src={
                typeof image === "string"
                  ? image
                  : URL.createObjectURL(image)
              }
              alt={`${title} ${index + 1}`}
              className="image-preview__image"
            />
            <button
              type="button"
              className="image-preview__remove"
              onClick={() => onRemove(index)}
              aria-label="Remove image"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview; 