import "./customButton.css";

interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'add';
  size?: 'small' | 'large';
  icon?: React.ReactNode;
  isLink?: boolean;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
  color?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  size = 'small',
  color,
  icon,
  isLink,
  href,
  disabled,
  onClick,
  isLoading,
  children,
}) => {
  const baseClass = `button button--${variant} button--${size}${icon ? ' button--icon' : ''}`;
  const isDisabled = disabled || isLoading || (isLink && !href);

  if (isLink && href) {
    return (
      <a href={href} className={baseClass} target="_blank" rel="noopener noreferrer">
        {icon && <span className="button__icon">{icon}</span>}
        <span className="button__text">{children}</span>
      </a>
    );
  }

  return (
    <button
      className={baseClass}
      onClick={onClick}
      disabled={isDisabled}
      style={{ backgroundColor: color }}
    >
      {icon && <span className="button__icon">{icon}</span>}
      <span className="button__text">
        {isLoading ? "Loading..." : children}
      </span>
    </button>
  );
};

export default CustomButton;
