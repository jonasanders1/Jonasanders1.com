import doodleMindImg from "../../assets/project-images/doodle-mind.png";
import wageWiseImg from "../../assets/project-images/wagewise.png";

export const projectsData = [
  {
    id: 1,
    title: "Doodle Mind",
    description:
      "A custom-built Convolutional Neural Network (CNN) that classifies hand-drawn images into 11 categories. Sketch any category and see if the model can predict it—though, fair warning, its trash!",
    technologies: ["Python", "TensorFlow", "Pandas", "Flask API", "React", "Tailwind CSS"],
    demoLink: "",
    repoLink: "https://github.com/jonasanders1/drawing-classifier",
    image: doodleMindImg,
  },
  {
    id: 2,
    title: "WageWise",
    description:
      "Developed a sophisticated income tracking application utilizing React, TypeScript, and Recharts to visualize financial data through interactive stacked bar charts and customizable data visualizations.",
    technologies: ["React", "TypeScript", "Recharts", "Tailwind CSS", "Firebase"],
    demoLink: "https://wagewise.jonasanders1.com/",
    repoLink: "https://github.com/jonasanders1/wagewise",
    image: wageWiseImg,
  }
];
