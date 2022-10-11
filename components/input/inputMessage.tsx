import { FC } from "react";
import styled from "styled-components";
import { getStatusColor } from "~/lib/helpers/color.helper";
import { TextAlignment } from "~/models/ui-types";
import { SvgIcon } from "../svg-icon";
import { InputProps } from "./input";

export const InputMessage: FC<
  Pick<InputProps, "color" | "textAlignment" | "textMessage">
> = ({ color, textAlignment, textMessage }) => {
  const messageColor = getStatusColor(color);

  return (
    <MessageWrapper textColor={messageColor} textAlignment={textAlignment}>
      <SmallIconWrapper>
        {color === "success" ? (
          <SvgIcon svg={"successMessage"} size={16} />
        ) : null}
        {color === "error" ? <SvgIcon svg={"errorTextIcon"} size={16} /> : null}
      </SmallIconWrapper>
      <StyledText> {textMessage}</StyledText>
    </MessageWrapper>
  );
};

export default InputMessage;

export const MessageWrapper = styled.div<{
  textColor: string;
  textAlignment?: TextAlignment;
}>(({ textColor: messageColor, textAlignment: messageAlignment }) => ({
  color: messageColor,
  textAlign: messageAlignment,
  width: "100%",
  fontSize: "12px",
  display: "flex",
  justifyContent: messageAlignment === "start" ? "flex-start" : "flex-end",
}));

const SmallIconWrapper = styled.div({
  padding: "0px 4px",
  marginBlockEnd: "8px",
  marginBlockStart: "8px",
});

const StyledText = styled.p({
  marginBlockEnd: "8px",
  marginBlockStart: "8px",
  fontSize: "12px",
});
