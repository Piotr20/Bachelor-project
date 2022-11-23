import Head from "next/head";
import styled from "styled-components";
import { mq } from "../../util/media-queries";
import PageTransition from "../pageTransition/pageTransition";
import { useNavStore } from "~/store/store";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import Text from "../typography/text";
import Image from "next/image";
import { Pages, Page } from "~/util/pages";
import Link from "next/link";
import { colors } from "~/util/colorPalette";
import { useUserStore } from "~/store/userStore";
import { StyledPageContainer } from "./layout";
import Logo from "../../public/images/impact-logo-white.png";
import ImpactImage from "../image/image";
import { SvgIcon } from "../svg-icon";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
    const router = useRouter();
    const { user, setOpenProfile } = useUserStore((state) => ({
        user: state.user,
        setOpenProfile: state.setOpenProfile,
    }));

    return (
        <StyledHeader>
            <StyledHeaderContainer>
                <StyledLogo>
                    <Link
                        href={{
                            pathname: "/",
                        }}
                    >
                        <Image src={Logo} alt="Impact connect logo" />
                    </Link>
                </StyledLogo>
                <StyledNav>
                    {
                        <StyledNavUl>
                            {Pages.map((page: Page, key) => {
                                return (
                                    <StyledNavLi active={router.pathname === page.path} key={key}>
                                        <Link href={page.path}>
                                            <a>
                                                <SvgIcon svg={page.icon} />
                                                {page.name}
                                            </a>
                                        </Link>
                                    </StyledNavLi>
                                );
                            })}
                        </StyledNavUl>
                    }
                </StyledNav>
                <StyledProfile onClick={() => setOpenProfile(true)}>
                    <Text
                        tag="h6"
                        additionalStyles={{
                            paddingRight: "12px",
                            color: colors.base.white,
                            whiteSpace: "nowrap",
                            display: "none",
                            [mq("lg")]: {
                                display: "block",
                            },
                        }}
                    >
                        {user?.name}
                    </Text>
                    <ImpactImage
                        src={user?.imageURL}
                        alt="alt text"
                        layout="fill"
                        ratio="1/1"
                        containerWidth="40px"
                        style={{ borderRadius: "50%" }}
                    />
                </StyledProfile>
            </StyledHeaderContainer>
        </StyledHeader>
    );
};
export default Header;

export const StyledHeader = styled.header({
    width: "100%",
    height: "6.5vh",
});
export const StyledHeaderContainer = styled.div({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary.black,
    padding: "0 24px",
    position: "relative",
    [mq("lg")]: {
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "0 32px",
    },
    [mq("xl")]: {
        maxWidth: "1600px",
        margin: "0 auto",
        padding: "0 48px",
    },
});

export const StyledLogo = styled.div({
    width: "30%",
    cursor: "pointer",
    [mq("lg")]: {
        width: "10%",
    },
});
export const StyledProfile = styled.div({
    display: "flex",
    alignItems: "center",
    width: "auto",
    cursor: "pointer",
});

export const StyledNav = styled.nav({
    display: "flex",
    alignItems: "center",
    height: "100%",
});
export const StyledNavUl = styled.ul({
    alignItems: "center",
    listStyle: "none",
    position: "fixed",
    zIndex: "3",
    bottom: 0,
    left: 0,
    backgroundColor: colors.primary.black,
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    padding: "0 32px",
    height: "8vh",
    [mq("lg")]: {
        width: "auto",
        height: "100%",
        display: "flex",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
    },
});
export const StyledNavLi = styled.li<{
    active: boolean;
}>(({ active }) => ({
    letterSpacing: "1px",
    fontFamily: "Flama",
    fontSize: "18px",
    color: active ? colors.base.white : colors.base.grey500,
    padding: "2px 8px",

    [mq("lg")]: {
        height: "100%",
        padding: "8px 12px",
        paddingTop: "16px",
        alignItems: "flex-start",
        borderTop: `2px solid ${active ? colors.secondary.lightYellow : "transparent"}`,
    },
    ["a"]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textDecoration: "none",
        color: active ? colors.base.white : colors.base.grey500,
        ["span"]: {
            width: "32px !important",
            height: "32px !important",
            ["svg"]: {
                width: "32px !important",
                height: "32px !important",
                fill: active ? colors.base.white : colors.base.grey500,
                ["path"]: {
                    fill: active ? colors.base.white : colors.base.grey500,
                },
            },

            [mq("lg")]: {
                display: "none",
            },
        },
    },
}));
