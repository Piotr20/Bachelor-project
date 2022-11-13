import React, { ReactEventHandler, useRef, useState } from "react";
import styled, { CSSObject } from "styled-components";
import { colors } from "../../util/colorPalette";

export type InputProps = {
    placeholder?: string;
    additionalStyles?: CSSObject;
    type?: string;
    onChange?: ReactEventHandler;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "children">;

export const Input = ({ placeholder, additionalStyles, type, onChange }: InputProps) => {
    const [wordCount, setWordCount] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const [focus, setFocus] = useState(false);

    return (
        <InputWrapper additionalStyles={additionalStyles}>
            <StyledInput onChange={onChange} placeholder={placeholder} type={type} />
        </InputWrapper>
    );
};

const InputWrapper = styled.div<{
    additionalStyles?: CSSObject;
}>(({ additionalStyles }) => ({
    width: "100%",
    position: "relative",
    ...additionalStyles,
}));

const StyledInput = styled.input({
    width: "100%",
    color: colors.primary.black,
    fontSize: "18px",
    border: "none",
    borderBottom: `1px solid ${colors.primary.black}`,
    outline: "none",
    paddingBottom: "10px",
    paddingLeft: "8px",
    ["&::placeholder"]: {
        color: colors.base.grey500,
    },
});
