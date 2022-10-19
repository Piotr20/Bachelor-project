import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import { SvgIcon } from "~/components/svg-icon";
import HOCAuthCheck from "~/components/auth/authCheck";
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

const SignUp: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [step, setStep] = useState<number>(1);
    const { user, setUserData } = useUserStore((state) => ({
        user: state.user,
        setUserData: state.setUserData,
    }));
    const stepsComponents = [
        <Step1 user={user} setUser={setUserData} />,
        <Step2 user={user} setUser={setUserData} />,
        <Step3 user={user} setUser={setUserData} />,
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
                    "https://media-exp1.licdn.com/dms/image/C4E03AQESdYwClrBdZw/profile-displayphoto-shrink_800_800/0/1603216082942?e=2147483647&v=beta&t=NyT8ZiZcpnvJd9IINgBgp_fSc8Dk2LIpQpu6jsyXA3g",
            }),
        });
        const mongoUser: User = await response.json();
        setUserData(mongoUser);
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
                <StyledFormContentBox onSubmit={(e) => e.preventDefault()}>
                    <StyledForm>
                        <AnimatePresence initial={false} mode="wait">
                            <motion.div
                                key={step}
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
                                <StyledFieldsWrapper>
                                    {stepsComponents[step - 1]}
                                </StyledFieldsWrapper>
                            </motion.div>
                        </AnimatePresence>
                        <StyledButtonWrapper>
                            {step !== 1 ? (
                                <ButtonBack onClick={() => setStep(step - 1)}>
                                    Back
                                </ButtonBack>
                            ) : null}
                            {step !== 3 ? (
                                <ButtonNext onClick={() => setStep(step + 1)}>
                                    Next
                                </ButtonNext>
                            ) : (
                                <ButtonFinish onClick={createUser}>
                                    Finish
                                </ButtonFinish>
                            )}
                        </StyledButtonWrapper>
                    </StyledForm>
                </StyledFormContentBox>
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

export const StyledForm = styled.form({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "70%",
    minHeight: "50%",
    overflow: "hidden",
});

export const StyledFormContentBox = styled.div({
    ...flexCenter,
    flexDirection: "column",
    width: "30%",
    height: "60%",
    border: "2px solid black",
    overflow: "hidden",
});

export const StyledFieldsWrapper = styled.div({
    ...flexCenter,
    flexDirection: "column",
    width: "100%",
    minHeight: "50%",
});

export const StyledButtonWrapper = styled.div({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
