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

const SignUp: NextPage = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const stepsComponents = [<Step1 />, <Step2 />, <Step3 />];

    useEffect(() => {
        console.log(step);
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
                <StyledForm onSubmit={(e) => e.preventDefault()}>
                    {stepsComponents[step - 1]}
                    <StyledButtonWrapper>
                        {step !== 1 ? (
                            <button onClick={() => setStep(step - 1)}>
                                Back
                            </button>
                        ) : null}
                        {step !== 3 ? (
                            <button onClick={() => setStep(step + 1)}>
                                Next
                            </button>
                        ) : null}
                    </StyledButtonWrapper>
                </StyledForm>
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

export const StyledForm = styled.form(({}) => ({
    ...flexCenter,
    flexDirection: "column",
    width: "30%",
    height: "60%",
    border: "2px solid black",
}));

export const StyledButtonWrapper = styled.div(({}) => ({
    width: "30%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}));
