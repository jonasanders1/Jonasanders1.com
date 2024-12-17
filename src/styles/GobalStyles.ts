import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s, color 0.3s;
    max-width: 1200px;
    margin: 0 auto;
    }
    
  .list-item-link{
    color: ${({ theme }) => theme.text};
    transition: color 0.3s;
  }
    
  .list-item-link.active{
    color: ${({ theme }) => theme.primary};
    transition: color 0.3s;
  }
      
  .list-item-link:hover{
    color: ${({ theme }) => theme.primary};
    transition: color 0.3s;
  }
        
  .hero-links-link{
    color: ${({ theme }) => theme.text};
    opacity: 0.5;
    transition: opacity 0.3s, color 0.3s;
  }
  .hero-links-link:hover{
    opacity: 1
  }

  nav, .menu-list {
    background-color: ${({ theme }) => theme.background};
    transition: all 0.3s, color 0.3s;
  }
  
  a, button{
  outline-color: ${({ theme }) => theme.primary};
  }
  `;
