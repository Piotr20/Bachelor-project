import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import useSearch from "~/hooks/useSearch";
import { fetchSearchResults, outputFormatterHelper } from "~/lib/helpers/search.hepler";
import { Project, Skill, User } from "~/models";
import { mq } from "~/util/media-queries";
import { useNavStore } from "~/store/store";
import { useSearchStore } from "~/store/searchStore";
import PeopleSearchBox from "~/components/search/peopleSearchBox";
import ProjectsSearchBox from "~/components/search/projectsSearchBox";
import SkillSearchBox from "~/components/search/skillsSearchBox";
import Text from "~/components/typography/text";
import { colors } from "~/util/colorPalette";
import { useEffect } from "react";
import NoResults from "~/components/search/noResults";

export type SearchHits = {
    people?: User[];
    projects?: Project[];
    skills?: skillsGroupType;
};

export type skillsGroupType = {
    people?: User[];
    projects?: Project[];
    skillsList?: Skill[];
};

type SearchPageProps = {
    fallback: { searchHits: SearchHits };
};

const SearchResults = ({ fallback }: SearchPageProps) => {
    const { toggleSlider, sliderData, openSlider, setOpenSlider } = useNavStore((state) => ({
        openSlider: state.openSlider,
        toggleSlider: state.toggleSlider,
        sliderData: state.sliderData,
        setOpenSlider: state.setOpenSlider,
    }));
    const { searchResults, setSearchResults } = useSearchStore((state) => ({
        searchResults: state.searchResults,
        setSearchResults: state.setSearchResults,
    }));

    const router = useRouter();

    const searchQuery = (router.query.search ? router?.query?.search : "") as string;
    const categoryQuery = (router.query.category ? router?.query?.category : "") as
        | "all"
        | "people"
        | "projects"
        | "skills";

    const { people, projects, skills } = fallback.searchHits;
    const searchData = useSearch(categoryQuery, people, projects, skills?.skillsList);
    const searchHits = outputFormatterHelper(
        categoryQuery,
        searchQuery,
        searchData?.searchHits?.people,
        searchData?.searchHits?.projects,
        searchData?.searchHits?.skills
    );

    return (
        <>
            <Head>
                <title>Bachelor project</title>
                <meta name="description" content="Best bachelor project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Text
                    tag="h4"
                    additionalStyles={{
                        marginTop: "24px",
                    }}
                >
                    Search results for {`"${router.query.search ? router.query.search : ""}"`}
                </Text>
                <StyledSearchResultsWrapper>
                    {searchHits?.people?.length ? (
                        <StyledSearchCategory>
                            <Text tag="h5">People</Text>
                            <Text
                                tag="p"
                                additionalStyles={{
                                    color: colors.primary.lightGrey,
                                    marginBottom: "16px",
                                    [mq("lg")]: {
                                        marginBottom: "24px",
                                    },
                                }}
                            >
                                {searchHits?.people?.length} people
                            </Text>
                            <BoxContainer>
                                {searchHits?.people?.map((result: User) => {
                                    return <PeopleSearchBox key={result?._id} data={result} />;
                                })}
                            </BoxContainer>
                        </StyledSearchCategory>
                    ) : null}
                    {searchHits?.projects?.length ? (
                        <StyledSearchCategory>
                            <Text tag="h5">Projects</Text>
                            <Text
                                tag="p"
                                additionalStyles={{
                                    color: colors.primary.lightGrey,
                                }}
                            >
                                {searchHits?.projects?.length} projects
                            </Text>
                            <BoxContainer>
                                {searchHits?.projects?.map((result: Project) => {
                                    return <ProjectsSearchBox key={result?._id} data={result} />;
                                })}
                            </BoxContainer>
                        </StyledSearchCategory>
                    ) : null}
                    {searchHits?.skills?.people?.length ? (
                        <StyledSearchCategory>
                            <Text tag="h5">{`People with skills matching "${searchQuery}"`}</Text>
                            <Text
                                tag="p"
                                additionalStyles={{
                                    color: colors.primary.lightGrey,
                                }}
                            >
                                {searchHits?.skills?.people?.length} people
                            </Text>
                            <BoxContainer>
                                {searchHits?.skills?.people?.map((result: Skill) => {
                                    return <PeopleSearchBox key={result?._id} data={result} />;
                                })}
                            </BoxContainer>
                        </StyledSearchCategory>
                    ) : null}
                    {searchHits?.skills?.projects?.length ? (
                        <StyledSearchCategory>
                            <Text tag="h5">{`Projects with skills matching "${searchQuery}"`}</Text>
                            <Text
                                tag="p"
                                additionalStyles={{
                                    color: colors.primary.lightGrey,
                                }}
                            >
                                {searchHits?.skills?.projects?.length} projects
                            </Text>
                            <BoxContainer>
                                {searchHits?.skills?.projects?.map((result: Skill) => {
                                    return <ProjectsSearchBox key={result?._id} data={result} />;
                                })}
                            </BoxContainer>
                        </StyledSearchCategory>
                    ) : null}
                    {!searchHits?.skills?.people?.length &&
                    !searchHits?.skills?.projects?.length &&
                    !searchHits?.skills?.skillsList?.length &&
                    !searchHits?.projects?.length &&
                    !searchHits?.people?.length &&
                    router.query.category ? (
                        <NoResults />
                    ) : null}
                </StyledSearchResultsWrapper>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<{
    fallback: { searchHits: SearchHits };
}> = async (context) => {
    const search = (context.query["search"] ? context.query["search"] : "") as string;
    const category = (context.query["category"] ? context.query["category"] : "all") as
        | "projects"
        | "skills"
        | "people"
        | "all";

    const data = await fetchSearchResults(category);
    const searchHits = outputFormatterHelper(category, search, data?.people, data?.projects, data?.skills);
    return {
        props: {
            fallback: {
                searchHits,
            },
        },
    };
};

export default SearchResults;

export const StyledSearchResultsWrapper = styled.div({
    width: "100%",
});

export const StyledSearchCategory = styled.div({
    width: "100%",
    marginTop: "24px",
    paddingBottom: "16px",
    [mq("lg")]: {
        marginTop: "32px",
    },
});

export const BoxContainer = styled.div({
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
    marginTop: "12px",
    [mq("lg")]: {
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "32px",
        marginTop: "16px",
    },
});
