import styled from "styled-components";
import { Project, Skill, User } from "~/models";
import Text from "../typography/text";
import { useRouter } from "next/router";
import { mq } from "~/util/media-queries";
import { colors } from "~/util/colorPalette";
import { SearchHits } from "~/pages/searchResults";
import { SetStateAction } from "react";

type SearchSuggestionsProps = {
    showSuggestions: boolean;
    searchHits: SearchHits;
    setSearchValue: (data?: string) => void;
    setShowSuggestions: (value: boolean) => void;
};

const SearchSuggestions = ({
    showSuggestions,
    searchHits,
    setSearchValue,
    setShowSuggestions,
}: SearchSuggestionsProps) => {
    const router = useRouter();
    return (
        <SearchSuggestionsContainer active={showSuggestions}>
            <Text
                tag="h4"
                additionalStyles={{
                    marginBottom: "12px",
                    padding: "0 8px",
                    [mq("lg")]: {
                        padding: "0 12px",
                    },
                }}
            >
                {`Suggestions (${
                    ((searchHits?.people?.length || 0) as number) +
                    ((searchHits?.projects?.length || 0) as number) +
                    ((searchHits?.skills?.skillsList?.length || 0) as number)
                })`}
            </Text>
            <SearchWrapper>
                {searchHits?.people?.length ? (
                    <>
                        <Text
                            tag="h6"
                            additionalStyles={{
                                color: colors.primary.lightGrey,
                                marginBottom: "2px",
                                marginTop: "4px",
                                padding: "0 8px",
                                [mq("lg")]: {
                                    padding: "0 12px",
                                },
                            }}
                        >
                            People
                        </Text>
                        {searchHits.people?.map((employee: User, key) => {
                            return (
                                <SearchSuggestion
                                    key={key}
                                    onClick={() => {
                                        setSearchValue(employee?.name);
                                        const query = {
                                            ...router.query,
                                            search: employee?.name,
                                        };
                                        const url = {
                                            pathname: "/searchResults",
                                            query,
                                        };
                                        setShowSuggestions(false);
                                        router.push(url);
                                    }}
                                >
                                    <Text tag="h5" additionalStyles={{}}>
                                        {employee?.name}
                                    </Text>
                                </SearchSuggestion>
                            );
                        })}
                    </>
                ) : null}
                {searchHits?.projects?.length ? (
                    <>
                        <Text
                            tag="h6"
                            additionalStyles={{
                                color: colors.primary.lightGrey,
                                marginBottom: "2px",
                                marginTop: "4px",
                                padding: "0 8px",
                                [mq("lg")]: {
                                    padding: "0 12px",
                                },
                            }}
                        >
                            Projects
                        </Text>
                        {searchHits.projects?.map((project: Project, key) => {
                            return (
                                <SearchSuggestion
                                    key={key}
                                    onClick={() => {
                                        setSearchValue(project?.name);
                                        const query = {
                                            ...router.query,
                                            search: project?.name,
                                        };
                                        const url = {
                                            pathname: "/searchResults",
                                            query,
                                        };
                                        setShowSuggestions(false);
                                        router.push(url);
                                    }}
                                >
                                    <Text tag="h5">{project?.name}</Text>
                                </SearchSuggestion>
                            );
                        })}
                    </>
                ) : null}
                {searchHits?.skills?.skillsList?.length ? (
                    <>
                        <Text
                            tag="h6"
                            additionalStyles={{
                                color: colors.primary.lightGrey,
                                marginBottom: "2px",
                                marginTop: "4px",
                                padding: "0 8px",
                                [mq("lg")]: {
                                    padding: "0 12px",
                                },
                            }}
                        >
                            Skills
                        </Text>
                        {searchHits.skills?.skillsList?.map((skill: Skill, key) => {
                            return (
                                <SearchSuggestion
                                    key={key}
                                    onClick={() => {
                                        setSearchValue(skill?.name);
                                        const query = {
                                            ...router.query,
                                            search: skill?.name,
                                        };
                                        const url = {
                                            pathname: "/searchResults",
                                            query,
                                        };
                                        setShowSuggestions(false);
                                        router.push(url);
                                    }}
                                >
                                    <Text tag="h5">{skill?.name}</Text>
                                </SearchSuggestion>
                            );
                        })}
                    </>
                ) : null}
                {!searchHits?.skills?.skillsList?.length &&
                !searchHits?.projects?.length &&
                !searchHits?.people?.length ? (
                    <Text
                        tag="h5"
                        additionalStyles={{
                            paddingLeft: "8px",
                            [mq("lg")]: {
                                paddingLeft: "12px",
                            },
                        }}
                    >
                        No suggestions found
                    </Text>
                ) : null}{" "}
            </SearchWrapper>
        </SearchSuggestionsContainer>
    );
};

export default SearchSuggestions;

export const SearchSuggestionsContainer = styled.div<{ active: boolean }>(({ active }) => ({
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
}));

export const SearchWrapper = styled.div({
    backgroundColor: "white",
    width: "100%",
    maxHeight: "40ch",
    overflowY: "auto",
    [mq("lg")]: {},
});

export const SearchSuggestion = styled.div({
    width: "100%",
    cursor: "pointer",
    padding: "3px 12px",
    transition: "all .1s ease",
    ["h5"]: {
        width: "fit-content",
        backgroundImage: "linear-gradient(#feff00,#feff00)",
        backgroundSize: "0 40%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 95%",
        transition: "all 0.1s ease",
        padding: "0 2px",
    },
    ["&:hover"]: {
        ["h5"]: {
            backgroundImage: "linear-gradient(#feff00,#feff00)",
            backgroundSize: "100% 40%",

            backgroundPosition: "0 95%",
        },
    },
    [mq("lg")]: {
        padding: "3px 16px",
    },
});
