import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Links } from "./link";

export default {
  title: "Components/Link",
  component: Links,
  argTypes: {},
} as ComponentMeta<typeof Links>;

const Template: ComponentStory<typeof Links> = (args) => <Links {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  linkText: "Link text",
  linkSize: "large",
  linkType: "default",
  linkColor: "black",
  href: "/",
};
