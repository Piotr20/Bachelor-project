import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import SearchBox from "~/components/search/searchBox";
import SlideIn from "~/components/slider/slider";
import { fetchSearchResults } from "~/lib/helpers/search.hepler";
import { Project, Skill, User } from "~/models";
import { mq } from "~/util/media-queries";

type SearchPageProps =
    | {
          searchHits: Array<User & Project & Skill>;
      }
    | any;

const SearchResults: NextPage = ({ searchHits }: SearchPageProps) => {
    return (
        <>
            <Head>
                <title>Bachelor project</title>
                <meta name="description" content="Best bachelor project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                Search results
                <StyledSearchResultsWrapper>
                    {searchHits?.map((result: Project | Skill | User) => {
                        return <SearchBox key={result?._id} data={result} />;
                    })}
                </StyledSearchResultsWrapper>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<{
    searchHits: SearchPageProps;
}> = async (context) => {
    const search = context.query["search"] as string;
    const data = await fetchSearchResults("all");
    const searchHits = data.filter((searchHit: Project | Skill | User) => {
        if (searchHit?.name?.toLowerCase()?.includes(search?.toLowerCase())) {
            return searchHit;
        }
    });

    return { props: { searchHits } };
};

export default SearchResults;

export const StyledSearchResultsWrapper = styled.div({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    padding: "16px",
    [mq("lg")]: {
        gridTemplateColumns: "repeat(4, 1fr)",
    },
});
