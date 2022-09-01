//Next
import type { AppProps } from "next/app";
//MUI
import { CssBaseline, ThemeProvider } from "@mui/material";
//App
import "../styles/globals.css";
import { lightTheme } from "../themes";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
