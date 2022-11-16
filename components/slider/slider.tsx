import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavStore } from "~/store/store";

import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { SvgIcon } from "../svg-icon";
import { useSearchStore } from "~/store/searchStore";
import { Project, Skill, User } from "~/models";
import SliderBioPerson from "./bios/sliderBioPerson";
import { mq } from "~/util/media-queries";
import SliderBioProject from "./bios/sliderBioProject";
import SliderBioSkill from "./bios/sliderBioSkill";
import PersonOverview from "./overviews/overviewPerson";
import ProjectsOverview from "./overviews/overviewProjects";
import SkillsOverview from "./overviews/overviewSkills";
import { Button } from "../button/button";
import { colors } from "~/util/colorPalette";

const SlideIn = () => {
    const router = useRouter();
    const [sliderData, setSliderData] = useState<User | Project | Skill>();
    const [person, setPerson] = useState<User>();
    const [project, setProject] = useState<Project>();
    const [skill, setSkill] = useState<Skill>();

    const { openSlider, setOpenSlider } = useNavStore((state) => ({
        openSlider: state.openSlider,
        sliderData: state.sliderData,
        setOpenSlider: state.setOpenSlider,
    }));
    const { searchResults, setSearchResults } = useSearchStore((state) => ({
        searchResults: state.searchResults,
        setSearchResults: state.setSearchResults,
    }));

    useEffect(() => {
        if (router.query.openSlider === "true") {
            setOpenSlider(true);
            const findResultById = searchResults?.find(
                (result: User | Project | Skill) =>
                    result?._id === router.query.openedId
            );
            if (findResultById) {
                setSliderData(findResultById);
            }
        } else if (router.query.openSlider === "false") {
            setOpenSlider(false);
        }
    }, [router.query.openSlider]);

    async function getSliderDataById() {
        const response = await fetch("/api/all/getById", {
            method: "POST",
            body: JSON.stringify({
                id: router.query.openedId,
            }),
        });
        const data = await response.json();
        const { person, project, skill } = data;

        setPerson(person);
        setProject(project);
        setSkill(skill);
    }

    useEffect(() => {
        getSliderDataById();
    }, [router.query.openedId]);

    return (
        <AnimationContainer>
            <motion.div
                initial={{
                    position: "fixed",
                    top: 0,
                    right: "-100%",
                    zIndex: 100,
                }}
                animate={
                    openSlider
                        ? {
                              right: 0,
                              transition: {
                                  duration: 0.5,
                              },
                          }
                        : {
                              right: "-100%",
                              transition: {
                                  duration: 0.5,
                              },
                          }
                }
            >
                <StyledSliderWrapper>
                    <StyledIconContainer>
                        <StyledSliderCloseWrapper
                            onClick={() => {
                                setOpenSlider(false);
                            }}
                        >
                            <SvgIcon svg="sliderArrowRight" />
                        </StyledSliderCloseWrapper>
                    </StyledIconContainer>
                    {person ? (
                        <>
                            <SliderBioPerson data={person} />
                            <PersonOverview data={person} />{" "}
                            <ActionButtonsWrapper>
                                <StyledAnchor href={`tel:${person?.phone}`}>
                                    <SvgIcon svg="phone" />
                                    {person?.phone}
                                </StyledAnchor>
                                <StyledAnchor href={`mailto:${person?.email}`}>
                                    <SvgIcon svg="email" />
                                    {person?.email}
                                </StyledAnchor>
                            </ActionButtonsWrapper>
                        </>
                    ) : null}
                    {project ? (
                        <>
                            <SliderBioProject data={project} />
                            <ProjectsOverview data={project} />
                        </>
                    ) : null}
                    {skill ? (
                        <>
                            <SliderBioSkill data={skill} />
                            <SkillsOverview data={skill} />
                        </>
                    ) : null}
                </StyledSliderWrapper>
            </motion.div>
        </AnimationContainer>
    );
};

export default SlideIn;

export const StyledSliderWrapper = styled.div({
    backgroundColor: "white",
    padding: "24px",
    height: "100vh",
    boxShadow: " 0px -22px 30px -10px rgba(0, 0, 0, 0.16)",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
});
export const AnimationContainer = styled.div({
    ["&>div"]: {
        width: "100%",
        [mq("lg")]: {
            width: "50%",
        },
    },
});

export const StyledIconContainer = styled.div({});

export const StyledSliderCloseWrapper = styled.span({
    display: "inline-block",
    cursor: "pointer",
    ["svg"]: {
        width: "32px !important",
        height: "32px !important",
    },
});

export const ActionButtonsWrapper = styled.div({
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    margin: "0 auto",
    marginTop: "auto",
    gap: "8px",
    justifyContent: "center",
});

export const StyledAnchor = styled.a({
    fontFamily: "Flama",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    border: "none",
    outline: "none",
    lineHeight: "155%",
    cursor: "pointer",
    letterSpacing: "1.75px",
    padding: "8px 36px",
    fontSize: "16px",
    width: "100%",
    [mq("lg")]: {
        width: "auto",
        padding: "8px 36px",
        fontSize: "16px",
    },
    backgroundColor: colors.primary.black,
    color: colors.base.white,
    transition: "all 0.3s ease",
    borderRadius: "48px",
    ["&:hover"]: {
        backgroundColor: colors.secondary.lightYellow,
        color: colors.primary.black,
    },
    ["&>span"]: {
        width: "16px !important",
        height: "16px !important",
        marginRight: "8px",
        [mq("md")]: {
            width: "20px !important",
            height: "20px !important",
        },
    },
});
