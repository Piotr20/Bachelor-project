import type { NextPage } from "next";
import Head from "next/head";
import { fetchSearchResults, outputFormatterHelper } from "~/lib/helpers/search.hepler";
import { BoxContainer, SearchHits, StyledSearchCategory } from "./searchResults";
import type { GetServerSideProps } from "next";
import useSearch from "~/hooks/useSearch";
import Text from "~/components/typography/text";
import { colors } from "~/util/colorPalette";
import { Project } from "~/models";
import ProjectsSearchBox from "~/components/search/projectsSearchBox";

type ProjectsPageProps = {
    fallback: { searchHits: SearchHits };
};

const Projects = ({ fallback }: ProjectsPageProps) => {
    const { people, projects, skills } = fallback.searchHits;
    const searchData = useSearch("projects", people, projects, skills?.skillsList);
    const searchHits = outputFormatterHelper(
        "projects",
        "",
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
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<{
    fallback: { searchHits: SearchHits };
}> = async (context) => {
    const data = await fetchSearchResults("projects");
    const searchHits = outputFormatterHelper("projects", "", data?.people, data?.projects, data?.skills);
    return {
        props: {
            fallback: {
                searchHits,
            },
        },
    };
};

export default Projects;
