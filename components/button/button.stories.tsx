import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    disabled: { control: "boolean" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

// CTA default

export const ImpactButton = Template.bind({});
ImpactButton.args = {
  label: "CTA Text",
  disabled: false,
};
