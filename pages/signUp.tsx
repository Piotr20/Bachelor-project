import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { flexCenter } from "~/styles/style.helper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Step1 from "~/components/signUp/step1";
import Step2 from "~/components/signUp/step2";
import Step3 from "~/components/signUp/step3";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "~/store/userStore";
import { useSession } from "next-auth/react";
import { User } from "~/models";
import { mq } from "~/util/media-queries";
import { Button } from "~/components/button/button";
import SignUpBg from "../public/images/impact-signUp.webp";
import ImpactImage from "~/components/image/image";
import Text from "~/components/typography/text";
import ProgressBar from "~/components/signUp/progressBar";
import { colors } from "~/util/colorPalette";
import { authHelper } from "~/lib/helpers";

const SignUp: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [step, setStep] = useState<number>(1);
    const { user, setUserData } = useUserStore((state) => ({
        user: state.user,
        setUserData: state.setUserData,
    }));
    const stepsComponents = [
        <>
            <Step1 user={user} setUser={setUserData} />
        </>,

        <>
            <Step2 user={user} setUser={setUserData} />
        </>,
        <>
            <Step3 user={user} setUser={setUserData} />
        </>,
    ];
    async function createUser() {
        const response = await fetch(`./api/user/createUser`, {
            method: "POST",
            body: JSON.stringify({
                name: session?.user?.name,
                email: session?.user?.email,
                experienceYears: user?.experienceYears,
                phone: user?.phone,
                department: user?.department,
                location: user?.location,
                role: user?.role,
                projects: user?.projects,
                skills: user?.skills,
                imageURL:
                    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            }),
        });
        const mongoUser: User = await response.json();
        authHelper(status, session, router, setUserData);
        router.push("/");
    }

    useEffect(() => {
        router.replace({
            query: { ...router.query, step: `${step}` },
        });
    }, [step]);

    return (
        <>
            <Head>
                <title>Bachelor project</title>
                <meta name="description" content="Best bachelor project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <StyledMain>
                <>
                    <ImpactImage
                        layout="responsive"
                        objectFit="cover"
                        containerStyles={{
                            width: "100%",
                            height: "100vh",
                            overflow: "hidden",
                            position: "absolute",
                            zIndex: "0",
                            filter: "brightness(65%)",
                        }}
                        src={SignUpBg}
                        alt="Impact people"
                    />
                    <StyledFormContentBox>
                        <StyledForm onSubmit={(e) => e.preventDefault()}>
                            <Text
                                tag="h2"
                                additionalStyles={{
                                    textAlign: "center",
                                }}
                            >
                                Welcome to IMPACT connect
                            </Text>
                            <Text
                                tag="p"
                                additionalStyles={{
                                    color: colors.primary.lightGrey,
                                    textAlign: "center",
                                    paddingTop: "4px",
                                    fontSize: "16px",
                                    [mq("xl")]: {
                                        fontSize: "20px",
                                    },
                                }}
                            >
                                Please fill-in all the missing information in your profile.
                            </Text>
                            <ProgressBar step={step} />
                            <AnimationContainer>
                                <AnimatePresence initial={false} mode="wait">
                                    <motion.div
                                        key={step}
                                        initial={{
                                            opacity: 0,
                                            x: "100%",
                                        }}
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
                                        <StyledFieldsWrapper>{stepsComponents[step - 1]}</StyledFieldsWrapper>
                                    </motion.div>
                                </AnimatePresence>
                            </AnimationContainer>
                            <StyledButtonWrapper>
                                {step !== 1 ? (
                                    <Button
                                        kind="secondary"
                                        onClick={() => setStep(step - 1)}
                                        additionalStyles={{
                                            marginRight: "auto",
                                        }}
                                    >
                                        Back
                                    </Button>
                                ) : null}
                                {step !== 3 ? (
                                    <Button
                                        kind="primary"
                                        onClick={() => setStep(step + 1)}
                                        additionalStyles={{
                                            marginLeft: "auto",
                                        }}
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        kind="primary"
                                        onClick={createUser}
                                        additionalStyles={{
                                            marginLeft: "auto",
                                        }}
                                    >
                                        Finish
                                    </Button>
                                )}
                            </StyledButtonWrapper>
                        </StyledForm>
                    </StyledFormContentBox>
                </>
            </StyledMain>
        </>
    );
};

export default SignUp;

export const StyledMain = styled.main({
    ...flexCenter,
    width: "100%",
    height: "100vh",
    overflow: "hidden",
});

export const StyledSignUp = styled.main({
    ...flexCenter,
    width: "100%",
    height: "100vh",
});

export const StyledForm = styled.form({
    display: "flex",
    flexDirection: "column",
    width: "80%",
    minHeight: "50%",
    [mq("lg")]: {
        width: "70%",
        minHeight: "75%",
    },
});

export const AnimationContainer = styled.div({
    minHeight: "50%",
});

export const StyledFormContentBox = styled.div({
    ...flexCenter,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    zIndex: "2",
    [mq("lg")]: {
        width: "45%",
        height: "75%",
        boxShadow: "0px 22px 30px -10px rgba(0, 0, 0, 0.1)",
        borderRadius: "40px",
    },
    [mq("xl")]: {
        width: "35%",
        height: "70%",
        boxShadow: "0px 22px 30px -10px rgba(0, 0, 0, 0.1)",
        borderRadius: "40px",
    },
});

export const StyledFieldsWrapper = styled.div({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "50%",
});

export const StyledButtonWrapper = styled.div({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "24px",
});

export const ButtonBack = styled.button({
    marginRight: "auto",
});
export const ButtonNext = styled.button({
    marginLeft: "auto",
});
export const ButtonFinish = styled.button({
    marginLeft: "auto",
});
