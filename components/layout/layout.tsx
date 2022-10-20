import Head from "next/head";
import styled from "styled-components";
import { mq } from "../../util/media-queries";
import PageTransition from "../pageTransition/pageTransition";
import { useNavStore } from "~/store/store";
import { KeyboardEvent, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "./header";
import Select from "react-select";
import { ifProp } from "styled-tools";

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const { showNav } = useNavStore((state) => ({
        showNav: state.showNav,
    }));
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [searchValue, setSearchValue] = useState<any>(null);
    const options = [
        { value: "all", label: "All" },
        { value: "people", label: "People" },
        { value: "projects", label: "Projects" },
        { value: "skills", label: "Skills" },
    ];

    function executeSearch(e: KeyboardEvent) {
        if (e.key === "Enter") {
            console.log("do validate");
            const query = {
                category: router.query.category,
                search: router.query.search,
            };

            const url = { pathname: "/people", query };
            router.push(url);
        }
    }

    useEffect(() => {
        console.log(selectedOption);
        if (selectedOption) {
            router.replace({
                query: {
                    ...router.query,
                    category: `${selectedOption?.value}`,
                },
            });
        }
        if (searchValue) {
            router.replace({
                query: {
                    ...router.query,
                    search: `${searchValue}`,
                },
            });
        }
    }, [selectedOption, searchValue]);

    if (router.pathname !== "/signUp") {
        return (
            <>
                <PageTransition animationType="fade">
                    <Header />
                    <SearchWrapper>
                        <Select
                            isSearchable={false}
                            defaultValue={selectedOption}
                            onChange={(newValue) => {
                                setSelectedOption(newValue);
                            }}
                            options={options}
                        />
                        <StyledSearchInput
                            type="text"
                            placeholder="Search here"
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
    marginTop: "12vh",
    padding: "24px 0",
}));

export const StyledSearchInput = styled.input(({}) => ({
    padding: "8px 4px",
    width: "40%",
}));
