import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { mq } from "../../util/media-queries";
import { SvgIcon } from "../svg-icon";
import { colors } from "~/util/colorPalette";
import { configuration } from "~/util/configuration";
import { useAuthStore, useNavStore } from "~/store/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { flexCenter } from "~/styles/style.helper";
import useAuth from "~/hooks/useAuth";

type DashboardProps = {
    showNav: boolean;
};

const DashboardNav = ({ showNav }: DashboardProps) => {
    const [openedIndex, setOpenedIndex] = useState<number | null>(null);
    const { pages } = configuration;
    const { toggleNav } = useNavStore((state) => ({
        toggleNav: state.toggleNav,
    }));
    const { authSignIn, authSignOut } = useAuth();
    const { setUserData } = useAuthStore((state) => ({
        setUserData: state.setUserData,
    }));
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleToggle = (index: number) => {
        if (openedIndex === index) {
            return setOpenedIndex(null);
        }
        setOpenedIndex(index);
    };

    useEffect(() => {
        if (status === "authenticated") {
            setUserData(session?.user);
        }
    }, [status]);

    return (
        <Nav>
            <NavUl>
                {pages.map((page, index) => {
                    return (
                        <NavLi
                            open={showNav}
                            key={index}
                            active={index === openedIndex}
                        >
                            {page.subpages ? (
                                <>
                                    <button>
                                        <a
                                            onClick={() => {
                                                handleToggle(index);
                                            }}
                                        >
                                            <SvgIcon
                                                size={18}
                                                svg={page.icon}
                                            />
                                            <span>{page.name}</span>

                                            <SubpageIcon
                                                active={index === openedIndex}
                                            >
                                                <SvgIcon
                                                    size={14}
                                                    svg="chevronRight"
                                                />
                                            </SubpageIcon>
                                        </a>
                                    </button>

                                    {index === openedIndex && showNav ? (
                                        <NavLevel2>
                                            {page.subpages.map(
                                                (subpage, index) => {
                                                    return (
                                                        <Level2Li key={index}>
                                                            <Link
                                                                href={`${subpage.url}`}
                                                            >
                                                                <a>
                                                                    <span>
                                                                        {
                                                                            subpage.name
                                                                        }
                                                                    </span>
                                                                </a>
                                                            </Link>
                                                        </Level2Li>
                                                    );
                                                }
                                            )}
                                        </NavLevel2>
                                    ) : null}
                                </>
                            ) : (
                                <Link href={`${page.url}`}>
                                    <a>
                                        <SvgIcon size={18} svg={page.icon} />
                                        <span>{page.name}</span>
                                    </a>
                                </Link>
                            )}
                        </NavLi>
                    );
                })}
            </NavUl>
            <NavContainer>
                {status === "authenticated" ? (
                    <SignInButton
                        open={showNav}
                        onClick={() => {
                            authSignOut();
                            router.push("/");
                        }}
                    >
                        <SvgIcon size={22} svg="signOut" />
                        <span>Sign out</span>
                    </SignInButton>
                ) : (
                    <SignInButton
                        open={showNav}
                        onClick={() => {
                            localStorage.setItem(
                                "previousRoute",
                                router.asPath
                            );
                            authSignIn();
                        }}
                    >
                        <SvgIcon size={22} svg="signIn" />
                        <span>Sign in</span>
                    </SignInButton>
                )}

                <SideBarVisibilityTrigger onClick={() => toggleNav()}>
                    <SvgIcon
                        size={26}
                        svg={showNav ? "eyeClosed" : "eyeOpen"}
                    />
                </SideBarVisibilityTrigger>
            </NavContainer>
        </Nav>
    );
};

export default DashboardNav;

