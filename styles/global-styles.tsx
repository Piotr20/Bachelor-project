import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box; 
        };
        @font-face {
            font-family: 'Flama Condensed';
            src: url('/fonts/FlamaCondensed-Medium.woff2') format('woff2');
        };
        @font-face {
            font-family: 'Plantin Std';
            src: url('/fonts/PlantinStd.woff2') format('woff2');
        };
        body {
            margin: 0;
            padding: 0;
            background: ${({ theme }) => theme.backgroundColor};  
            font-family: 'Plantin Std';
            font-weight: 400;
        };
        h1,h2,h3,h4,h5,h6 {
            font-family: 'Flama Condensed';
        };
    `;

export default GlobalStyles;
