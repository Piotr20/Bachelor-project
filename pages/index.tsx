import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";
import ImpactImage from "~/components/image/image";
import { SvgIcon } from "~/components/svg-icon";
import Text from "~/components/typography/text";
import useAuth from "~/hooks/useAuth";
import { getSession } from "next-auth/react";
import { useUserStore } from "~/store/userStore";

const Home: NextPage = () => {
    const { data: session, status } = useSession();
    const { authSignIn, authSignOut } = useAuth();
    const { user, setUserData } = useUserStore((state) => ({
        user: state.user,
        setUserData: state.setUserData,
    }));

    return (
        <div>
            <Head>
                <title>Bachelor project</title>
                <meta name="description" content="Best bachelor project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main></main>
        </div>
    );
};

export default Home;
