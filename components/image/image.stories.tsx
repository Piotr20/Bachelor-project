import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ImpactImage from "./image";
import { SvgIcon } from "../svg-icon";

export default {
    title: "Components/ImpactImage",
    component: ImpactImage,
} as ComponentMeta<typeof ImpactImage>;

const Template: ComponentStory<typeof ImpactImage> = (args: any) => (
    <ImpactImage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    src: "",
    ratio: "16/10",
    alt: "alt text",
    width: 200,
    height: 200,
};
