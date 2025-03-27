import { useAuthStatus } from "../../hooks/useAuthStatus";
import "./sectionTitle.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type SectionTitleProps = {
  title: string;
  subtitle: string;
  button?: boolean;
  buttonPath?: string;
  navigateBack?: boolean;
}

const SectionTitle = ({ title, subtitle, button, buttonPath, navigateBack }: SectionTitleProps) => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStatus();
  return (
    <div className="section__title-container container">
      {isLoggedIn && button && buttonPath && navigateBack && (
        <button className="section__button--admin" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}

      <div className="section__title-container-inner">
        <h2 className="section__title">{title}</h2>
        <span className="section__subtitle">{subtitle}</span>
      </div>

      {isLoggedIn && button && buttonPath && !navigateBack && (
        <button className="section__button" onClick={() => navigate(buttonPath)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
    </div>
  );
};

export default SectionTitle;
