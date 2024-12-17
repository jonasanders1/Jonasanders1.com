import mobileImage from "../../assets/about.png";
import webImage from "../../assets/profile.png";
// Quiz
import correct from "../../assets/project-images/quiz-app/correct.png";
import home from "../../assets/project-images/quiz-app/home.png";
import incorrect from "../../assets/project-images/quiz-app/incorrect.png";
import result from "../../assets/project-images/quiz-app/result.png";
// Snake
import snake from "../../assets/project-images/snake/snake.png";
// Spotify
import spotify from "../../assets/project-images/spotify-app/spotify.png";
// Portfolio
import portfolio from "../../assets/project-images/portfolio/portfolio.png";
// Wordle
import wordle from "../../assets/project-images/wordle/wordle.png";
// TipCalculator
import tipCalculator from "../../assets/project-images/tip-calculator/tip-calculator.png";
// Password Gen
import Password from "../../assets/project-images/Password-Generator/Password.png";

const customColor = {
  typescript: "#387cc8",
  javascript: "#f0db4c",
  swift: "#f25740",
};

export const projectsSets = {
  web: [
    {
      id: 1,
      name: "Snake",
      image: {
        projectImage: [snake],
      },
      description:
        "Fun and simple snake game made with HTML, CSS and vanilla JS. Try it yourself!",
      githubLink: "https://github.com/jonasanders1/Snake",
      previewLink: "https://snake-pearl.vercel.app/",
      icon: "javascript",
      language: "JavaScript",
      color: customColor.javascript,
    },
    {
      id: 2,
      name: "Portfolio",
      image: {
        projectImage: [portfolio],
      },
      description:
        "Fully responsive personal website that showcases my projects and experience.",
      githubLink: "https://github.com/jonasanders1/Portfolio-app",
      previewLink: "",
      icon: "typescript",
      language: "TypeScript",
      color: customColor.typescript,
    },
    {
      id: 3,
      name: "Wordle",
      image: {
        projectImage: [wordle],
      },
      description:
        "The popular wordle game made with vanilla JS. The app is static for now, i want to add so that a random word is picked every day.",
      previewLink: "https://wordle-livid-gamma.vercel.app/",
      githubLink: "https://github.com/jonasanders1/Wordle",
      icon: "javascript",
      language: "JavaScript",
      color: customColor.javascript,
    },
    {
      id: 4,
      name: "Tip calculator",
      image: {
        projectImage: [tipCalculator],
      },
      description:
        "A challenge created by Frontendmentor.com. A calculator for calculating tip.",
      previewLink: "https://tip-calculator-app-orcin-nine.vercel.app/",
      githubLink: "https://github.com/jonasanders1/tip-calculator-app",
      icon: "typescript",
      language: "Typescript",
      color: customColor.typescript,
    },
    {
      id: 5,
      name: "Password",
      image: {
        projectImage: [Password],
      },
      description:
        "A challenge created by Frontendmentor.com. The app lets you generate a password.",
      previewLink: "https://password-generator-wheat-three.vercel.app/",
      githubLink: "https://github.com/jonasanders1/Password-generator",
      icon: "typescript",
      language: "Typescript",
      color: customColor.typescript,
    },
  ],
  mobile: [
    {
      id: 1,
      name: "Quiz App",
      image: {
        projectImage: [home, correct, incorrect, result],
      },
      description:
        "Quiz app where you can choose difficulty. When the you are done, the score is displayed and you can choose to play again or change the difficulty.",
      githubLink: "https://github.com/jonasanders1/quizz",
      previewLink: "",
      icon: "typescript",
      language: "TypeScript",
      color: customColor.typescript,
    },
    {
      id: 2,
      name: "Playlist generator",
      image: {
        projectImage: [spotify],
      },
      description:
        "An app that uses AI for generating playlists. Using ChatGPT`s API to generate songs based on the prompt.",
      githubLink: "",
      previewLink: "",
      icon: "apple",
      language: "Swift",
      color: customColor.swift,
    },
    {
      id: 3,
      name: "Todo list",
      image: {
        projectImage: [mobileImage, webImage],
      },
      description:
        "Advanced todo list with user authentication, login and register using firebase!",
      githubLink: "",
      previewLink: "",
      icon: "apple",
      language: "Swift",
      color: customColor.swift,
    },
  ],
};
