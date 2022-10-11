import React, { FC, useRef, useState } from "react";
import styled from "styled-components";
import { SvgIcon } from "../svg-icon";
import { colors } from "../../util/colorPalette";
import { InputMessage } from "./inputMessage";
import { Status, TextAlignment } from "~/models/ui-types";
import { getStatusColor } from "~/lib/helpers/color.helper";

export type InputProps = {
    label?: string;
    maxInputLenght?: number;
    disableMaxInputLenght?: boolean;
    disabled?: boolean;
    searchIconRight?: boolean;
    inputIconLeft?: boolean;
    hideTextMessage?: boolean;
    color?: Status;
    textAlignment?: TextAlignment;
    inputId?: string;
    textMessage?: string;
    inputType?: string;
    placeholderInputText?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "children">;

export const Input: FC<InputProps> = ({
    label,
    maxInputLenght,
    disableMaxInputLenght,
    disabled,
    searchIconRight,
    inputIconLeft,
    color = "default",
    textAlignment,
    hideTextMessage,
    textMessage,
    inputId,
    inputType,
    placeholderInputText,
    ...props
}) => {
    const [wordCount, setWordCount] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const [focus, setFocus] = useState(false);

    const borderColor = getStatusColor(color);

    return (
        <>
            <StyledLabel htmlFor={inputId}> {label} </StyledLabel>
            <InputWrapper
                borderColor={focus ? colors.notification.focus500 : borderColor}
                onClick={() => inputRef?.current?.focus()}
                disabled={disabled}
                {...props}
                color={color}
            >
                {inputIconLeft && (
                    <IconWrapper>
                        {color === "default" ? (
                            <SvgIcon svg={"searchIcon"} size={16} />
                        ) : null}
                        {color === "success" ? (
                            <SvgIcon svg={"successMessage"} size={16} />
                        ) : null}
                        {color === "error" ? (
                            <SvgIcon svg={"errorTextIcon"} size={16} />
                        ) : null}
                    </IconWrapper>
                )}

                <StyledInput
                    ref={inputRef}
                    placeholder={placeholderInputText}
                    {...props}
                    maxLength={maxInputLenght}
                    onChange={(e) => setWordCount(e.target.value.length)}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    disabled={disabled}
                    id={inputId}
                    type={inputType}
                />
                {searchIconRight && (
                    <IconWrapper>
                        <SvgIcon svg="searchIcon" size={16} />
                    </IconWrapper>
                )}
            </InputWrapper>

            <InfoSection>
                {hideTextMessage && (
                    <InputMessage
                        textAlignment={textAlignment}
                        color={color}
                        textMessage={textMessage}
                    ></InputMessage>
                )}

                {disableMaxInputLenght && (
                    <StyledCharacterCounter>
                        {wordCount}/{maxInputLenght}
                    </StyledCharacterCounter>
                )}
            </InfoSection>
        </>
    );
};

const StyledInput = styled.input({
    flex: 1,
    color: colors.base.grey800,
    fontSize: "16px",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    ["&::placeholder"]: {
        color: colors.base.grey500,
    },
});

const IconWrapper = styled.span({
    padding: "0px 8px",
    marginTop: "2px",
});

const InfoSection = styled.div({
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
    fontSize: "12px",
    alignContent: "center",
    color: colors.base.grey700,
});

const InputWrapper = styled.div<{
    borderColor?: string;
    disabled?: boolean;
    statusColor?: Status;
}>(({ borderColor, disabled }) => ({
    position: "relative",
    display: "flex",
    borderRadius: "50px",
    height: "20px",
    padding: "14px 16px",
    marginTop: "8px",
    backgroundColor: disabled ? colors.base.grey100 : colors.base.white,
    border: `1px solid ${borderColor || colors.base.grey300}`,
    boxSizing: "content-box",
    ["&:active"]: {
        border: disabled ? `1px ${colors.base.grey300}` : "1px solid #666666",
        color: colors.base.grey800,
    },
    ["&:focus"]: {
        border: "1px solid #348DF7",
    },
}));

const StyledCharacterCounter = styled.p({
    marginBlockEnd: "8px",
    marginBlockStart: "8px",
    color: colors.base.grey700,
    fontSize: "12px",
});

const StyledLabel = styled.label({
    color: colors.base.grey800,
    fontSize: "16px",
});
