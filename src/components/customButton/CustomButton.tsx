import "./customButton.css";

interface CustomButtonProps {
  title: string;
  isLink: boolean;
  href?: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  isLink,
  href,
  onClick,
  icon,
  size,
}) => {
  if (isLink) {
    return (
      <a
        href={href}
        className={
          size ? `button button--${size} button--flex` : "button button--flex"
        }
      >
        {title}
        {icon && <span className="button__icon">{icon}</span>}
      </a>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className={
          size ? `button button--${size} button--flex` : "button button--flex"
        }
      >
        {title}
        {icon && <span className="button__icon">{icon}</span>}
      </button>
    );
  }
};

export default CustomButton;
