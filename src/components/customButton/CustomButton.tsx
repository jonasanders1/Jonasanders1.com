interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'add';
  size?: 'small' | 'medium' | 'large';
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
  const isDisabled = disabled || isLoading || (isLink && !href);
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-5 py-2.5 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  const variantClasses = {
    primary: 'bg-button-light dark:bg-button-dark text-button-text-light dark:text-button-text-dark hover:bg-hover-light dark:hover:bg-hover-dark',
    secondary: 'bg-container-light dark:bg-container-dark text-text-light dark:text-text-dark border border-border-light dark:border-border-dark hover:bg-body-light dark:hover:bg-body-dark',
    outline: 'bg-transparent border-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark hover:bg-primary-light dark:hover:bg-primary-dark hover:text-button-text-light dark:hover:text-button-text-dark',
    text: 'bg-transparent text-primary-light dark:text-primary-dark hover:underline',
    add: 'bg-success text-white hover:bg-opacity-90'
  };
  
  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${
    isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  }`;

  if (isLink && href) {
    return (
      <a 
        href={href} 
        className={baseClasses} 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={(e) => isDisabled && e.preventDefault()}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button
      className={baseClasses}
      onClick={onClick}
      disabled={isDisabled}
      style={color ? { backgroundColor: color } : undefined}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>
        {isLoading ? "Loading..." : children}
      </span>
    </button>
  );
};

export default CustomButton;