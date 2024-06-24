import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import apolloClient from "../lib/apollo";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/custom/ThemeSwitcher";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider attribute="class" defaultTheme="light" themes={['light', 'dark']}>
        <ThemeSwitcher />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
