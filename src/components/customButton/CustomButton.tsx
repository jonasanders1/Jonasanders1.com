import "./customButton.css";

interface CustomButtonProps {
  title: string;
  isLink: boolean;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  title,
  isLink,
  href,
  isLoading,
  disabled,
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
        type={type}
        onClick={onClick}
        className={
          size ? `button button--${size} button--flex` : "button button--flex"
        }
        disabled={isLoading || disabled}
      >
        {isLoading ? "Loading..." : title}
        {icon && <span className="button__icon">{icon}</span>}
      </button>
    );
  }
};

export default CustomButton;
