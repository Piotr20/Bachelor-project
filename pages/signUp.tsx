import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import { SvgIcon } from "~/components/svg-icon";
import HOCAuthCheck from "~/components/auth/authCheck";

const SignUp: NextPage = () => {
    const { data } = useSWR<never[]>("https://api.punkapi.com/v2/beers");
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
                <Link href="/">Hommepage</Link>
            </main>
        </div>
    );
};

export default SignUp;
