import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box; 
        };
        @font-face {
            font-family: 'Flama'
            src: url("/fonts/FlamaBold.woff2") format('woff2');
            font-weight: bold;
        };
        @font-face {
            font-family: 'Flama'
            src: url("/fonts/FlamaLightRegular.woff2") format('woff2');
            font-weight: normal;
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
            background: #F5F5F5;  
            font-family: 'Plantin Std';
            font-weight: normal;
        };
        h1,h2,h3,h4,h5,h6, button {
            font-family: 'Flama';
            font-weight: bold;
            letter-spacing: "1px",
        };
    `;

export default GlobalStyles;
