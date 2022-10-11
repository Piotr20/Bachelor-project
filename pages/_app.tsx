import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";
import Layout from "~/components/layout/layout";
import { ToastsList } from "~/components/toasts/toast-list";
import { useToastStore } from "~/store/toast-store/toast-store";
import { defaultTheme } from "~/styles/default-theme";
import GlobalStyles from "~/styles/global-styles";
import { fetcher } from "~/util/fetcher";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const { messages, hideToast, position, fadeIn, toast } = useToastStore();

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
                    <ToastsList
                        hideToast={hideToast}
                        messages={messages}
                        visible={messages.length > 0}
                        durationInSeconds={4}
                        position={position}
                        fadeIn={fadeIn}
                        toast={toast}
                    />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SessionProvider>
            </SWRConfig>
        </ThemeProvider>
    );
}

export default MyApp;
