import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ToastsList } from "./toast-list";

export default {
  title: "Components/Toasts",
  component: ToastsList,
  argTypes: {},
} as ComponentMeta<typeof ToastsList>;

const Template: ComponentStory<typeof ToastsList> = (args) => (
  <ToastsList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  messages: [],
  fadeIn: false,
  toast: { text: "Testing", status: "default" },
  visible: true,
  position: "top-left",
};
