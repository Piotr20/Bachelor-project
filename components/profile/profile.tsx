import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavStore } from "~/store/store";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { SvgIcon } from "../svg-icon";
import { useSearchStore } from "~/store/searchStore";
import { Project, Skill, User } from "~/models";
import SliderBioPerson from "../slider/bios/sliderBioPerson";
import { mq } from "~/util/media-queries";
import PersonOverview from "../slider/overviews/overviewPerson";
import { useUserStore } from "~/store/userStore";
import useAuth from "~/hooks/useAuth";

const Profile = () => {
    const router = useRouter();
    const { user, openProfile, setOpenProfile } = useUserStore((state) => ({
        user: state.user,
        openProfile: state.openProfile,
        setOpenProfile: state.setOpenProfile,
    }));
    const { authSignIn, authSignOut } = useAuth();

    useEffect(() => {
        if (router.query.openProfile === "true") {
            setOpenProfile(true);
        } else {
            setOpenProfile(false);
        }
    }, [router.query.openProfile]);

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
                    openProfile
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
                                setOpenProfile(false);
                            }}
                        >
                            <SvgIcon svg="sliderArrowRight" />
                        </StyledSliderCloseWrapper>
                        <IconGroup>
                            <StyledSliderEditWrapper
                                onClick={() => {
                                    setOpenProfile(false);
                                }}
                            >
                                <SvgIcon svg="profileEdit" />
                            </StyledSliderEditWrapper>
                            <StyledSliderSignOutWrapper onClick={authSignOut}>
                                <SvgIcon svg="logOut" />
                            </StyledSliderSignOutWrapper>
                        </IconGroup>
                    </StyledIconContainer>

                    <SliderBioPerson data={user} />
                    <PersonOverview data={user} />
                </StyledSliderWrapper>
            </motion.div>
        </AnimationContainer>
    );
};

export default Profile;

export const StyledSliderWrapper = styled.div({
    backgroundColor: "white",
    padding: "24px",
    height: "100vh",
    boxShadow: " 0px -22px 30px -10px rgba(0, 0, 0, 0.16)",
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
    display: "flex",
    justifyContent: "space-between",
});

export const StyledSliderCloseWrapper = styled.span({
    display: "inline-block",
    cursor: "pointer",
    ["svg"]: {
        width: "32px !important",
        height: "32px !important",
    },
});

export const StyledSliderEditWrapper = styled.span({
    display: "inline-block",
    cursor: "pointer",
    marginRight: "12px",
    ["svg"]: {
        width: "32px !important",
        height: "32px !important",
    },
});

export const StyledSliderSignOutWrapper = styled.span({
    display: "inline-block",
    cursor: "pointer",
    ["svg"]: {
        width: "32px !important",
        height: "32px !important",
    },
});
export const IconGroup = styled.div({});
