import Head from "next/head";
import styled from "styled-components";
import { mq } from "../../util/media-queries";
import PageTransition from "../pageTransition/pageTransition";
import { useNavStore } from "~/store/store";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import Text from "../typography/text";
import ImpactImage from "../image/image";
import { Pages, Page } from "~/util/pages";
import Link from "next/link";
import { colors } from "~/util/colorPalette";
import { useUserStore } from "~/store/userStore";
import { StyledPageContainer } from "./layout";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
    const router = useRouter();
    const { user } = useUserStore((state) => ({
        user: state.user,
    }));

    return (
        <StyledHeader>
            <StyledHeaderContainer>
                <StyledLogo>
                    <Link href={"/"}>Logo</Link>
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
                <StyledProfile>
                    <Text
                        tag="h6"
                        additionalStyles={{
                            paddingRight: "12px",
                        }}
                    >
                        {user?.name}
                    </Text>
                    <ImpactImage
                        src={user?.imageURL}
                        alt="alt text"
                        layout="fill"
                        ratio="1/1"
                        containerWidth="50%"
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
    padding: "0 24px",
    [mq("lg")]: {
        padding: 0,
    },
});
export const StyledHeaderContainer = styled.header({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [mq("lg")]: {
        maxWidth: "1440px",
        margin: "0 auto",
    },
    [mq("xl")]: {
        maxWidth: "1600px",
        margin: "0 auto",
    },
});

export const StyledLogo = styled.div({
    width: 64,
    height: 64,
    backgroundColor: "red",
});
export const StyledProfile = styled.div({
    display: "flex",
    alignItems: "center",
    width: "auto",
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
    borderTop: `4px solid ${
        active ? colors.secondary.lightYellow : "transparent"
    }`,

    ["a"]: {
        textDecoration: "none",
        padding: "8px 12px",
        color: active ? colors.primary.black : "initial",
    },
}));
