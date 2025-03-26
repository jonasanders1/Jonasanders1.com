import "./App.css";
// import About from "./components/about/About";
// import Contact from "./components/contact/Contact";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
// import Portfolio from "./components/portfolio/Portfolio";
import Qualification from "./components/qualification/Qualification";
// import Services from "./components/services/Services";
import Skills from "./components/skills/Skills";
import Footer from "./components/footer/Footer";
import ScrollUp from "./components/scrollup/ScrollUp";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GlobalStyles } from "./styles/GobalStyles";
import Projects from "./components/projects/Projects";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/login/LogIn";
import AddNewProject from "./pages/addProject/AddNewProject";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <GlobalStyles />

        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                  {/* <About /> */}
                  <Projects />
                  <Skills />
                  <Qualification />
                  {/* <Contact /> */}
                  <Footer />
                </>
              }
            />
            <Route path="/login" element={<LogIn />} />
            <Route path="/addnewproject" element={<AddNewProject />} />
          </Routes>
        </main>
        <ScrollUp />
      </ThemeProvider>
    </Router>
  );
}

export default App;
