import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";
import Layout from "~/components/layout/layout";
import { defaultTheme } from "~/styles/default-theme";
import GlobalStyles from "~/styles/global-styles";
import { fetcher } from "~/util/fetcher";
import { SessionProvider } from "next-auth/react";
import HOCAuthCheck from "~/components/auth/authCheck";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles />
            <SWRConfig
                value={{
                    refreshInterval: 3000,
                    fetcher,
                }}
            >
                <SessionProvider session={session}>
                    <HOCAuthCheck>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </HOCAuthCheck>
                </SessionProvider>
            </SWRConfig>
        </ThemeProvider>
    );
}

export default MyApp;
