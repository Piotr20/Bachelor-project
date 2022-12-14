import { useEffect, useState } from "react";
import styled from "styled-components";
import { Project, Skill, User } from "~/models";
import Text from "../../typography/text";
import { motion, AnimatePresence } from "framer-motion";
import PeopleContent from "../contents/peopleContent";
import ProjectsContent from "../contents/projectContent";
import { mq } from "~/util/media-queries";

type SliderOverviewProps = {
    data: Skill;
};

const SkillsOverview = ({ data }: SliderOverviewProps) => {
    const [activeTab, setActiveTab] = useState<number | null>(0);

    useEffect(() => {
        setActiveTab(0);
    }, [data]);

    return (
        <OverviewContainer>
            <NavWrapper>
                <NavNode onClick={() => setActiveTab(0)}>
                    <Text
                        tag="h4"
                        additionalStyles={{
                            cursor: "pointer",
                            transition: "all .3s ease",
                            opacity: activeTab === 0 ? 1 : 0.3,
                        }}
                    >
                        People
                    </Text>
                </NavNode>
                <NavNode onClick={() => setActiveTab(1)}>
                    <Text
                        tag="h4"
                        additionalStyles={{
                            cursor: "pointer",
                            transition: "all .3s ease",
                            opacity: activeTab === 1 ? 1 : 0.3,
                        }}
                    >
                        Projects
                    </Text>
                </NavNode>
            </NavWrapper>
            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: "100" }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 0.4,
                        },
                    }}
                    exit={{
                        opacity: 0,
                        x: "-100",
                        transition: {
                            duration: 0.4,
                        },
                    }}
                >
                    {activeTab === 0 ? (
                        <PeopleContent people={data?.people as User[]} />
                    ) : activeTab === 1 ? (
                        <ProjectsContent projects={data?.projects as Project[]} />
                    ) : null}
                </motion.div>
            </AnimatePresence>
        </OverviewContainer>
    );
};

export default SkillsOverview;

export const OverviewContainer = styled.div({
    marginTop: "24px",
    overflow: "hidden",
    padding: "0 24px",
    [mq("lg")]: {
        padding: "0 40px",
    },
});

export const NavWrapper = styled.nav({
    display: "flex",
});

export const NavNode = styled.a({
    paddingRight: "24px",
});
