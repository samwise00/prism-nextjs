import "../styles/globals.css";

import { MoralisProvider } from "react-moralis";

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://stijndv.com" />
      <link
        rel="stylesheet"
        href="https://stijndv.com/fonts/Eudoxus-Sans.css"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Bakbak+One&family=Geo&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>
      <MoralisProvider initializeOnMount={false}>{children}</MoralisProvider>
    </body>
  </html>
);

export default RootLayout;
