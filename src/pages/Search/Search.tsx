import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {useLazyFetchSearchMoviesQuery} from "@/features/api/tmdbApi.ts";
import {MovieCard} from "@/pages/CategoryMovies/MovieCard/MovieCard.tsx";
import {SearchForm} from "@/shared/SearchForm/SearchForm.tsx";
import s from './Search.module.css'
import {Pagination} from "@/common";
import {useSearchParams} from "react-router";
import {SearchResults} from "@/pages/Search/SearchResults/SearchResults.tsx";

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [triggerSearch,{data,reset}] = useLazyFetchSearchMoviesQuery()
    const [page,setPage] = useState(1);
    const [isSearching,setIsSearching] = useState(false);
    const [searchParams] = useSearchParams()

    const queryValue = searchParams.get("query");

    useEffect(() => {
        if(queryValue){
            setIsSearching(true)
            setSearchQuery(queryValue)
            setPage(1)
            triggerSearch({query:queryValue, page:1})
        }
    }, [queryValue]);


    const handleSearchSubmit =async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearching(true)
            setPage(1)
            await triggerSearch({query:searchQuery, page:1})
        }
    };

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(e.target.value);
        if(!value.trim()){
            setIsSearching(false)
            reset() //с помощью резет сбрасываем сост запроса
        }
    };

    useEffect(() => {
        if (page >= 1 && searchQuery.trim()) {
            triggerSearch({query:searchQuery, page})
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [page]);

    const showData = isSearching ? data : null;
    const hasResults = !!(showData?.results?.length);


    return (
      <div className={s.container}>
          <h2 className={s.title}>Search Results</h2>
          <SearchForm handleSearchSubmit={handleSearchSubmit} handleSearchInput={handleSearchInput} searchQuery={searchQuery}  />
          {/*условный рендр вынесен в отдельный компонент*/}
          <SearchResults isSearching={isSearching} searchQuery={searchQuery} hasResults={hasResults} />

          {(data?.results.length && data.results.length > 0) && isSearching && hasResults && (
              <div>
                  <h2 className={s.resultsTitle}>{`Results for "${searchQuery}"`}</h2>
                  <MovieCard data={data}/>
                  <Pagination currentPage={page} setCurrentPage={setPage} pagesCount={data?.total_pages || 1}/>
              </div>
          )}

      </div>
    )
}