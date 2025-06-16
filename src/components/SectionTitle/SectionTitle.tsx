import { useAuthStatus } from "../../hooks/useAuthStatus";
import "./sectionTitle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import CustomButton from "../customButton/CustomButton";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

type ButtonConfig = {
  icon: IconDefinition;
  onClick: () => void;
  variant?: "primary" | "secondary" | "add" | "text" | "outline";
  size?: "small" | "large";
  label?: string;
  color?: string;
};

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  buttons?: ButtonConfig[];
  backButton?: boolean;
};

const SectionTitle = ({
  title,
  subtitle,
  buttons,
  backButton,
}: SectionTitleProps) => {
  const isLoggedIn = useAuthStatus();
  const navigate = useNavigate();
  return (
    <div className="section__title-container container">
      {backButton && (
        <CustomButton
          variant="primary"
          size="small"
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </CustomButton>
      )}
      <div className="section__title-container-inner">
        <h2 className="section__title">{title}</h2>
        <span className="section__subtitle">{subtitle}</span>
      </div>

      {isLoggedIn && buttons && buttons.length > 0 && (
        <div className="section__buttons-container">
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
