'use client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary: #1FD6D6;
    --color-background: #0A0A0A;
    --color-background-light: #111111;
    --color-text: #E4E4E4;
    --color-text-dark: #888888;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* THIS IS THE CRITICAL CHANGE */
    font-family: 'General Sans', sans-serif; 
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--color-background);
    color: var(--color-text);
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* ... rest of your global styles ... */
`;

export default GlobalStyles;