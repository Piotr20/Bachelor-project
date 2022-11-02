import Head from "next/head";
import styled from "styled-components";
import { mq } from "../../util/media-queries";
import PageTransition from "../pageTransition/pageTransition";
import { useNavStore } from "~/store/store";
import { KeyboardEvent, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "./header";

import { options } from "~/util/searchOptions";
import SlideIn from "../slider/slider";

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [searchValue, setSearchValue] = useState<
        string | string[] | undefined
    >(router.query.search);

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
            });
        }
    }, [selectedOption]); */

    useEffect(() => {
        if (searchValue) {
            router.replace({
                query: {
                    ...router.query,
                    search: `${searchValue}`,
                },
            });
        }
    }, [searchValue]);

    if (router.pathname !== "/signUp") {
        return (
            <>
                <PageTransition animationType="fade">
                    <SlideIn />
                    <Header />
                    <SearchWrapper>
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
                    </SearchWrapper>
                    {children}
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
    width: "100%",
    justifyContent: "center",
    marginTop: "6vh",
    padding: "24px 0",
    [mq("lg")]: {
        marginTop: "12vh",
    },
}));

export const StyledSearchInput = styled.input(({}) => ({
    padding: "8px 4px",
    width: "70%",
    [mq("lg")]: {
        width: "40%",
    },
}));
