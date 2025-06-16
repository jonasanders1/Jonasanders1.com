import "./App.css";
// import "./styles/global.css";
import "./styles/colors.css";
import Header from "./components/header/Header";

// Home page sections
import Home from "./components/home/Home";
import Projects from "./components/projects/Projects";
import Skills from "./components/skills/Skills";
import Qualification from "./components/qualification/Qualification";

import Footer from "./components/footer/Footer";
import ScrollUp from "./components/scrollup/ScrollUp";
import { ThemeProvider } from "./contexts/ThemeContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/login/LogIn";

import ProjectForm from "./components/projectform/ProjectForm";
import ProjectPage from "./pages/project-page/ProjectPage";

function App() {
  return (
    <Router>
      <ThemeProvider>
        {/* <GlobalStyles /> */}

        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                  <Projects />
                  <Skills />
                  <Qualification />
                  <Footer />
                </>
              }
            />
            <Route path="/login" element={<LogIn />} />
            <Route path="/addproject" element={<ProjectForm />} />
            <Route path="/editproject/:projectId" element={<ProjectForm />} />
            <Route path="/project/:projectId" element={<ProjectPage />} />
          </Routes>
        </main>
        <ScrollUp />
      </ThemeProvider>
    </Router>
  );
}

export default App;
