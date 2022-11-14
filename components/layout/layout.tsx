import Head from "next/head";
import styled, { CSSObject } from "styled-components";
import { mq } from "../../util/media-queries";
import PageTransition from "../pageTransition/pageTransition";
import { useNavStore } from "~/store/store";
import { KeyboardEvent, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "./header";

import { options } from "~/util/searchOptions";
import SlideIn from "../slider/slider";
import { SvgIcon } from "../svg-icon";
import { colors } from "~/util/colorPalette";
import Text from "../typography/text";
import { useUserStore } from "~/store/userStore";
import Profile from "../profile/profile";

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [searchValue, setSearchValue] = useState<string | string[] | undefined>(router.query.search);
    const { openProfile } = useUserStore((state) => ({
        openProfile: state.openProfile,
    }));
    const { sliderData, openSlider, sliderDataType } = useNavStore((state) => ({
        openSlider: state.openSlider,
        sliderData: state.sliderData,
        sliderDataType: state.sliderDataType,
    }));

    function executeSearch(e: KeyboardEvent) {
        if (e.key === "Enter") {
            const query = {
                /*
               //* Uncomment the following to add category sorting to the search   
                category: router.query.category, */
                search: router.query.search,
            };

            const url = { pathname: "/searchResults", query };
            router.push(url);
        }
    }

    useEffect(() => {
        if (router.isReady) {
            const optionToSet = options.find((o) => o.value === router.query.category);

            if (optionToSet) {
                setSelectedOption(optionToSet);
            } else {
                setSelectedOption({ value: "all", label: "all" });
            }
        }
    }, [router.isReady]);

    /* //* Uncomment the following to add category sorting to the search     
useEffect(() => {
        if (selectedOption) {
            router.replace({
                query: {
                    ...router.query,
                    category: `${selectedOption?.value}`,
                },
            },
                undefined,
                { shallow: true }
            );
        }
    }, [selectedOption]); */

    useEffect(() => {
        if (searchValue) {
            router.replace(
                {
                    query: {
                        ...router.query,
                        search: `${searchValue}`,
                    },
                },
                undefined,
                { shallow: true }
            );
        }
    }, [searchValue]);

    useEffect(() => {
        if (openSlider) {
            if (sliderData) {
                router.replace(
                    {
                        query: {
                            search: `${searchValue}`,
                            openSlider: `${openSlider}`,
                            openedId: `${sliderData._id}`,
                            type: `${sliderDataType}`,
                        },
                    },
                    undefined,
                    { shallow: true }
                );
            }
        } else {
            router.replace(
                {
                    query: {
                        search: `${searchValue}`,
                    },
                },
                undefined,
                { shallow: true }
            );
        }
    }, [sliderData, openSlider, sliderDataType]);

    useEffect(() => {
        if (openProfile) {
            console.log(searchValue);
            if (router.query.search || typeof router.query.search === "string") {
                router.replace(
                    {
                        query: {
                            search: `${searchValue}`,
                            openProfile: `${openProfile}`,
                        },
                    },
                    undefined,
                    { shallow: true }
                );
            } else {
                router.replace(
                    {
                        query: {
                            openProfile: `${openProfile}`,
                        },
                    },
                    undefined,
                    { shallow: true }
                );
            }
        } else {
            let { openProfile, ...query } = router.query;
            router.replace(
                {
                    query: {
                        ...query,
                    },
                },
                undefined,
                { shallow: true }
            );
        }
    }, [openProfile]);

    if (router.pathname !== "/signUp") {
        return (
            <>
                <PageTransition animationType="fade">
                    <SlideIn />
                    <Profile />

                    <Header />
                    <StyledPageContainer
                        additionalStyles={{
                            backgroundColor: colors.primary.black,
                        }}
                    >
                        <SearchWrapper>
                            <Text
                                tag="h2"
                                additionalStyles={{
                                    color: colors.base.white,
                                    paddingBottom: "16px",
                                }}
                            >
                                Find the help you need
                            </Text>
                            {/* //* Uncomment the following to add category sorting to the search
                        <Select
                            isSearchable={false}
                            defaultValue={selectedOption}
                            value={selectedOption}
                            onChange={(newValue) => {
                                setSelectedOption(newValue);
                            }}
                            options={options}
                        /> */}
                            <StyledSearchInput
                                type="text"
                                placeholder="Type here.."
                                defaultValue={router.query.search}
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                                onKeyDown={(e) => executeSearch(e)}
                            />
                            <SearchIconWrapper>
                                <SvgIcon svg="searchIcon" />
                            </SearchIconWrapper>
                        </SearchWrapper>
                    </StyledPageContainer>
                    <StyledPageContainer>{children}</StyledPageContainer>
                </PageTransition>
            </>
        );
    } else {
        return (
            <>
                <PageTransition animationType="fade">{children}</PageTransition>;
            </>
        );
    }
};
export default Layout;

export const StyledPageContainer = styled.div<{ additionalStyles?: CSSObject }>(({ additionalStyles }) => ({
    padding: "0 24px",
    width: "100%",
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
    ...additionalStyles,
}));

export const DashboardWrapper = styled.div(({}) => ({
    display: "flex",
    width: "100%",

    flexDirection: "column",
    [mq("lg")]: {
        flexDirection: "row",
        height: "100vh",
    },
}));

export const SearchWrapper = styled.div(({}) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px 0",
    paddingTop: "calc(24px + 6vh)",
    backgroundColor: colors.primary.black,
    position: "relative",
    [mq("lg")]: {
        paddingTop: "calc(24px + 12vh)",
    },
}));

export const StyledSearchInput = styled.input(({}) => ({
    padding: "10px 6px",
    paddingLeft: "12px",
    width: "100%",
    boxShadow: "0px 22px 30px -10px rgba(0, 0, 0, 0.1)",
    borderRadius: "32px",
    border: "none",
    fontSize: "16px",
    [mq("lg")]: {
        padding: "12px 8px",
        paddingLeft: "16px",
        borderRadius: "48px",
        fontSize: "20px",
    },
}));

export const SearchIconWrapper = styled.span({
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translate(-50%,-50%)",
    [mq("lg")]: {
        right: "16px",
    },
});
