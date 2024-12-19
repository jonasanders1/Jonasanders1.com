import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomButton from "../customButton/CustomButton";
import "./footer.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer_container container">
        <h1 className="footer__title">Jonas Andersen</h1>
        <div className="footer__admin">
          <CustomButton
            title="Admin"
            isLink={false}
            size="small"
            onClick={() => navigate("/login")}
            icon={<FontAwesomeIcon icon={faUser} />}
          />
        </div>
        <ul className="footer__list">
          <li>
            <a href="#about" className="footer__link">
              About
            </a>
          </li>

          <li>
            <a href="#projects" className="footer__link">
              Projects
            </a>
          </li>

          <li>
            <a href="#home" className="footer__link">
              Home
            </a>
          </li>
        </ul>

        <div className="footer__social">
          <a
            href="https://github.com/jonasanders1"
            className="footer__social-link"
            target="_blank"
          >
            <i className="bx bxl-github"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/jonas-andersen-65a335262/"
            className="footer__social-link"
            target="_blank"
          >
            <i className="bx bxl-linkedin"></i>
          </a>

          <a href="#" className="footer__social-link" target="_blank">
            <i className="bx bxl-instagram"></i>
          </a>
        </div>
        <span className="footer__copy">
          &#169; Jonas Andersen. All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
