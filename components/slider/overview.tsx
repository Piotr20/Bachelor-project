import { useState } from "react";
import styled from "styled-components";
import { Project, Skill, User } from "~/models";
import { colors } from "~/util/colorPalette";
import { mq } from "~/util/media-queries";
import ImpactImage from "../image/image";
import { SvgIcon } from "../svg-icon";
import Text from "../typography/text";
import { motion, AnimatePresence } from "framer-motion";
import SliderSkillsOverview from "./skillsOverview";
import SliderPeopleOverview from "./peopleOverview";
import SliderProjectsOverview from "./projectsOverview";

type SliderOverviewProps = {
    data: User & Project & Skill;
};

const SliderOverview = ({ data }: SliderOverviewProps) => {
    const [openedIndex, setOpenedIndex] = useState<number>(0);

    const handleToggle = (index: number) => {
        if (openedIndex === index) {
            return setOpenedIndex(0);
        }
        setOpenedIndex(index);
    };
    const overviewNav = [
        {
            name: "Skills",
        },
        {
            name: "Projects",
        },
        {
            name: "People",
        },
    ];

    const listings = [
        <SliderSkillsOverview data={data} />,
        <SliderProjectsOverview data={data} />,
        <SliderPeopleOverview data={data} />,
    ];
    return (
        <OverviewContainer>
            <NavWrapper>
                {overviewNav?.map((node: User & Project & Skill, index) => {
                    console.log(data);
                    if (true) {
                        return (
                            <NavNode onClick={() => handleToggle(index)} key={index}>
                                <Text
                                    tag="h5"
                                    additionalStyles={{
                                        cursor: "pointer",
                                        transition: "all .3s ease",
                                        opacity: openedIndex === index ? 1 : 0.3,
                                    }}
                                >
                                    {node?.name}
                                </Text>
                            </NavNode>
                        );
                    }
                })}
            </NavWrapper>
            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={openedIndex}
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 0.4,
                        },
                    }}
                    exit={{
                        opacity: 0,
                        x: "-100%",
                        transition: {
                            duration: 0.4,
                        },
                    }}
                >
                    {listings[openedIndex]}
                </motion.div>
            </AnimatePresence>
        </OverviewContainer>
    );
};

export default SliderOverview;

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