import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { auth, githubProvider } from "../../firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import CustomButton from "../../components/customButton/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./logIn.css";

const LogIn = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStatus();

  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="login section">
      <SectionTitle
        title={isLoggedIn ? "Logged In" : "Log in"}
        subtitle={isLoggedIn ? "You are logged in" : "Log in to your account"}
      />

      <div className="login__container container">
        <CustomButton
          title={isLoggedIn ? "Sign out of GitHub" : "Sign in with GitHub"}
          onClick={isLoggedIn ? handleSignOut : signInWithGithub}
          isLink={false}
          size="large"
          icon={<FontAwesomeIcon icon={faGithub} />}
        />
      </div>
    </section>
  );
};

export default LogIn;
