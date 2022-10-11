import React, { FC } from "react";
import styled from "styled-components";
import { getStatusColor } from "~/lib/helpers";
import { SvgIcon } from "../svg-icon";
import { ToastProps } from "./toast-list";

export const Toast: FC<Pick<ToastProps, "toast" | "fadeIn" | "visible">> = ({
  toast,
  fadeIn,
  visible,
}) => {
  const color = getStatusColor(toast.status);

  return (
    <StyledToasts isVisible={visible} toastColor={color} fadeIn={fadeIn}>
      <StyledMessage>{toast.text}</StyledMessage>
      <IconWrapper>
        {toast.status === "success" ? (
          <SvgIcon svg={"successMessage"} size={16} />
        ) : null}
        {toast.status === "error" ? (
          <SvgIcon svg={"errorTextIcon"} size={16} />
        ) : null}
      </IconWrapper>
    </StyledToasts>
  );
};

const StyledToasts = styled.div<{
  isVisible: boolean;
  toastColor?: string;
  fadeIn: boolean;
}>(({ isVisible, toastColor, fadeIn }) => ({
  visibility: isVisible ? "visible" : "hidden",
  minWidth: "200px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.25)",
  color: toastColor,
  padding: "10px 16px",
  position: "relative",
  zIndex: "1",
  display: "flex",
  justifyContent: "space-between",
  textAlign: "center",
  transition: fadeIn ? "opacity 0.2s 0.3s ease" : "none",
  opacity: fadeIn ? 1 : 0,
  margin: "10px 0px",
}));

const IconWrapper = styled.div({
  placeSelf: "center",
  marginTop: "2px",
});

const StyledMessage = styled.p({
  marginBlockEnd: "8px",
  marginBlockStart: "8px",
});
