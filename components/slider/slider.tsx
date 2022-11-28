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
import Text from "../typography/text";
import { handleSlideIn } from "~/lib/helpers/search.hepler";

const SlideIn = () => {
    const router = useRouter();
    const [person, setPerson] = useState<User>();
    const [project, setProject] = useState<Project>();
    const [skill, setSkill] = useState<Skill>();
    const [breadcrumbs, setBreadcrumbs] = useState<any>();

    const { openSlider, sliderData, setOpenSlider, setDataInSlider } =
        useNavStore((state) => ({
            openSlider: state.openSlider,
            sliderData: state.sliderData,
            setOpenSlider: state.setOpenSlider,
            setDataInSlider: state.setDataInSlider,
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
                setDataInSlider(findResultById);
            }
        } else if (router.query.openSlider === "false") {
            setOpenSlider(false);
        }
    }, [router.query.openSlider]);

    async function getSliderDataById(id?: string[] | string) {
        const response = await fetch("/api/all/getById", {
            method: "POST",
            body: JSON.stringify({
                id: id,
            }),
        });
        const data = await response.json();
        const { person, project, skill } = data;
        setPerson(person);
        setProject(project);
        setSkill(skill);
        if (person) {
            setDataInSlider(person);
        }
        if (project) {
            setDataInSlider(project);
        }
        if (skill) {
            setDataInSlider(skill);
        }
    }

    async function getBreadcrumbDataById(id?: string[] | string) {
        const response = await fetch("/api/all/getById", {
            method: "POST",
            body: JSON.stringify({
                id: id,
            }),
        });
        const data = await response.json();
        const { person, project, skill } = data;
        if (person) {
            setBreadcrumbs(person);
        }
        if (project) {
            setBreadcrumbs(project);
        }
        if (skill) {
            setBreadcrumbs(skill);
        }
    }

    useEffect(() => {
        getSliderDataById(router.query.openedId);
    }, [router.query.openedId]);

    useEffect(() => {
        getBreadcrumbDataById(router.query.breadcrumbId);
    }, [router.query.breadcrumbId]);

    return (
        <AnimationContainer tabIndex={1}>
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
                        {router?.query?.breadcrumbName &&
                        router?.query?.breadcrumbType &&
                        router?.query?.breadcrumbId ? (
                            <StyledBreadcrumb>
                                <Text
                                    onClick={() => {
                                        handleSlideIn(
                                            breadcrumbs,
                                            setOpenSlider,
                                            setDataInSlider,
                                            undefined,
                                            router?.query?.breadcrumbType as
                                                | "project"
                                                | "skill"
                                                | "person"
                                                | undefined,
                                            openSlider
                                        );
                                    }}
                                    tag="h6"
                                    additionalStyles={{
                                        backgroundImage:
                                            "linear-gradient(#feff00,#feff00)",
                                        backgroundSize: "0 40%",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "0 95%",
                                        transition: "all 0.1s ease",
                                        padding: "0 2px",
                                        cursor: "pointer",
                                        ["&:hover"]: {
                                            backgroundImage:
                                                "linear-gradient(#feff00,#feff00)",
                                            backgroundSize: "100% 40%",
                                            backgroundPosition: "0 95%",
                                            color: colors.primary.black,
                                        },
                                    }}
                                >
                                    {router?.query?.breadcrumbName}
                                </Text>
                                <Text
                                    tag="h6"
                                    additionalStyles={{
                                        padding: "0 4px",
                                    }}
                                >
                                    {">"}
                                </Text>

                                <Text tag="h6">{sliderData?.name}</Text>
                            </StyledBreadcrumb>
                        ) : null}
                    </StyledIconContainer>
                    {person ? (
                        <>
                            <SliderBioPerson data={person} />
                            <PersonOverview data={person} />
                            <ActionButtonsWrapper>
                                <StyledAnchor href={`tel:${person?.phone}`}>
                                    <SvgIcon svg="phone" />
                                </StyledAnchor>
                                <StyledAnchor href={`mailto:${person?.email}`}>
                                    <SvgIcon svg="email" />
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
    height: "100vh",
    boxShadow: " 0px -22px 30px -10px rgba(0, 0, 0, 0.16)",
    overflowY: "auto",
    overflowX: "hidden",
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

export const StyledIconContainer = styled.div({
    position: "absolute",
    zIndex: 5,
    top: "12px",
    padding: "0 24px",
    display: "flex",
    [mq("lg")]: {
        top: "24px",
        padding: "0 40px",
    },
});

export const StyledSliderCloseWrapper = styled.span({
    cursor: "pointer",
    backgroundColor: colors.base.white,
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all .2s ease",
    ["&:hover"]: {
        backgroundColor: colors.secondary.lightYellow,
        ["path"]: {},
    },
    ["span"]: {
        width: "32px !important",
        height: "32px !important",
        ["svg"]: {
            width: "32px !important",
            height: "32px !important",
        },
    },
});

export const StyledBreadcrumb = styled.div({
    backgroundColor: colors.base.white,
    marginLeft: "12px",
    alignSelf: "center",
    padding: "8px 16px",
    borderRadius: "32px",
    transition: "all .2s ease",
    fontFamily: "Flama Condensed",
    display: "flex",
    ["&:hover"]: {
        ["path"]: {},
    },
});

export const ActionButtonsWrapper = styled.div({
    display: "flex",
    width: "100%",
    margin: "0 auto",
    marginTop: "auto",
    gap: "8px",
    justifyContent: "flex-end",
    paddingBottom: "12px",
    paddingTop: "12px",

    paddingRight: "24px",
});

export const StyledAnchor = styled.a({
    fontFamily: "Flama Condensed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    border: "none",
    outline: "none",
    lineHeight: "155%",
    cursor: "pointer",
    letterSpacing: "1.75px",
    padding: "12px",
    fontSize: "16px",
    [mq("lg")]: {
        width: "auto",
        padding: "12px",
        fontSize: "16px",
    },
    backgroundColor: colors.primary.black,
    color: colors.base.white,
    transition: "all 0.3s ease",
    borderRadius: "48px",
    ["&:hover"]: {
        backgroundColor: colors.secondary.lightYellow,
        color: colors.primary.black,
        ["path"]: {
            fill: colors.primary.black,
        },
    },
    ["&>span"]: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "20px !important",
        height: "20px !important",
        ["svg"]: {
            width: "100%",
            height: "100%",
        },
        [mq("lg")]: {
            width: "24px !important",
            height: "24px !important",
        },
    },
});
