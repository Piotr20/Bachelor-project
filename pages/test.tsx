import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import { SvgIcon } from "~/components/svg-icon";
import { useSession } from "next-auth/react";
import HOCAuthCheck from "~/components/auth/authCheck";

const Test: NextPage = () => {
    const { data } = useSWR<never[]>("https://api.punkapi.com/v2/beers");
    const { data: session } = useSession();

    return (
        <HOCAuthCheck>
            <div>
                <Head>
                    <title>TimeLog Analyzer</title>
                    <meta
                        name="description"
                        content="A wonderful TimeLog helper"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    This is main, welcome to main - APITestCount: {data?.length}
                    <SvgIcon svg="circlePlus" size={10} />
                    <Link href="/">Hommepage</Link>
                </main>
            </div>
        </HOCAuthCheck>
    );
};

export default Test;