export const Nav = styled.nav({
    display: "none",
    [mq("lg")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
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

export const NavLi = styled.li<{
    active: boolean;
    open: boolean;
}>(({ active, open }) => ({
    width: "100%",
    ["a"]: {
        border: "none",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        padding: "10px 0",
        textDecoration: "none",
        width: "100%",
        fontSize: "22px",
        fontWeight: 500,
        paddingLeft: open ? "30px" : 0,
        justifyContent: open ? "flex-start" : "center",
        borderLeft: "6px solid transparent",
        transition: "all 0.2s ease",
        borderColor: active ? colors.secondary.lightYellow : "transparent",
        color: active ? colors.secondary.darkYellow : colors.primary.black,
        backgroundColor: active ? colors.base.grey100 : "",
        ["&:hover"]: {
            borderColor: colors.secondary.lightYellow,
            color: colors.secondary.darkYellow,
            backgroundColor: colors.base.grey100,
        },
        ["&>span:nth-of-type(1)"]: {
            paddingRight: open ? "16px" : 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
        },
        ["span:nth-of-type(2)"]: {
            opacity: open ? 1 : 0,
            width: open ? "auto" : 0,
            transition: open ? "opacity 0.2s 0.3s ease" : "none",
            fontSize: "16px",
            [mq("md")]: {
                fontSize: "18px",
            },
        },
        ["span:nth-of-type(3)"]: {
            marginLeft: open ? "auto" : 0,
            paddingRight: open ? "12px" : 0,
            width: open ? "auto" : 0,
            transition: open ? "opacity 0.2s 0.3s ease" : "none",
            opacity: open ? 1 : 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
        },
    },
    ["button"]: {
        border: "none",
        boxSizing: "border-box",
        display: "flex",
        width: "100%",
        fontSize: "22px",
        fontWeight: 500,
        cursor: "pointer",
    },
}));

export const SubpageIcon = styled.span<{
    active: boolean;
}>(({ active }) => ({
    ["svg"]: {
        transition: "all .3s ease",
        transform: active ? "rotate(270deg)" : "rotate(90deg)",
    },
}));

export const SubpageLiWrapper = styled.div({
    width: "100%",
    display: "flex",
    alignItems: "center",
});

export const NavLevel2 = styled.ul({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
    margin: 0,
    padding: 0,

    paddingLeft: "56px",
});

export const Level2Li = styled.li({
    width: "100%",
    ["a"]: {
        boxSizing: "border-box",
        display: "flex",
        padding: "6px 0",
        textDecoration: "none",
        width: "100%",
        fontSize: "18px",
        paddingLeft: "12px",
        borderLeft: "6px solid transparent",
        transition: "all 0.2s ease",
        backgroundColor: "transparent",
        color: colors.primary.black,
        ["&:hover"]: {
            borderColor: colors.secondary.lightYellow,
            color: colors.secondary.darkYellow,
            backgroundColor: colors.base.grey100,
        },
        ["span:nth-of-type(1)"]: {
            paddingRight: "16px",
            fontSize: "14px",
            [mq("md")]: {
                fontSize: "16px",
            },
        },
        ["span:nth-of-type(2)"]: {
            marginLeft: "auto",
            paddingRight: "8px",
        },
    },
});

export const SideBarVisibilityTrigger = styled.div({
    cursor: "pointer",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    borderLeft: "6px solid transparent",
    transition: "all 0.2s ease",
    backgroundColor: "transparent",
    color: colors.primary.black,
    padding: "10px 0",
    ["&:hover"]: {
        borderColor: colors.secondary.lightYellow,
        color: colors.secondary.darkYellow,
        backgroundColor: colors.base.grey100,
    },
});

export const SignInButton = styled.button<{ open: boolean }>(({ open }) => ({
    ...flexCenter,
    cursor: "pointer",
    width: "100%",
    padding: "10px 0",
    fontWeight: 500,
    outline: "none",
    border: "none",
    borderLeft: "6px solid transparent",
    transition: "all 0.2s ease",
    backgroundColor: "transparent",
    color: colors.primary.black,
    marginBottom: "10px",

    ["&:hover"]: {
        borderColor: colors.secondary.lightYellow,
        color: colors.secondary.darkYellow,
        backgroundColor: colors.base.grey100,
    },

    ["span:nth-of-type(1)"]: {
        paddingRight: open ? "16px" : 0,
    },

    ["span:nth-of-type(2)"]: {
        fontFamily: "Plantin Std",
        opacity: open ? 1 : 0,
        width: open ? "auto" : 0,
        transition: open ? "opacity 0.2s 0.3s ease" : "none",
        fontSize: "16px",
        [mq("md")]: {
            fontSize: "18px",
        },
    },
}));

export const NavContainer = styled.div({
    width: "100%",
});
