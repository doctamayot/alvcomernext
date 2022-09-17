//Next
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
//MUI
import { CssBaseline, ThemeProvider } from "@mui/material";
//App
import "../styles/globals.css";
import { lightTheme } from "../themes";
import { SWRConfig } from "swr";
import { UiProvider } from "../context";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          // refreshInterval:500,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <UiProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
