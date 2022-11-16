import type { GetServerSideProps } from "next";
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
import {
    fetchSearchResults,
    outputFormatterHelper,
} from "~/lib/helpers/search.hepler";
import { SearchHits } from "~/pages/searchResults";
import useSearch from "~/hooks/useSearch";
import { Project, Skill, User } from "~/models";

type LayoutProps = {
    children: ReactNode;
    fallback?: { searchHits: SearchHits };
};

const Layout = ({ children, fallback }: LayoutProps) => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [searchValue, setSearchValue] = useState<
        string | string[] | undefined
    >(router.query.search);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const { openProfile } = useUserStore((state) => ({
        openProfile: state.openProfile,
    }));
    const { sliderData, openSlider, sliderDataType } = useNavStore((state) => ({
        openSlider: state.openSlider,
        sliderData: state.sliderData,
        sliderDataType: state.sliderDataType,
    }));

    const searchQuery = router.query.search as string;
    const fallbackHits = fallback?.searchHits;
    const searchData = useSearch(
        "all",
        fallbackHits?.people,
        fallbackHits?.projects,
        fallbackHits?.skills
    );

    const searchHits = outputFormatterHelper(
        "all",
        searchQuery,
        searchData?.searchHits?.people,
        searchData?.searchHits?.projects,
        searchData?.searchHits?.skills
    );

    function executeSearch(e: KeyboardEvent) {
        if (e.key === "Enter") {
            setShowSuggestions(false);
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

    function handleSuggestions() {
        if (searchQuery) {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }

    useEffect(() => {
        if (router.isReady) {
            const optionToSet = options.find(
                (o) => o.value === router.query.category
            );

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
            if (
                router.query.search ||
                typeof router.query.search === "string"
            ) {
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
                            <SearchInputWrapper>
                                <StyledSearchInput
                                    active={!showSuggestions}
                                    type="text"
                                    placeholder="Type here.."
                                    defaultValue={router.query.search}
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);
                                        handleSuggestions();
                                    }}
                                    onKeyDown={(e) => executeSearch(e)}
                                    onBlur={(e) =>
                                        setTimeout(
                                            () => setShowSuggestions(false),
                                            100
                                        )
                                    }
                                />
                                <SearchIconWrapper>
                                    <SvgIcon svg="searchIcon" />
                                </SearchIconWrapper>
                                <SearchSuggestionsContainer
                                    active={showSuggestions}
                                >
                                    <Text
                                        tag="h5"
                                        additionalStyles={{
                                            marginBottom: "12px",
                                            padding: "0 12px",
                                            [mq("lg")]: {
                                                padding: "0 16px",
                                            },
                                        }}
                                    >
                                        Suggestions
                                    </Text>
                                    {searchHits.people?.map(
                                        (employee: User, key) => {
                                            return (
                                                <SearchSuggestion
                                                    key={key}
                                                    onClick={() => {
                                                        setSearchValue(
                                                            employee?.name
                                                        );
                                                        const query = {
                                                            search: employee?.name,
                                                        };
                                                        const url = {
                                                            pathname:
                                                                "/searchResults",
                                                            query,
                                                        };
                                                        setShowSuggestions(
                                                            false
                                                        );
                                                        router.push(url);
                                                    }}
                                                >
                                                    <Text
                                                        tag="h6"
                                                        additionalStyles={{
                                                            color: colors
                                                                .primary
                                                                .lightGrey,
                                                        }}
                                                    >
                                                        {employee?.name}
                                                    </Text>
                                                </SearchSuggestion>
                                            );
                                        }
                                    )}
                                    {searchHits.projects?.map(
                                        (project: Project, key) => {
                                            return (
                                                <SearchSuggestion
                                                    key={key}
                                                    onClick={() => {
                                                        setSearchValue(
                                                            project?.name
                                                        );
                                                        const query = {
                                                            search: project?.name,
                                                        };
                                                        const url = {
                                                            pathname:
                                                                "/searchResults",
                                                            query,
                                                        };
                                                        setShowSuggestions(
                                                            false
                                                        );
                                                        router.push(url);
                                                    }}
                                                >
                                                    <Text
                                                        tag="h6"
                                                        additionalStyles={{
                                                            color: colors
                                                                .primary
                                                                .lightGrey,
                                                        }}
                                                    >
                                                        {project?.name}
                                                    </Text>
                                                </SearchSuggestion>
                                            );
                                        }
                                    )}
                                    {searchHits.skills?.map(
                                        (skill: Skill, key) => {
                                            return (
                                                <SearchSuggestion
                                                    key={key}
                                                    onClick={() => {
                                                        setSearchValue(
                                                            skill?.name
                                                        );
                                                        const query = {
                                                            search: skill?.name,
                                                        };
                                                        const url = {
                                                            pathname:
                                                                "/searchResults",
                                                            query,
                                                        };
                                                        setShowSuggestions(
                                                            false
                                                        );
                                                        router.push(url);
                                                    }}
                                                >
                                                    <Text
                                                        tag="h6"
                                                        additionalStyles={{
                                                            color: colors
                                                                .primary
                                                                .lightGrey,
                                                        }}
                                                    >
                                                        {skill?.name}
                                                    </Text>
                                                </SearchSuggestion>
                                            );
                                        }
                                    )}
                                </SearchSuggestionsContainer>
                            </SearchInputWrapper>
                        </SearchWrapper>
                    </StyledPageContainer>
                    <StyledPageContainer>{children}</StyledPageContainer>
                </PageTransition>
            </>
        );
    } else {
        return (
            <>
                <PageTransition animationType="fade">{children}</PageTransition>
                ;
            </>
        );
    }
};
export default Layout;

export const getServerSideProps: GetServerSideProps<{
    fallback: { searchHits: SearchHits };
}> = async (context) => {
    const search = context.query["search"] as string;
    const data = await fetchSearchResults("all");
    const searchHits = outputFormatterHelper(
        "all",
        search,
        data?.people,
        data?.projects,
        data?.skills
    );

    return {
        props: {
            fallback: {
                searchHits,
            },
        },
    };
};

export const StyledPageContainer = styled.div<{ additionalStyles?: CSSObject }>(
    ({ additionalStyles }) => ({
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
    })
);

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

export const SearchInputWrapper = styled.div({
    position: "relative",
    zIndex: "2",
    width: "100%",
});

export const StyledSearchInput = styled.input<{ active: boolean }>(
    ({ active }) => ({
        padding: "10px 6px",
        paddingLeft: "12px",
        width: "100%",
        boxShadow: active ? "0px 22px 30px -10px rgba(0, 0, 0, 0.1)" : "none",
        borderRadius: "32px",
        borderTop: `2px solid ${colors.primary.black}`,
        borderBottom: "none",
        borderLeft: "none",
        borderRight: "none",
        fontSize: "16px",
        zIndex: "2",
        outline: "none",
        [mq("lg")]: {
            padding: "12px 8px",
            paddingLeft: "16px",
            borderRadius: "48px",
            fontSize: "20px",
        },
    })
);

export const SearchIconWrapper = styled.span({
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: "2",
    width: "16px",
    height: "16px",
    [mq("lg")]: {
        right: "16px",
        width: "20px",
        height: "20px",
    },
    ["svg"]: {
        width: "16px !important",
        height: "16px !important",
        [mq("md")]: {
            width: "20px !important",
            height: "20px !important",
        },
    },
});

export const SearchSuggestionsContainer = styled.div<{ active: boolean }>(
    ({ active }) => ({
        display: active ? "block" : "none",
        position: "absolute",
        left: "-2px",
        top: "50%",
        backgroundColor: "white",
        width: "calc(100% + 4px)",
        zIndex: "-1",
        padding: "calc(19px + 8px) 0 8px 0",
        border: `2px solid ${colors.primary.black}`,
        borderBottomRightRadius: "24px",
        borderBottomLeftRadius: "24px",
        overflow: "hidden",
        [mq("lg")]: {
            padding: "calc(23.5px + 12px) 0 12px 0",
            borderBottomRightRadius: "32px",
            borderBottomLeftRadius: "32px",
        },
    })
);

export const SearchSuggestion = styled.div({
    width: "100%",
    cursor: "pointer",
    padding: "3px 12px",
    transition: "all .1s ease",
    ["h6"]: {
        width: "fit-content",
        backgroundImage: "linear-gradient(#feff00,#feff00)",
        backgroundSize: "0 40%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 95%",
        transition: "all 0.1s ease",
        padding: "0 2px",
    },
    ["&:hover"]: {
        ["h6"]: {
            backgroundImage: "linear-gradient(#feff00,#feff00)",
            backgroundSize: "100% 40%",

            backgroundPosition: "0 95%",
        },
    },
    [mq("lg")]: {
        padding: "3px 16px",
    },
});
