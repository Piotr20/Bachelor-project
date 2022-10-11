import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Text from "./text";

export default {
    title: "Components/Text",
    component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args: any) => <Text {...args} />;

export const H1 = Template.bind({});
H1.args = {
    tag: "h1",
    dark: false,
    children: "Heading 1 text",
};
export const P = Template.bind({});
P.args = {
    tag: "p",
    dark: false,
    children: "paragraph text",
    bold: false,
    italic: false,
    lineThrough: false,
};

export const LinkCTA = Template.bind({});
LinkCTA.args = {
    tag: "a",
    dark: false,
    children: "link text",
    bold: false,
    url: "https://impactcommerce.com/",
};
