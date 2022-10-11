import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { position_list } from "~/lib/helpers/position.helper";
import { ToastPosition } from "~/models/ui-types";
import { ToastMessage } from "~/store/toast-store/toast-store";
import { Toast } from "./toast";

export type ToastProps = {
  messages: Array<ToastMessage>;
  visible: boolean;
  durationInSeconds: number;
  position: ToastPosition;
  fadeIn: boolean;
  toast: ToastMessage;
  hideToast: () => void;
};

export const ToastsList: FC<ToastProps> = ({
  messages,
  visible,
  durationInSeconds,
  position,
  fadeIn,
  hideToast,
  toast,
}) => {
  useEffect(() => {
    const time = setTimeout(() => {
      if (messages.length > 0) {
        hideToast();
      }
    }, durationInSeconds * 1000);

    return () => {
      clearTimeout(time);
    };
  }, [durationInSeconds, hideToast, messages?.length]);

  return (
    <div>
      <Wrapper position={position}>
        {messages?.map((msg, index) => {
          return (
            <Toast
              key={`snackbar-${index}`}
              toast={msg}
              visible={visible}
              fadeIn={fadeIn}
            />
          );
        })}
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div<{
  position: ToastPosition;
}>(({ position }) => ({
  position: "fixed",
  left: position_list[position]?.left,
  top: position_list[position]?.top,
  transform: position_list[position]?.transform,
}));
