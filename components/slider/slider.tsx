import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavStore } from "~/store/store";

import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { SvgIcon } from "../svg-icon";
import ImpactImage from "../image/image";
import { useSearchStore } from "~/store/searchStore";
import { Project, Skill, User } from "~/models";
import { exampleDataProject, exampleDataUser } from "~/util/sliderData";
import SliderBioPerson from "./bios/sliderBioPerson";
import { mq } from "~/util/media-queries";
import SliderBioProject from "./bios/sliderBioProject";
import SliderBioSkill from "./bios/sliderBioSkill";
import PersonOverview from "./overviews/overviewPerson";
import ProjectsOverview from "./overviews/overviewProjects";
import SkillsOverview from "./overviews/overviewSkills";

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
                (result: User | Project | Skill) => result?._id === router.query.openedId
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

        setProject(project);
        console.log(data);
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
                            <PersonOverview data={person} />
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
});
export const AnimationContainer = styled.div({
    ["&>div"]: {
        width: "85%",
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
