import { NextComponentType } from "next";
import Link from "next/link";
import logoImage from "../../public/logo.png";
import { useAuthStore, useNavStore } from "../../store/store";
import styled from "styled-components";
import { mq } from "../../util/media-queries";
import { SvgIcon } from "../svg-icon";
import ImpactImage from "../image/image";
import { colors } from "~/util/colorPalette";
import DashboardNav from "./dashboardNav";
import { motion, AnimatePresence } from "framer-motion";
import { configuration } from "~/util/configuration";

export type sidebarWidth = {
    closed: string;
    opened: string;
};

export const sidebarWidth: sidebarWidth = {
    closed: "8%",
    opened: "20%",
};

const Header: NextComponentType = () => {
    const { showNav, toggleNav } = useNavStore((state) => ({
        showNav: state.showNav,
        toggleNav: state.toggleNav,
    }));
    const { pages } = configuration;
    const { user } = useAuthStore((state) => ({
        user: state.user,
    }));

    return (
        <HeaderStyle open={!showNav} sidebarWidth={sidebarWidth}>
            <BurgerIcon onClick={() => toggleNav()}>
                <SvgIcon
                    size={32}
                    svg={showNav ? "burgerClose" : "burgerIcon"}
                />
            </BurgerIcon>
            <Link href="/">
                <Logo>
                    <ImpactImage
                        layout="responsive"
                        alt="Logo picture"
                        src={logoImage}
                    />
                </Logo>
            </Link>
            <ProfileMinimal open={!showNav} hideMobile={true}>
                <ImpactImage
                    width={60}
                    height={60}
                    alt={user?.name}
                    src={user?.image}
                />
                {!showNav ? (
                    <AnimatePresence initial={true} mode="wait">
                        <motion.div
                            initial={{
                                width: 0,
                                opacity: 0,
                            }}
                            animate={{
                                width: "auto",
                                opacity: 1,
                                transition: {
                                    duration: 0.2,
                                    delay: 0.3,
                                },
                            }}
                            exit={{
                                width: 0,
                                opacity: 0,
                            }}
                        >
                            <ProfileTextContainer>
                                <ProfileH3>{user?.name}</ProfileH3>
                                <ProfileParagraph open={showNav}>
                                    {user?.email}
                                </ProfileParagraph>
                            </ProfileTextContainer>
                        </motion.div>
                    </AnimatePresence>
                ) : null}
            </ProfileMinimal>
            <DashboardNav showNav={!showNav} />

            <BurgerCurtain show={showNav}>
                <ProfileMinimal open={showNav} hideMobile={false}>
                    <ImpactImage
                        width={60}
                        height={60}
                        alt={user?.name}
                        src={user?.image}
                    />

                    <ProfileTextContainer>
                        <ProfileH3>{user?.name}</ProfileH3>
                        <ProfileParagraph open={showNav}>
                            {user?.email}
                        </ProfileParagraph>
                    </ProfileTextContainer>
                </ProfileMinimal>
                <nav>
                    <MobileNav>
                        {pages.map((page, key) => {
                            return (
                                <li key={key}>
                                    <Link href={`${page.url}`}>
                                        <a>
                                            <span>{page.name}</span>
                                        </a>
                                    </Link>
                                </li>
                            );
                        })}
                    </MobileNav>
                </nav>
            </BurgerCurtain>
        </HeaderStyle>
    );
};

export default Header;

export const HeaderStyle = styled.header<{
    open: boolean;
    sidebarWidth: sidebarWidth;
}>(({ open, sidebarWidth }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "8vh",
    padding: "0 24px",
    boxShadow: "0px -5px 10px 0px #000000",
    zIndex: 100,
    backgroundColor: colors.base.grey200,
    [mq("lg")]: {
        height: "100%",
        justifyContent: "flex-start",
        width: open ? sidebarWidth.opened : sidebarWidth.closed,
        flexDirection: "column",
        boxShadow: "none",
        transition: "width .3s ease",
        boxSizing: "border-box",
        padding: "24px 0",
    },
}));

