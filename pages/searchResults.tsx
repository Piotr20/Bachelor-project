import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import SearchBox from "~/components/search/searchBox";
import { useRouter } from "next/router";
import useSearch from "~/hooks/useSearch";
import {
    fetchSearchResults,
    filterBySearchParam,
} from "~/lib/helpers/search.hepler";
import { Project, Skill, User } from "~/models";
import { mq } from "~/util/media-queries";
import { useNavStore } from "~/store/store";
import { useEffect } from "react";
import { useSearchStore } from "~/store/searchStore";
import { ifProp } from "styled-tools";

type SearchPageProps =
    | {
          searchHits: Array<User & Project & Skill>;
      }
    | any;

const SearchResults: NextPage = ({ fallback }: SearchPageProps) => {
    const { toggleSlider, sliderData, openSlider, setOpenSlider } = useNavStore(
        (state) => ({
            openSlider: state.openSlider,
            toggleSlider: state.toggleSlider,
            sliderData: state.sliderData,
            setOpenSlider: state.setOpenSlider,
        })
    );
    const { searchResults, setSearchResults } = useSearchStore((state) => ({
        searchResults: state.searchResults,
        setSearchResults: state.setSearchResults,
    }));

    const router = useRouter();

    const fallbackData = fallback.searchHits;
    const searchQuery = router.query.search as string;
    const { people, projects, skills } = fallback.searchHits;
    const searchData = useSearch("all", people, projects, skills);
    console.log(searchData?.searchHits);
    return (
        <>
            <Head>
                <title>Bachelor project</title>
                <meta name="description" content="Best bachelor project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                Search results
                <StyledSearchResultsWrapper></StyledSearchResultsWrapper>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<{
    fallback: SearchPageProps;
}> = async (context) => {
    const search = context.query["search"] as string;
    const data = await fetchSearchResults("all");
    /*  const searchHits = filterBySearchParam(data, search);
     */
    return {
        props: {
            fallback: {
                searchHits: data,
            },
        },
    };
};

export default SearchResults;

export const StyledSearchResultsWrapper = styled.div({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",

    [mq("lg")]: {
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "32px",
    },
});
