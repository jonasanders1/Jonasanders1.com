import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  // Background and text color
  body, .header, .nav__menu, .contact__form-tag, .project__technology, .add-new-project__form-tag {
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
  p, section__subtitle, .qualification__subtitle, .qualification__calendar, .qualification__rounder, .add-new-project__form-input, .contact__form-input,
  .qualification__line, .home__scroll-name, .home__scroll-arrow, .services__modal-close, .services__modal-icon, .project__icon, .project__link, .contact__button  {
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
  .contact__form-input, .add-new-project__form-input {
    border: 2px solid ${({ theme }) => theme.textColor};
  }

  a, button{
    outline-color: ${({ theme }) => theme.primary};
  }

  input:focus, textarea:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.primary};
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

  // Project Links
  .project__link {
    color: ${({ theme }) => theme.containerColor};
    background-color: ${({ theme }) => theme.titleColor};
    font-weight: var(--font-medium);
    display: inline-flex;
    align-items: center;
    // column-gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    transition: all 0.3s ease;
    flex: 1;
  }

  .project__link:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.containerColor};
  }

  .project__link.disabled {
    background-color: ${({ theme }) => theme.textColor};
    opacity: 0.3;
    pointer-events: none;
  }

  .project__link i {
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }

  .project__link:hover i {
    transform: translateX(4px);
  }

  .section__button, .section__button--admin {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.containerColor};
    transition: background-color 0.3s;
  }
  

  `;
