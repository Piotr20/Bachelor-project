import { Project, User } from "~/models";

export async function recentSearchesManager(newSearch: User | Project, type: "project" | "person") {
    const searchesFromLocalStorage = localStorage.getItem("recentSearches");
    let searchToAdd = { ...newSearch, type: type };
    let newRecentSearches = [];
    if (searchesFromLocalStorage) {
        newRecentSearches = JSON.parse(searchesFromLocalStorage);
    }
    newRecentSearches.push(searchToAdd);
    const searchesMap = new Map();
    newRecentSearches?.map((search: User | Project) => {
        searchesMap.set(`${search?._id}`, search);
    });
    const filteredArray = Array.from(searchesMap, ([name, value]) => ({ ...value }));
    const trimmdArray = filteredArray.slice(-6);
    localStorage.setItem("recentSearches", JSON.stringify(trimmdArray));
}
