import Head from "next/head";
import { fetchSearchResults, outputFormatterHelper } from "~/lib/helpers/search.hepler";
import { BoxContainer, SearchHits, StyledSearchCategory } from "./searchResults";
import type { GetServerSideProps } from "next";
import useSearch from "~/hooks/useSearch";
import Text from "~/components/typography/text";
import { colors } from "~/util/colorPalette";
import { mq } from "~/util/media-queries";
import PeopleSearchBox from "~/components/search/peopleSearchBox";
import { User } from "~/models";

type PeoplePageProps = {
    fallback: { searchHits: SearchHits };
};

const People = ({ fallback }: PeoplePageProps) => {
    const { people, projects, skills } = fallback.searchHits;
    const searchData = useSearch("people", people, projects, skills?.skillsList);
    const searchHits = outputFormatterHelper(
        "people",
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
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<{
    fallback: { searchHits: SearchHits };
}> = async (context) => {
    const data = await fetchSearchResults("people");
    const searchHits = outputFormatterHelper("people", "", data?.people, data?.projects, data?.skills);
    return {
        props: {
            fallback: {
                searchHits,
            },
        },
    };
};

export default People;
