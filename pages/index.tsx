import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ImpactImage from "~/components/image/image";
import PersonTag from "~/components/tags/personTag";
import ProjectsTag from "~/components/tags/projectTag";
import Text from "~/components/typography/text";
import { handleSlideIn } from "~/lib/helpers/search.hepler";
import { Project, User } from "~/models";
import { useNavStore } from "~/store/store";
import { colors } from "~/util/colorPalette";
import { mq } from "~/util/media-queries";

const Home: NextPage = () => {
    const [newUsers, setNewUsers] = useState<any>();
    const [recentlySearched, setRecentlySearched] = useState<any[]>();

    const { openSlider, setDataInSlider, setOpenSlider, setDataType } = useNavStore((state) => ({
        openSlider: state.openSlider,
        setDataInSlider: state.setDataInSlider,
        setOpenSlider: state.setOpenSlider,
        setDataType: state.setDataType,
    }));

    async function getNewUsers() {
        const response = await fetch("/api/user/new");

        const data = await response.json();
        setNewUsers(data);
    }

    useEffect(() => {
        getNewUsers();
        const recentlySearched = localStorage.getItem("recentSearches");
        if (recentlySearched) {
            const parsedLocalStorageSearches = JSON.parse(recentlySearched);
            setRecentlySearched(parsedLocalStorageSearches);
        }
    }, []);

    return (
        <div>
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
                        marginBottom: "12px",
                        [mq("lg")]: {
                            marginTop: "32px",
                        },
                    }}
                >
                    Your recent searches
                </Text>
                <RecentSearchesContainer>
                    {recentlySearched
                        ? recentlySearched?.map(
                              (
                                  recentSearchHit:
                                      | (User & { type: "person" })
                                      | (Project & { type: "project" })
                              ) => {
                                  if (recentSearchHit.type === "person") {
                                      return (
                                          <PersonTag
                                              key={recentSearchHit._id}
                                              person={recentSearchHit}
                                          ></PersonTag>
                                      );
                                  }
                                  if (recentSearchHit.type === "project") {
                                      return (
                                          <ProjectsTag
                                              key={recentSearchHit._id}
                                              project={recentSearchHit}
                                          ></ProjectsTag>
                                      );
                                  }
                              }
                          )
                        : "There is no recent search results"}
                </RecentSearchesContainer>
                <Text
                    tag="h4"
                    additionalStyles={{
                        marginTop: "12px",
                    }}
                >
                    New colleges
                </Text>
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
                    {newUsers?.people?.length} people
                </Text>
                <PeopleContainer>
                    {newUsers?.people?.map((person: User, key: number) => {
                        return (
                            <NewPerson
                                key={key}
                                onClick={() =>
                                    handleSlideIn(
                                        person,
                                        setOpenSlider,
                                        setDataInSlider,
                                        setDataType as any,
                                        "person",
                                        openSlider
                                    )
                                }
                            >
                                <ImpactImage
                                    src={person?.imageURL}
                                    alt={person?.name}
                                    layout="fill"
                                    ratio="1/1"
                                    containerWidth="100%"
                                    style={{ borderRadius: "50%" }}
                                />
                                <Text
                                    tag="h5"
                                    additionalStyles={{
                                        textAlign: "center",
                                        marginTop: "8px",
                                    }}
                                >
                                    {person?.name}
                                </Text>
                                <Text
                                    tag="h5"
                                    additionalStyles={{
                                        color: colors.primary.lightGrey,
                                        fontWeight: 400,
                                        marginTop: "4px",
                                        minHeight: "5ch",
                                        maxHeight: "5ch",
                                        overflow: "hidden",
                                        textAlign: "center",
                                        fontSize: "16px",
                                        [mq("lg")]: {
                                            minHeight: "2.5ch",
                                            maxHeight: "2.5ch",
                                            fontSize: "20px !important",
                                        },
                                        [mq("xl")]: {
                                            fontSize: "22px !important",
                                        },
                                    }}
                                >
                                    {person?.role + " | " + person?.department}
                                </Text>
                            </NewPerson>
                        );
                    })}
                </PeopleContainer>
            </main>
        </div>
    );
};

export default Home;

export const RecentSearchesContainer = styled.div({
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
    gap: "12px",

    marginTop: "12px",
    marginBottom: "32px",
    [mq("lg")]: {
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: "20px",
        columnGap: "40px",
        marginTop: "24px",
        marginBottom: "40px",
    },
    ["&>div:nth-of-type(1), &>div:nth-of-type(2),&>div:nth-of-type(3)"]: {
        display: "none",
        [mq("lg")]: {
            display: "flex",
        },
    },
});

export const PeopleContainer = styled.div({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    [mq("lg")]: {
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "24px",
    },
});

export const NewPerson = styled.div({
    cursor: "pointer",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [mq("lg")]: {
        padding: "24px",
    },
});
