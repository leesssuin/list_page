"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
html,
body,
div,
span,
applet,
object,
iframe,
p,
a {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 14px;
  font-family: "Noto Sans KR", sans-serif;
}

body {
  padding: 0 6rem;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
`;

export default GlobalStyles;
