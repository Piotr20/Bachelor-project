import { ReactNode } from "react";
import styled, { CSSObject } from "styled-components";
import { ifProp } from "styled-tools";
import { mq } from "~/util/media-queries";
import { colors } from "../../util/colorPalette";

type Props = {
    tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "a";
    children: ReactNode;
    dark?: boolean;
    bold?: boolean;
    italic?: boolean;
    lineThrough?: boolean;
    url?: string;
    additionalStyles?: CSSObject;
};

const Text = ({ tag, children, dark = false, bold, italic, lineThrough, url, additionalStyles }: Props) => {
    switch (tag) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
            return (
                <Heading tag={tag} dark={dark} styles={additionalStyles} as={tag}>
                    {children}
                </Heading>
            );

        case "p":
            return (
                <Paragraph
                    dark={dark}
                    bold={bold}
                    italic={italic}
                    lineThrough={lineThrough}
                    styles={additionalStyles}
                >
                    {children}
                </Paragraph>
            );
        case "a":
            return (
                <LinkCTA dark={dark} bold={bold} styles={additionalStyles} href={url}>
                    {children}
                </LinkCTA>
            );
        default:
            return null;
    }
};

export default Text;

export const Heading = styled.h1<{
    dark?: boolean;
    styles?: CSSObject;
    tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}>(
    ({ dark, tag, styles }) => ({
        margin: 0,
        padding: 0,
        lineHeight: "105%",
        color: dark ? colors.base.white : colors.base.grey800,
        ...styles,
    }),
    ifProp({ tag: "h1" }, () => ({
        fontSize: "36px",
        [mq("md")]: {
            fontSize: "42px",
        },
        [mq("lg")]: {
            fontSize: "48px",
        },
        [mq("xl")]: {
            fontSize: "56px",
        },
    })),
    ifProp({ tag: "h2" }, () => ({
        fontSize: "30px",
        [mq("md")]: {
            fontSize: "36px",
        },
        [mq("lg")]: {
            fontSize: "40px",
        },
        [mq("xl")]: {
            fontSize: "48px",
        },
    })),
    ifProp({ tag: "h3" }, () => ({
        fontSize: "26px",
        [mq("md")]: {
            fontSize: "32px",
        },
        [mq("lg")]: {
            fontSize: "36px",
        },
        [mq("xl")]: {
            fontSize: "44px",
        },
    })),
    ifProp({ tag: "h4" }, () => ({
        fontSize: "22px",
        [mq("md")]: {
            fontSize: "26px",
        },
        [mq("lg")]: {
            fontSize: "28px",
        },
        [mq("xl")]: {
            fontSize: "34px",
        },
    })),
    ifProp({ tag: "h5" }, () => ({
        fontSize: "18px",
        [mq("md")]: {
            fontSize: "20px",
        },
        [mq("lg")]: {
            fontSize: "22px",
        },
        [mq("xl")]: {
            fontSize: "28px",
        },
    })),
    ifProp({ tag: "h6" }, () => ({
        fontSize: "14px",

        [mq("lg")]: {
            fontSize: "16px",
        },
        [mq("xl")]: {
            fontSize: "22px",
        },
    }))
);

export const Paragraph = styled.p<{
    dark?: boolean;
    bold?: boolean;
    italic?: boolean;
    lineThrough?: boolean;
    styles?: CSSObject;
}>(({ dark, bold, italic, lineThrough, styles }) => ({
    margin: 0,
    padding: 0,
    lineHeight: "125%",
    color: dark ? colors.base.white : colors.base.grey800,
    fontWeight: bold ? 700 : 400,
    fontStyle: italic ? "italic" : "normal",
    fontSize: "12px",
    textDecorationLine: lineThrough ? "line-through" : "none",

    [mq("sm")]: {
        fontSize: "14px",
    },
    [mq("md")]: {
        fontSize: "16px",
    },
    [mq("lg")]: {
        fontSize: "18px",
    },
    [mq("xl")]: {
        fontSize: "21px",
    },
    ...styles,
}));

export const LinkCTA = styled.a<{
    dark?: boolean;
    bold?: boolean;
    styles?: CSSObject;
}>(({ dark, bold, styles }) => ({
    margin: 0,
    padding: 0,
    lineHeight: "155%",
    color: dark ? colors.base.white : colors.base.grey800,
    fontWeight: bold ? 700 : 400,
    textDecoration: "none",
    fontSize: "10px",
    ["&:hover"]: {
        textDecoration: "underline",
    },
    [mq("sm")]: {
        fontSize: "12px",
    },
    [mq("md")]: {
        fontSize: "14px",
    },
    [mq("lg")]: {
        fontSize: "16px",
    },
    [mq("xl")]: {
        fontSize: "18px",
    },
    ...styles,
}));
