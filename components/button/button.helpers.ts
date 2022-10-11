import { colors } from "~/util/colorPalette";

export type ButtonSize = "small" | "medium" | "large";

export const button_size = {
    small: {
        fontSize: 14,
        padding: "5px 16px",
        arrowSize: 10,
        checkedSize: 14,
        onlyIconArrow: 12,
        onlyIconHeight: 31,
        onlyIconWidth: 31,
        buttonHeight: 31,
        buttonWidth: 90,
    },
    medium: {
        fontSize: 16,
        padding: "8px 20px",
        arrowSize: 12,
        checkedSize: 20,
        onlyIconArrow: 14,
        onlyIconHeight: 38,
        onlyIconWidth: 38,
        buttonHeight: 38,
        buttonWidth: 110,
    },
    large: {
        fontSize: 16,
        padding: "12px 24px",
        arrowSize: 12,
        checkedSize: 22,
        onlyIconArrow: 16,
        onlyIconHeight: 46,
        onlyIconWidth: 46,
        buttonHeight: 46,
        buttonWidth: 116,
    },
};

export type ButtonVariant =
    | "Filled-Light"
    | "Filled-Dark"
    | "Outlined-Light"
    | "Outlined-Dark";

type StyleSettings = {
    default: string;
    hover: string;
};

export type ButtonConfig = {
    color: StyleSettings;
    backgroundColor: StyleSettings;
    iconColor: StyleSettings;
    borderColor: StyleSettings;
};

export function getColor(variant: ButtonVariant): ButtonConfig {
    switch (variant) {
        case "Filled-Light":
            return {
                color: {
                    default: colors.primary.darkGray,
                    hover: colors.primary.darkGray,
                },
                backgroundColor: {
                    default: colors.base.white,
                    hover: colors.secondary.lightYellow,
                },
                iconColor: {
                    default: colors.primary.darkGray,
                    hover: colors.primary.darkGray,
                },
                borderColor: { default: "transparent", hover: "transparent" },
            };

        case "Filled-Dark":
            return {
                color: {
                    default: colors.base.white,
                    hover: colors.secondary.lightYellow,
                },
                backgroundColor: {
                    default: colors.primary.darkGray,
                    hover: colors.primary.darkGray,
                },
                iconColor: {
                    default: colors.base.white,
                    hover: colors.secondary.lightYellow,
                },
                borderColor: { default: "transparent", hover: "transparent" },
            };

        case "Outlined-Light":
            return {
                color: {
                    default: colors.base.white,
                    hover: colors.secondary.lightYellow,
                },
                backgroundColor: {
                    default: "transparent",
                    hover: "transparent",
                },
                iconColor: {
                    default: colors.base.white,
                    hover: colors.secondary.lightYellow,
                },
                borderColor: {
                    default: colors.base.white,
                    hover: colors.secondary.lightYellow,
                },
            };

        case "Outlined-Dark":
            return {
                color: {
                    default: colors.primary.darkGray,
                    hover: colors.primary.darkGray,
                },
                backgroundColor: {
                    default: "transparent",
                    hover: "transparent",
                },
                iconColor: {
                    default: colors.primary.darkGray,
                    hover: colors.secondary.yellowGreen,
                },
                borderColor: {
                    default: colors.primary.darkGray,
                    hover: colors.secondary.yellowGreen,
                },
            };

        default:
            return {
                color: {
                    default: colors.primary.darkGray,
                    hover: colors.primary.darkGray,
                },
                backgroundColor: {
                    default: colors.base.white,
                    hover: colors.secondary.lightYellow,
                },
                iconColor: {
                    default: colors.primary.darkGray,
                    hover: colors.primary.darkGray,
                },
                borderColor: { default: "transparent", hover: "transparent" },
            };
    }
}
