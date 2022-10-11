import styled from "styled-components";
import { flexCenter } from "~/styles/style.helper";

type SpinnerProps = {
    status: "authenticated" | "loading" | "unauthenticated";
};

const Spinner = ({ status }: SpinnerProps) => {
    return (
        <LoadingCover shouldShow={status}>
            <StyledSpinner viewBox="0 0 50 50">
                <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="4"
                />
            </StyledSpinner>
        </LoadingCover>
    );
};

export default Spinner;

export const LoadingCover = styled.div<{
    shouldShow: "authenticated" | "loading" | "unauthenticated";
}>(({ shouldShow }) => ({
    ...flexCenter,
    width: "100%",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: "998",
    transition: "opacity 0.3s ease",
    opacity: shouldShow !== "authenticated" ? 1 : 0,
    pointerEvents: shouldShow !== "authenticated" ? "initial" : "none",
    backgroundColor: "white",
}));
const StyledSpinner = styled.svg`
    animation: rotate 2s linear infinite;
    margin: -25px 0 0 -25px;
    width: 50px;
    height: 50px;

    & .path {
        stroke: #5652bf;
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
`;
