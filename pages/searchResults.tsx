import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { fetchSearchResults } from "~/lib/helpers/search.hepler";

const SearchResults: NextPage = ({ searchHits }: any) => {
    return (
        <>
            <Head>
                <title>Bachelor project</title>
                <meta name="description" content="Best bachelor project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                Search results
                <div>
                    {searchHits?.map((result: any) => {
                        return <div key={result._id}>{result.name}</div>;
                    })}
                </div>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const search = context.query["search"];
    const data = await fetchSearchResults("all");
    const searchHits = data.filter((searchHit: any) => {
        if (
            searchHit?.name
                ?.toLowerCase()
                ?.includes(search?.toString()?.toLowerCase())
        ) {
            return searchHit;
        }
    });

    return { props: { searchHits } };
};

export default SearchResults;
