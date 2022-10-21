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
import { useUserStore } from "~/store/userStore";

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const { showNav } = useNavStore((state) => ({
        showNav: state.showNav,
    }));

    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [searchValue, setSearchValue] = useState<
        string | string[] | undefined
    >(router.query.search);
    const options = [
        { value: "all", label: "all" },
        { value: "people", label: "people" },
        { value: "projects", label: "projects" },
        { value: "skills", label: "skills" },
    ];

    function executeSearch(e: KeyboardEvent) {
        if (e.key === "Enter") {
            const query = {
                category: router.query.category,
                search: router.query.search,
            };

            const url = { pathname: "/people", query };
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

    useEffect(() => {
        if (selectedOption) {
            router.replace({
                query: {
                    ...router.query,
                    category: `${selectedOption?.value}`,
                },
            });
        }
    }, [selectedOption]);

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
                    <Header />
                    <SearchWrapper>
                        <Select
                            isSearchable={false}
                            defaultValue={selectedOption}
                            value={selectedOption}
                            onChange={(newValue) => {
                                setSelectedOption(newValue);
                            }}
                            options={options}
                        />
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
    marginTop: "12vh",
    padding: "24px 0",
}));

export const StyledSearchInput = styled.input(({}) => ({
    padding: "8px 4px",
    width: "40%",
}));
