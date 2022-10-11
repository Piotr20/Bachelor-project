import { ReactNode, useState } from "react";
import AccordionItem, { AccordionItemData } from "./accordionItem";
import styled from "styled-components";
import { colors } from "../../util/colorPalette";
import { TLASvg } from "../svg-icon";

type Props = {
    borderTop?: boolean;
    borderBottom?: boolean;
    icon?: keyof typeof TLASvg | ReactNode;
    paddingInner?: boolean;
    itemsData: Array<AccordionItemData>;
};

const Accordion = ({
    borderTop,
    borderBottom,
    icon,
    paddingInner,
    itemsData,
}: Props) => {
    const [openedIndex, setOpenedIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        if (openedIndex === index) {
            return setOpenedIndex(null);
        }
        setOpenedIndex(index);
    };

    return (
        <AccordionWrapper
            aria-label="Accordion Control Button Group"
            borderTop={borderTop}
            borderBottom={borderBottom}
        >
            {itemsData.map((data, index) => (
                <AccordionItem
                    key={index}
                    onToggle={() => handleToggle(index)}
                    active={openedIndex === index}
                    index={index}
                    itemData={data}
                    borderTop={borderTop}
                    borderBottom={borderBottom}
                    paddingInner={paddingInner}
                    icon={icon}
                />
            ))}
        </AccordionWrapper>
    );
};

export default Accordion;

export const AccordionWrapper = styled.ul<{
    borderTop?: boolean;
    borderBottom?: boolean;
}>(({ borderTop, borderBottom }) => ({
    listStyle: "none",
    margin: 0,
    padding: 0,
    borderColor: colors.base.grey300,
    borderBottom: borderTop && borderBottom ? "1px solid " : "none",
}));
