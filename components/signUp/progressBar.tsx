import Select from "react-select";
import { useEffect, useState } from "react";
import { StepProps } from "~/models/signUpSteps";
import {
    getAllFromEndpointHelper,
    handleUserPropsHelper,
} from "~/lib/helpers/signUp.helper";
import styled from "styled-components";
import Text from "../typography/text";
import { colors } from "~/util/colorPalette";
import { mq } from "~/util/media-queries";

type ProgressBarProps = {
    step: number;
};

const ProgressBar = ({ step }: ProgressBarProps) => {
    return (
        <ProgressBarContainer>
            <ProgressBarStep>
                <Text
                    tag="p"
                    additionalStyles={{
                        fontSize: "14px",
                    }}
                >
                    Proffile
                </Text>
                <Bar active={step > 0} />
            </ProgressBarStep>
            <ProgressBarStep>
                <Text
                    tag="p"
                    additionalStyles={{
                        fontSize: "14px",
                    }}
                >
                    Projects
                </Text>
                <Bar active={step > 1} />
            </ProgressBarStep>
            <ProgressBarStep>
                <Text
                    tag="p"
                    additionalStyles={{
                        fontSize: "14px",
                    }}
                >
                    Skills
                </Text>
                <Bar active={step > 2} />
            </ProgressBarStep>
        </ProgressBarContainer>
    );
};

export default ProgressBar;

export const ProgressBarContainer = styled.div(() => ({
    display: "flex",
    justifyContent: "center",
    width: "80%",
    margin: "12px auto 24px auto",
}));

export const ProgressBarStep = styled.div({
    display: "flex",
    flexDirection: "column",
    width: "calc(100% / 3)",
    margin: "0 4px",
});

export const Bar = styled.span<{ active: boolean }>(({ active }) => ({
    backgroundColor: active
        ? colors.secondary.lightYellow
        : colors.primary.lightGrey,
    transition: "all .4s ease",
    height: "8px",
    borderRadius: "16px",
}));
