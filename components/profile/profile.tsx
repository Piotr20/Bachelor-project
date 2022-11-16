import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavStore } from "~/store/store";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { SvgIcon } from "../svg-icon";
import { useSearchStore } from "~/store/searchStore";
import { Project, Skill, User } from "~/models";
import SliderBioPerson from "../slider/bios/sliderBioPerson";
import { mq } from "~/util/media-queries";
import PersonOverview from "../slider/overviews/overviewPerson";
import { useUserStore } from "~/store/userStore";
import useAuth from "~/hooks/useAuth";
import Text from "../typography/text";
import { colors } from "~/util/colorPalette";
import ImpactImage from "../image/image";
import ProfileOverview from "./profileOverview";
import ProfileEditView from "./profileEditView";

const Profile = () => {
    const router = useRouter();
    const { user, openProfile, editMode, setOpenProfile, setEditMode } =
        useUserStore((state) => ({
            user: state.user,
            openProfile: state.openProfile,
            editMode: state.editMode,
            setOpenProfile: state.setOpenProfile,
            setEditMode: state.setEditMode,
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
                                    setEditMode(true);
                                }}
                            >
                                <SvgIcon svg="profileEdit" />
                            </StyledSliderEditWrapper>
                            <StyledSliderSignOutWrapper onClick={authSignOut}>
                                <SvgIcon svg="logOut" />
                            </StyledSliderSignOutWrapper>
                        </IconGroup>
                    </StyledIconContainer>

                    <BioContainer>
                        <ImpactImage
                            src={user?.imageURL}
                            alt="alt text"
                            layout="fill"
                            ratio="1/1"
                            objectFit="contain"
                            containerStyles={{
                                width: "50%",
                                [mq("lg")]: {
                                    width: "184px",
                                },
                                [mq("xl")]: {
                                    width: "200px",
                                },
                            }}
                            placeholderStyles={{
                                width: "50%",
                                aspectRatio: "1/1",
                                borderRadius: "50%",
                                [mq("lg")]: {
                                    width: "184px",
                                },
                                [mq("xl")]: {
                                    width: "200px",
                                },
                            }}
                            style={{ borderRadius: "50%" }}
                        />
                        <Text
                            tag="h3"
                            additionalStyles={{
                                marginTop: "16px",
                                [mq("lg")]: {
                                    marginTop: "32px",
                                },
                                [mq("xl")]: {
                                    marginTop: "40px",
                                },
                            }}
                        >
                            {user?.name}
                        </Text>
                    </BioContainer>

                    <AnimatePresence initial={false} mode="wait">
                        <motion.div
                            key={`${editMode}`}
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
                            {!editMode ? (
                                <ProfileOverview user={user} />
                            ) : (
                                <ProfileEditView />
                            )}
                        </motion.div>
                    </AnimatePresence>
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

export const BioContainer = styled.div({
    marginTop: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

export const IconContainer = styled.div({
    display: "flex",
    marginTop: "8px",
    opacity: 0.8,
    ["svg"]: {
        width: "24px !important",
        height: "24px !important",
    },
});
