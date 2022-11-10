import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import useSearch from "~/hooks/useSearch";
import {
    fetchSearchResults,
    outputFormatterHelper,
} from "~/lib/helpers/search.hepler";
import { Project, Skill, User } from "~/models";
import { mq } from "~/util/media-queries";
import { useNavStore } from "~/store/store";
import { useSearchStore } from "~/store/searchStore";
import PeopleSearchBox from "~/components/search/peopleSearchBox";
import ProjectsSearchBox from "~/components/search/projectsSearchBox";
import SkillSearchBox from "~/components/search/skillsSearchBox";
import Text from "~/components/typography/text";
import { colors } from "~/util/colorPalette";

type SearchHits = {
    people?: User[];
    projects?: Project[];
    skills?: Skill[];
};

type SearchPageProps = {
    fallback: { searchHits: SearchHits };
};

const SearchResults = ({ fallback }: SearchPageProps) => {
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

    const searchQuery = router.query.search as string;
    const { people, projects, skills } = fallback.searchHits;
    const searchData = useSearch("all", people, projects, skills);

    const searchHits = outputFormatterHelper(
        "all",
        searchQuery,
        searchData?.searchHits?.people,
        searchData?.searchHits?.projects,
        searchData?.searchHits?.skills
    );
    console.log(searchHits);
    return (
        <>
            <Head>
                <title>Bachelor project</title>
                <meta name="description" content="Best bachelor project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Text tag="h4">Search results for {router.query.search}</Text>
                <StyledSearchResultsWrapper>
                    {searchHits?.people?.length ? (
                        <StyledSearchCategory>
                            <Text tag="h5">People</Text>
                            <Text
                                tag="p"
                                additionalStyles={{
                                    color: colors.primary.lightGrey,
                                }}
                            >
                                {searchHits?.people?.length} people
                            </Text>
                            <BoxContainer>
                                {searchHits?.people?.map((result: User) => {
                                    return (
                                        <PeopleSearchBox
                                            key={result?._id}
                                            data={result}
                                        />
                                    );
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
                                {searchHits?.projects?.map(
                                    (result: Project) => {
                                        return (
                                            <ProjectsSearchBox
                                                key={result?._id}
                                                data={result}
                                            />
                                        );
                                    }
                                )}
                            </BoxContainer>
                        </StyledSearchCategory>
                    ) : null}
                    {searchHits?.skills?.length ? (
                        <StyledSearchCategory>
                            <Text tag="h5">Skills</Text>
                            <Text
                                tag="p"
                                additionalStyles={{
                                    color: colors.primary.lightGrey,
                                }}
                            >
                                {searchHits?.skills?.length} skills
                            </Text>
                            <BoxContainer>
                                {searchHits?.skills?.map((result: Skill) => {
                                    return (
                                        <SkillSearchBox
                                            key={result?._id}
                                            data={result}
                                        />
                                    );
                                })}
                            </BoxContainer>
                        </StyledSearchCategory>
                    ) : null}
                </StyledSearchResultsWrapper>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<{
    fallback: { searchHits: SearchHits };
}> = async (context) => {
    const search = context.query["search"] as string;
    const data = await fetchSearchResults("all");
    const searchHits = outputFormatterHelper(
        "all",
        search,
        data?.people,
        data?.projects,
        data?.skills
    );

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
