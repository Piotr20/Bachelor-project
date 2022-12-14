import type { GetServerSideProps } from "next";
import styled, { CSSObject } from "styled-components";
import { mq } from "../../util/media-queries";
import PageTransition from "../pageTransition/pageTransition";
import { useNavStore } from "~/store/store";
import { KeyboardEvent, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "./header";
import Select from "react-select";
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
import { Button } from "../button/button";
import SearchSuggestions from "../search/searchSuggestions";

type LayoutProps = {
    children: ReactNode;
    fallback?: { searchHits: SearchHits };
};

const Layout = ({ children, fallback }: LayoutProps) => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<any>({
        value: router.query.category ? router.query.category : "all",
        label: router.query.category ? router.query.category : "All",
    });
    const [searchValue, setSearchValue] = useState<
        string | string[] | undefined
    >(router.query.search);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const { openProfile } = useUserStore((state) => ({
        openProfile: state.openProfile,
    }));
    const { sliderData, openSlider, sliderDataType, breadcrumbData } =
        useNavStore((state) => ({
            openSlider: state.openSlider,
            sliderData: state.sliderData,
            sliderDataType: state.sliderDataType,
            breadcrumbData: state.breadcrumbData,
        }));

    const searchQuery = (
        router.query.search ? router.query.search : ""
    ) as string;
    const categoryQuery = (
        router.query.category ? router?.query?.category : "all"
    ) as "all" | "people" | "projects" | "skills";

    const fallbackHits = fallback?.searchHits;
    const searchData = useSearch(
        categoryQuery,
        fallbackHits?.people,
        fallbackHits?.projects,
        fallbackHits?.skills?.skillsList
    );

    const searchHits = outputFormatterHelper(
        categoryQuery,
        searchQuery,
        searchData?.searchHits?.people,
        searchData?.searchHits?.projects,
        searchData?.searchHits?.skills
    );

    function executeSearch(e: KeyboardEvent) {
        if (e.key === "Enter") {
            setShowSuggestions(false);
            const query = {
                category: router.query.category,
                search: router.query.search,
            };

            const url = { pathname: "/searchResults", query };
            router.push(url);
        }
    }

    function handleSuggestions() {
        setShowSuggestions(true);
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
    }, [router.isReady, router.query.category]);

    useEffect(() => {
        if (selectedOption) {
            router.replace(
                {
                    query: {
                        ...router.query,
                        category: `${selectedOption?.value}`,
                    },
                },
                undefined,
                { shallow: true }
            );
        }
    }, [selectedOption]);

    useEffect(() => {
        const { search, ...queries } = router.query;
        router.replace(
            {
                query: {
                    ...queries,
                    ...(!!searchValue ? { search: `${searchValue}` } : {}),
                },
            },
            undefined,
            { shallow: true }
        );
    }, [searchValue]);

    useEffect(() => {
        const {
            search,
            category,
            breadcrumbId,
            breadcrumbType,
            breadcrumbName,
            ...queries
        } = router.query;
        if (openSlider) {
            document.body.style.overflow = "hidden";
            if (sliderData) {
                router.replace(
                    {
                        query: {
                            ...(!!categoryQuery
                                ? { category: `${categoryQuery}` }
                                : {}),
                            ...(!!searchValue
                                ? { search: `${searchValue}` }
                                : {}),
                            ...(!!breadcrumbId
                                ? { breadcrumbId: `${breadcrumbId}` }
                                : {}),
                            ...(!!breadcrumbType
                                ? { breadcrumbType: `${breadcrumbType}` }
                                : {}),
                            ...(!!breadcrumbName
                                ? { breadcrumbName: `${breadcrumbName}` }
                                : {}),
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
            document.body.style.overflow = "auto";
            router.replace(
                {
                    query: {
                        ...(!!categoryQuery
                            ? { category: `${categoryQuery}` }
                            : {}),
                        ...(!!searchValue ? { search: `${searchValue}` } : {}),
                    },
                },
                undefined,
                { shallow: true }
            );
        }
    }, [sliderData, openSlider, sliderDataType]);

    useEffect(() => {
        if (openProfile) {
            document.body.style.overflow = "hidden";
            if (
                router.query.search ||
                typeof router.query.search === "string"
            ) {
                router.replace(
                    {
                        query: {
                            category: `${categoryQuery}`,
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
            document.body.style.overflow = "auto";
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

    useEffect(() => {
        if (breadcrumbData) {
            router.replace(
                {
                    query: {
                        ...router.query,
                        breadcrumbId: `${breadcrumbData._id}`,
                        breadcrumbType: `${breadcrumbData.type}`,
                        breadcrumbName: `${breadcrumbData.name}`,
                    },
                },
                undefined,
                { shallow: true }
            );
        }
    }, [breadcrumbData]);

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
                            <SearchContainer>
                                <SearchBarGroup>
                                    <SearchInputWrapper>
                                        <StyledSearchInput
                                            active={!showSuggestions}
                                            type="text"
                                            placeholder="Type here.."
                                            defaultValue={router.query.search}
                                            onChange={(e) => {
                                                setSearchValue(e.target.value);
                                                setShowSuggestions(true);
                                            }}
                                            onKeyDown={(e) => executeSearch(e)}
                                            onBlur={(e) =>
                                                setTimeout(
                                                    () =>
                                                        setShowSuggestions(
                                                            false
                                                        ),
                                                    100
                                                )
                                            }
                                        />
                                    </SearchInputWrapper>
                                    <StyledSelect>
                                        <Select
                                            isSearchable={false}
                                            defaultValue={selectedOption}
                                            value={selectedOption}
                                            onChange={(newValue) => {
                                                setSelectedOption(newValue);
                                            }}
                                            options={options}
                                            styles={{
                                                container: (provided) => ({
                                                    ...provided,
                                                    height: "100%",
                                                    width: "100%",
                                                    borderRadius: "32px",
                                                }),
                                                control: (provided) => ({
                                                    ...provided,
                                                    height: "100%",
                                                    border: "none",
                                                    borderRadius: 0,
                                                    borderTopRightRadius:
                                                        "32px",
                                                    borderBottomRightRadius:
                                                        "32px",
                                                    boxShadow: "none",
                                                    outline: "none",
                                                    ["&:hover"]: {
                                                        border: "none",
                                                        outline: "none",
                                                    },
                                                }),
                                                singleValue: (provided) => ({
                                                    ...provided,
                                                    textOverflow: "initial",
                                                }),
                                                indicatorSeparator: () => ({
                                                    display: "none",
                                                }),
                                                menu: (provided) => ({
                                                    ...provided,
                                                    marginTop: 0,
                                                }),
                                            }}
                                        />
                                    </StyledSelect>
                                    <SearchSuggestions
                                        showSuggestions={showSuggestions}
                                        searchHits={searchHits}
                                        setSearchValue={setSearchValue}
                                        setShowSuggestions={setShowSuggestions}
                                    />
                                </SearchBarGroup>
                                <Button
                                    kind="search"
                                    additionalStyles={{
                                        borderTop: `2px solid ${colors.primary.black}`,
                                    }}
                                    onClick={() => {
                                        setShowSuggestions(false);
                                        const query = {
                                            category: router.query.category,
                                            search: router.query.search,
                                        };

                                        const url = {
                                            pathname: "/searchResults",
                                            query,
                                        };
                                        router.push(url);
                                    }}
                                >
                                    <SvgIcon svg="search" /> <p>Search</p>
                                </Button>
                            </SearchContainer>
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
    const category = (
        context.query["category"] ? context.query["category"] : "all"
    ) as "projects" | "skills" | "people" | "all";
    const data = await fetchSearchResults(category);
    const searchHits = outputFormatterHelper(
        category,
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
    [mq("lg")]: {
        paddingTop: "calc(24px + 12vh)",
    },
}));

export const SearchBarGroup = styled.div({
    display: "flex",
    width: "100%",
    zIndex: "10",
    position: "sticky",
    top: 0,
});

export const SearchInputWrapper = styled.div({
    position: "relative",
    zIndex: "2",
    width: "100%",
});

export const SearchContainer = styled.div({
    display: "flex",
    width: "100%",
    gap: "8px",
});

export const StyledSearchInput = styled.input<{ active: boolean }>(
    ({ active }) => ({
        padding: "10px 6px",
        paddingLeft: "12px",
        width: "100%",
        boxShadow: active ? "0px 22px 30px -10px rgba(0, 0, 0, 0.1)" : "none",
        borderBottomLeftRadius: "32px",
        borderTopLeftRadius: "32px",
        borderTop: `2px solid ${colors.primary.black}`,
        borderBottom: "none",
        borderLeft: "none",
        borderRight: "none",
        fontSize: "16px",
        zIndex: "2",
        outline: "none",
        height: "100%",
        [mq("lg")]: {
            padding: "12px 8px",
            paddingLeft: "16px",
            borderBottomLeftRadius: "48px",
            borderTopLeftRadius: "48px",
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

export const StyledSelect = styled.div({
    borderTop: `2px solid ${colors.primary.black}`,
    width: "140px",
    fontFamily: "Flama",
    position: "relative",
    ["&::before"]: {
        content: '""',
        zIndex: "1",
        width: "2px",
        height: "70%",
        position: "absolute",
        left: "0",
        top: "50%",
        transform: "translate(-50%,-50%)",
        backgroundColor: colors.primary.black,
    },
    [mq("lg")]: {
        width: "120px",
    },
});
