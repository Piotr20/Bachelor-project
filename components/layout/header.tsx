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
                    <Link href={"/"}>
                        <Image src={Logo} alt="Impact connect logo" />
                    </Link>
                </StyledLogo>
                <StyledNav>
                    {/*  <StyledNavUl>
                    {Pages.map((page: Page, key) => {
                        return (
                            <StyledNavLi
                                active={router.pathname === page.path}
                                key={key}
                            >
                                <Link href={page.path}>{page.name}</Link>
                            </StyledNavLi>
                        );
                    })}
                </StyledNavUl> */}
                </StyledNav>
                <StyledProfile onClick={() => setOpenProfile(true)}>
                    <Text
                        tag="h6"
                        additionalStyles={{
                            paddingRight: "12px",
                            color: colors.base.white,
                            whiteSpace: "nowrap",
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
    height: "8vh",
});
export const StyledHeaderContainer = styled.div({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary.black,
    padding: "0 24px",
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
    display: "flex",
    height: "100%",
    alignItems: "center",
    listStyle: "none",
});
export const StyledNavLi = styled.li<{
    active: boolean;
}>(({ active }) => ({
    height: "100%",
    display: "flex",
    alignItems: "center",
    borderTop: `4px solid ${active ? colors.secondary.lightYellow : "transparent"}`,

    ["a"]: {
        textDecoration: "none",
        padding: "8px 12px",
        color: active ? colors.primary.black : "initial",
    },
}));
