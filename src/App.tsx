import "./App.css";
import About from "./components/about/About";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
// import Portfolio from "./components/portfolio/Portfolio";
import Qualification from "./components/qualification/Qualification";
import Services from "./components/services/Services";
import Skills from "./components/skills/Skills";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import ScrollUp from "./components/scrollup/ScrollUp";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GlobalStyles } from "./styles/GobalStyles";

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Header />
      <main className="main">
        <Home />
        <About />
        <Skills />
        <Services />
        <Qualification />
        {/* <Portfolio /> */}
        <Contact />
      </main>
      <Footer />
      <ScrollUp />
    </ThemeProvider>
  );
}

export default App;
