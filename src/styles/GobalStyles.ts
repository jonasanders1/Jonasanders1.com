import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`


  // Background and text color
  body, .header, .nav__menu, .contact__form-tag, .project__technology {
    background-color: ${({ theme }) => theme.bodyColor};
    color: ${({ theme }) => theme.textColor};
    transition: background-color 0.3s, color 0.3s;
  }
  
  // Containers Color
  .about__box, .skills__content, .services__content, .services__modal-content, .contact__card, .project__card {
    background-color: ${({ theme }) => theme.containerColor};
    transition: background-color 0.3s;
  }


  // Title Color
  h1,h2,h3 {
    color: ${({ theme }) => theme.titleColor};
    transition: color 0.3s;
  }

  // Text Color
  .home__social-icon,
  p, section__subtitle, .qualification__subtitle, .qualification__calendar, .qualification__rounder, 
  .qualification__line, .home__scroll-name, .home__scroll-arrow, .services__modal-close, .services__modal-icon, .project__icon, .project__link  {
    color: ${({ theme }) => theme.textColor};
    transition: color 0.3s;
    }
    .home__subtitle::before {
    background-color: ${({ theme }) => theme.textColor};
    transition: background-color 0.3s;
  }

  .home__social-icon:hover {
    color: ${({ theme }) => theme.primary};
    transition: color 0.3s;
  }
  .project__link:hover {
    color: ${({ theme }) => theme.primary};
    transition: color 0.3s;
  }

  .mouse, .wheel {
    stroke: ${({ theme }) => theme.textColor};
    transition: stroke 0.3s;
  }

  // NAV
  .nav__link{
    color: ${({ theme }) => theme.textColor};
    transition: color 0.3s;
  }
  .nav__link:hover, .active-link {
    color: ${({ theme }) => theme.primary};
    transition: color 0.3s;
  }

  .qualification__button:hover, .qualification__active {
    color: ${({ theme }) => theme.primary};
    transition: color 0.3s;
  }


  // Form 
  .contact__form-input{
    border: 2px solid ${({ theme }) => theme.textColor};
  }

  // Custom Button
  .button { 
    background-color: ${({ theme }) => theme.titleColor};
    color: ${({ theme }) => theme.containerColor};
    transition: background-color 0.3s;
  }
  .button:hover {
    background-color: ${({ theme }) => theme.primary};
  }

  // Toggle Theme Button
  .switch-container {
  background-color:  ${({ theme }) => theme.primary};
  transition: background-color 0.3s;
  
  }
  .switch {
    background-color:  ${({ theme }) => theme.bodyColor};
    transition: all 0.3s;
  }

  // Footer
  .footer {
    background-color: ${({ theme }) => theme.containerColor};
    transition: background-color 0.3s;
  }
  .footer__title, .footer__link {
    color: ${({ theme }) => theme.titleColor};
    transition: color 0.3s;
  }
  .footer__link:hover {
    color: ${({ theme }) => theme.primary};
    transition: color 0.3s;
  }
  .footer__social-link {
    background-color: ${({ theme }) => theme.titleColor};
    color: ${({ theme }) => theme.containerColor};
    transition: background-color 0.3s, color 0.3s;
  }
  .footer__social-link:hover {
    background-color: ${({ theme }) => theme.primary};
    transition: background-color 0.3s;
  }
  .footer__copy {
    color: ${({ theme }) => theme.textColor};
    transition: color 0.3s;
  }

  .scrollup {
    background-color: ${({ theme }) => theme.titleColor};
    transition: all 0.3s;
  }
  .scrollup__icon{
    color: ${({ theme }) => theme.containerColor};
    transition: color 0.3s;
  }
  .scrollup:hover {
    background-color: ${({ theme }) => theme.primary};
    transition: background-color 0.3s;
  }

  // Projects
  .project__add-button {
    border: 2px dashed ${({ theme }) => theme.textColor};
    color: ${({ theme }) => theme.textColor};
  }

  .project__add-button:hover {
    background: var(--title-color);
    color: var(--container-color);
  }

  `;
