import "./customButton.css";

interface CustomButtonProps {
  title: string;
  isLink: boolean;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  isLink,
  href,
  onClick,
  icon,
}) => {
  if (isLink) {
    return (
      <a href={href} className="button button--flex">
        {title}
        {icon && <span className="button__icon">{icon}</span>}
      </a>
    );
  } else {
    return (
      <button onClick={onClick} className="button button--flex">
        {title}
        {icon && <span className="button__icon">{icon}</span>}
      </button>
    );
  }
};

export default CustomButton;
