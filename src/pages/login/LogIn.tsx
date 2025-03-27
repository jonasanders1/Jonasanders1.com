import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { handleGithubSignIn, handleGithubSignOut } from "../../firebaseConfig";

import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import CustomButton from "../../components/customButton/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./logIn.css";
import { useState } from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";


const LogIn = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStatus();
  const [loginFailed, setLoginFailed] = useState(false);

  const signInWithGithub = () => handleGithubSignIn(navigate, setLoginFailed);
  const handleSignOut = () => handleGithubSignOut(navigate);

  return (
    <section className="login section">
      <SectionTitle
        title={isLoggedIn ? "Logged In" : "Log in"}
        subtitle={isLoggedIn ? "You are logged in" : "Log in to your account"}
        
      />

      <div className="login__container container">
        {loginFailed ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <p>Access denied... Only admin login is allowed.</p>
            <CustomButton
              title="Return to Home"
              onClick={() => navigate("/")}
              isLink={false}
              size="large"
              icon={<FontAwesomeIcon icon={faHome} />}
            />
          </div>
        ) : (
          <CustomButton
            title={isLoggedIn ? "Sign out of GitHub" : "Sign in with GitHub"}
            onClick={isLoggedIn ? handleSignOut : signInWithGithub}
            isLink={false}
            size="large"
            icon={<FontAwesomeIcon icon={faGithub} />}
          />
        )}
      </div>
    </section>
  );
};

export default LogIn;
