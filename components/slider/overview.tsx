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

type SliderOverviewProps = {
    data: User & Project & Skill;
};

const SliderOverview = ({ data }: SliderOverviewProps) => {
    const [openedIndex, setOpenedIndex] = useState<number>(0);
    const [sliderDataType, setSliderDataType] = useState<string | string[] | undefined>(undefined);
    const router = useRouter();

    const handleToggle = (index: number) => {
        if (openedIndex === index) {
            return setOpenedIndex(0);
        }
        setOpenedIndex(index);
    };

    useEffect(() => {
        setSliderDataType(router.query.type);
    }, [router.query.type]);

    const overviewNav =
        sliderDataType === "person"
            ? [
                  {
                      name: "Projects",
                  },
                  {
                      name: "Skills",
                  },
              ]
            : sliderDataType === "project"
            ? [
                  {
                      name: "People",
                  },
                  {
                      name: "Skills",
                  },
              ]
            : [
                  {
                      name: "People",
                  },
                  {
                      name: "Projects",
                  },
              ];

    const listings =
        sliderDataType === "person"
            ? [
                  <>
                      <SliderProjectsOverview data={data} />
                  </>,
                  <>
                      <SliderSkillsOverview data={data} />
                  </>,
              ]
            : sliderDataType === "project"
            ? [
                  <>
                      <SliderPeopleOverview data={data} />
                  </>,
                  <>
                      <SliderSkillsOverview data={data} />
                  </>,
              ]
            : [
                  <>
                      <SliderPeopleOverview data={data} />
                  </>,
                  <>
                      <SliderProjectsOverview data={data} />
                  </>,
              ];
    return (
        <OverviewContainer>
            <NavWrapper>
                {overviewNav?.map((node: User & Project & Skill, index) => {
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
