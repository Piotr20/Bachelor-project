import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Accordion from "./accordion";
import { SvgIcon } from "../svg-icon";

export default {
    title: "Components/Accordion",
    component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args: any) => (
    <Accordion {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    icon: <SvgIcon size={16} svg="circlePlus" />,
    paddingInner: false,
    borderTop: true,
    borderBottom: false,
    itemsData: [
        {
            heading: "Heading text 1",
            body: "body text 1",
        },
        {
            heading: "Heading text 2",
            body: "body text 2",
        },
        {
            heading: "Heading text 3",
            body: "body text 3",
        },
    ],
};
