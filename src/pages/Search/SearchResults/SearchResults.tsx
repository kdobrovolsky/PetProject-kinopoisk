import s from "@/pages/Search/Search.module.css";

type Props = {
    isSearching: boolean;
    searchQuery: string;
    hasResults: boolean;
}

export const SearchResults = ({isSearching,searchQuery,hasResults}:Props) => {
    return(
        <div>
            {!isSearching && !searchQuery && (
                <p className={s.emptyState}>Enter a movie title to start searching.</p>
            )}

            {isSearching && !hasResults && (
                <div>
                    <h2 className={s.resultsTitle}>{`Results for "${searchQuery}"`}</h2>
                    <p className={s.noResults}>No matches found for "{searchQuery}"</p>
                </div>

            )}
        </div>
    )
}