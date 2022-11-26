import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ImpactImage from "~/components/image/image";
import Text from "~/components/typography/text";
import { User } from "~/models";
import { mq } from "~/util/media-queries";

const Home: NextPage = () => {
    const [newUsers, setNewUsers] = useState<any>();

    async function getNewUsers() {
        const response = await fetch("/api/user/new");

        const data = await response.json();
        setNewUsers(data);
    }

    useEffect(() => {
        getNewUsers();
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
                    tag="h3"
                    additionalStyles={{
                        marginTop: "12px",
                    }}
                >
                    New colleges
                </Text>
                <PeopleContainer>
                    {newUsers?.people?.map((person: User, key: number) => {
                        return (
                            <NewPerson key={key}>
                                <ImpactImage
                                    src={person?.imageURL}
                                    alt={person?.name}
                                    layout="fill"
                                    ratio="1/1"
                                    containerWidth="100%"
                                    style={{ borderRadius: "50%" }}
                                />
                                <Text
                                    tag="h4"
                                    additionalStyles={{
                                        textAlign: "center",
                                        marginTop: "8px",
                                    }}
                                >
                                    {person?.name}
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

export const PeopleContainer = styled.div({
    marginTop: "12px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    [mq("lg")]: {
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "24px",
    },
});

export const NewPerson = styled.div({
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [mq("lg")]: {
        padding: "16px",
    },
});
