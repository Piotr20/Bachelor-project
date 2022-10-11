import React, { FC, useState } from "react";
import styled from "styled-components";
import { SvgIcon } from "~/components/svg-icon";
import { flexCenter } from "~/styles/style.helper";
import { colors } from "../../util/colorPalette";
import {
    ButtonSize,
    ButtonVariant,
    button_size,
    getColor,
} from "./button.helpers";

type ButtonProps = {
    label: string;
    variant: ButtonVariant;
    buttonType: "CTA" | "NoIcon" | "OnlyIcon";
    disabled: boolean;
    buttonSize: ButtonSize;
    onClick?: () => void;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export const Button: FC<ButtonProps> = ({
    label,
    variant,
    buttonType,
    disabled,
    buttonSize,
    onClick,
    ...props
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    return (
        <StyledButton
            buttonType={buttonType}
            variant={variant}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            buttonSize={buttonSize}
            disabled={disabled}
            {...props}
        >
            {buttonType === "CTA" && (
                <>
                    {isHovered && (
                        <SvgIcon
                            svg="arrowRight"
                            size={button_size[buttonSize]?.arrowSize}
                        />
                    )}
                    {label}
                    {!isHovered && (
                        <SvgIcon
                            svg="arrowRight"
                            size={button_size[buttonSize]?.arrowSize}
                        />
                    )}
                </>
            )}

            {buttonType === "NoIcon" && (
                <>
                    {isPressed ? (
                        <SvgIcon
                            svg="checked"
                            size={button_size[buttonSize]?.checkedSize}
                        />
                    ) : (
                        <> {label}</>
                    )}
                </>
            )}

            {buttonType === "OnlyIcon" && (
                <>
                    {isPressed ? (
                        <SvgIcon
                            svg="checked"
                            size={button_size[buttonSize]?.checkedSize}
                        />
                    ) : (
                        <SvgIcon
                            svg="arrowRight"
                            size={button_size[buttonSize]?.onlyIconArrow}
                        />
                    )}
                </>
            )}
        </StyledButton>
    );
};

const StyledButton = styled.button<{
    variant: ButtonVariant;
    buttonSize: ButtonSize;
    buttonType: string;
}>(({ variant, buttonSize, buttonType }) => {
    const { backgroundColor, color, iconColor, borderColor } =
        getColor(variant);

    return {
        ...flexCenter,
        position: "relative",
        gap: 10,
        borderRadius: 100,
        padding:
            buttonType === "OnlyIcon"
                ? "none"
                : button_size[buttonSize]?.padding,
        backgroundColor: backgroundColor.default,
        color: color.default,
        fontSize: button_size[buttonSize]?.fontSize,
        cursor: "pointer",
        border: "1px solid",
        borderColor: borderColor.default,
        width:
            buttonType === "NoIcon"
                ? button_size[buttonSize]?.buttonWidth
                : buttonType === "OnlyIcon"
                ? button_size[buttonSize]?.onlyIconWidth
                : "auto",
        height:
            buttonType === "NoIcon"
                ? button_size[buttonSize]?.buttonHeight
                : buttonType === "OnlyIcon"
                ? button_size[buttonSize]?.onlyIconHeight
                : "auto",

        ["svg"]: {
            ...flexCenter,
            fill: iconColor.default,
        },

        ["&:hover"]: {
            backgroundColor: backgroundColor.hover,
            color: color.hover,
            borderColor: borderColor.hover,
            ["svg"]: {
                fill: iconColor.hover,
            },
        },

        ["&:active"]: {
            color: color.default,
            ["svg"]: {
                fill: iconColor.default,
            },
        },

        ["&:focus"]: {
            outline: `2px solid ${colors.notification.focus500}`,
            border: "transparent",
        },

        ["&:disabled"]: {
            opacity: 0.5,
            pointerEvents: "none",
        },
    };
});
