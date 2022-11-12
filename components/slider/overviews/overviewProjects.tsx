import { useEffect, useState } from "react";
import styled from "styled-components";
import { Project } from "~/models";
import Text from "../../typography/text";
import { motion, AnimatePresence } from "framer-motion";
import PeopleContent from "../contents/peopleContent";
import SkillsContent from "../contents/skillsContent";

type SliderOverviewProps = {
    data: Project;
};

const ProjectsOverview = ({ data }: SliderOverviewProps) => {
    const [activeTab, setActiveTab] = useState<number | null>(0);

    useEffect(() => {
        setActiveTab(0);
    }, [data]);

    return (
        <OverviewContainer>
            <NavWrapper>
                <NavNode onClick={() => setActiveTab(0)}>
                    <Text
                        tag="h5"
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
                        tag="h5"
                        additionalStyles={{
                            cursor: "pointer",
                            transition: "all .3s ease",
                            opacity: activeTab === 1 ? 1 : 0.3,
                        }}
                    >
                        Skills
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
                        <PeopleContent people={data?.people} />
                    ) : activeTab === 1 ? (
                        <SkillsContent skills={data?.skills} />
                    ) : null}
                </motion.div>
            </AnimatePresence>
        </OverviewContainer>
    );
};

export default ProjectsOverview;

export const OverviewContainer = styled.div({
    marginTop: "24px",
    overflow: "hidden",
});

export const NavWrapper = styled.nav({
    display: "flex",
});

export const NavNode = styled.a({
    paddingRight: "24px",
});