export const BurgerCurtain = styled.div<{ show: boolean }>(({ show }) => ({
    backgroundColor: "#fff",
    padding: "16px",
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    zIndex: 101,
    top: 0,
    right: show ? 0 : "100%",
    transition: "all 0.3s ease-in-out",
    [mq("lg")]: {
        display: "none",
    },
    ["span"]: {
        alignSelf: "flex-end",
    },
    ["nav"]: {
        ["ul"]: {
            listStyle: "none",
            padding: 0,
            ["li"]: {
                textAlign: "center",
                padding: "8px 0",
                fontSize: "21px",
                ["a"]: {
                    textDecoration: "none",
                    color: "#222",
                },
            },
        },
    },
}));
export const BurgerIcon = styled.span({
    display: "flex",
    zIndex: 102,
    ["svg"]: {
        width: "100%",
        height: "100%",
    },
    [mq("lg")]: {
        display: "none",
    },
});

export const Logo = styled.div({
    width: "100px",
    height: "36px",
    cursor: "pointer",
    [mq("lg")]: {
        width: "100px",
        height: "32px",
    },
});

export const Nav = styled.nav({
    display: "none",
    [mq("lg")]: {
        display: "flex",
        width: "100%",
        paddingTop: "24px",
    },
});
export const NavUl = styled.ul({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
    margin: 0,
    padding: 0,
});

export const MobileNav = styled.ul({
    display: "flex",
    flexDirection: "column",
    ["li"]: {
        textDecoration: "none",
    },
});

export const NavLi = styled.li({
    width: "100%",

    ["a"]: {
        boxSizing: "border-box",
        display: "flex",
        padding: "10px 0",
        textDecoration: "none",
        width: "100%",
        fontSize: "22px",
        color: colors.primary.black,
        paddingLeft: "30px",
        borderLeft: "6px solid transparent",
        transition: "all 0.2s ease",
        ["&:hover"]: {
            borderColor: colors.secondary.lightYellow,
            color: colors.secondary.darkYellow,
            backgroundColor: colors.base.grey100,
            ["svg"]: {
                fill: colors.secondary.darkYellow,
            },
        },

        ["span:nth-of-type(2)"]: {
            marginLeft: "auto",
            paddingRight: "12px",
        },
    },
});
export const SubpageLiWrapper = styled.div({
    width: "100%",
    display: "flex",
    alignItems: "center",
});

const ProfileMinimal = styled.div<{ open: boolean; hideMobile: boolean }>(
    ({ open, hideMobile }) => ({
        display: hideMobile ? "none" : "flex",
        alignItems: "center",
        ["img"]: {
            maxWidth: "60px",
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            border: "1px solid black",
        },
        [mq("lg")]: {
            display: "flex",
            width: "100%",
            boxSizing: "border-box",
            justifyContent: open ? "flex-start" : "center",
            alignItems: "center",
            transition: "all 0.3s ease",
            padding: "0 8px",
            ["img"]: {
                maxWidth: "60px",
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                border: "1px solid black",
            },
        },
    })
);

const ProfileTextContainer = styled.div({
    display: "flex",
    flexDirection: "column",
    paddingLeft: "4px",
});

const ProfileH3 = styled.h3({
    margin: 0,
    whiteSpace: "nowrap",
    fontSize: "16px",
    [mq("md")]: {
        fontSize: "18px",
    },
    [mq("lg")]: {
        fontSize: "20px",
    },
    [mq("xl")]: {
        fontSize: "22px",
    },
});

const ProfileParagraph = styled.p<{ open: boolean }>(({ open }) => ({
    margin: 0,
    opacity: "0.6",
    whiteSpace: "nowrap",
    lineHeight: "125%",
    fontWeight: 400,
    fontSize: "10px",

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
}));
