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

const Home: NextPage = () => {
    const { data } = useSWR<never[]>("https://api.punkapi.com/v2/beers");
    const { data: session, status } = useSession();
    const { authSignIn, authSignOut } = useAuth();

    useEffect(() => {
        getUsers();
    }, [session]);

    async function getUsers() {
        /*     const response = await fetch(`./api/user/userVerify`, {
            method: "POST",
            body: JSON.stringify(session?.user),
        });
        const data = await response.json(); */
    }

    return (
        <div>
            <Head>
                <title>Bachelor project</title>
                <meta name="description" content="Best bachelor project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                This is main, welcome to main - APITestCount: {data?.length}
                <SvgIcon svg="circlePlus" size={10} />
                <Link href="/signUp">Sign up page</Link>
                <ImpactImage
                    alt="alt text"
                    layout="fill"
                    ratio="3/1"
                    containerWidth="50%"
                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                />
                <Text tag="p">P text</Text>
                <button onClick={authSignIn}>Sign in</button>
                <button onClick={authSignOut}>Sign out</button>
            </main>
        </div>
    );
};

export default Home;
