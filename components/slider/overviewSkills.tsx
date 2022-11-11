import { useEffect, useState } from "react";
import styled from "styled-components";
import { Project, Skill, User } from "~/models";
import { colors } from "~/util/colorPalette";
import { mq } from "~/util/media-queries";
import ImpactImage from "../image/image";
import { SvgIcon } from "../svg-icon";
import Text from "../typography/text";
import { motion, AnimatePresence } from "framer-motion";
import SliderSkillsOverview from "./skillsContent";
import SliderPeopleOverview from "./peopleContent";
import SliderProjectsOverview from "./projectContent";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import PeopleContent from "./peopleContent";
import SkillsContent from "./skillsContent";
import ProjectsContent from "./projectContent";

type SliderOverviewProps = {
    data: Skill;
};

const SkillsOverview = ({ data }: SliderOverviewProps) => {
    const [activeTab, setActiveTab] = useState<number | null>(null);
    console.log(data);
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
                        <PeopleContent data={data} />
                    ) : activeTab === 1 ? (
                        <SkillsContent data={data} />
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
});

export const NavWrapper = styled.nav({
    display: "flex",
});

export const NavNode = styled.a({
    paddingRight: "24px",
});
