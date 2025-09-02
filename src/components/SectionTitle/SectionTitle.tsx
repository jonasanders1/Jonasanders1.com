import { useAuthStatus } from "../../hooks/useAuthStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import CustomButton from "../customButton/CustomButton";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

type ButtonConfig = {
  icon: IconDefinition;
  onClick: () => void;
  variant?: "primary" | "secondary" | "add" | "text" | "outline";
  size?: "small" | "medium" | "large";
  label?: string;
  color?: string;
};

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  buttons?: ButtonConfig[];
  backButton?: boolean;
  useContainer?: boolean;
};

const SectionTitle = ({
  title,
  subtitle,
  buttons,
  backButton,
  useContainer = true,
}: SectionTitleProps) => {
  const isLoggedIn = useAuthStatus();
  const navigate = useNavigate();
  
  return (
    <div
      className={`flex justify-between items-center mb-8 ${useContainer ? "container" : ""}`}
    >
      {backButton && (
        <CustomButton
          variant="primary"
          size="small"
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </CustomButton>
      )}
      <div className="flex-1 text-center">
        <h2 className="text-[2rem] text-title-light dark:text-title-dark font-semi-bold">{title}</h2>
        {subtitle && (
          <span className="text-[1.1rem] text-text-light dark:text-text-dark opacity-80">{subtitle}</span>
        )}
      </div>

      {isLoggedIn && buttons && buttons.length > 0 && (
        <div className="flex gap-2 items-center">
          {buttons.map((button, index) => (
            <CustomButton
              key={index}
              color={button.color}
              variant={button.variant || "primary"}
              size={button.size || "small"}
              onClick={button.onClick}
            >
              <FontAwesomeIcon icon={button.icon} />
              {button.label && <span>{button.label}</span>}
            </CustomButton>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionTitle;