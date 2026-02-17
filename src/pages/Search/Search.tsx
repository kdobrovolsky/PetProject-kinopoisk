import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { useLazyFetchSearchMoviesQuery } from '@/shared/api/tmdbApi.ts';
import s from './Search.module.css';
import { Pagination } from '@/shared';
import { useSearchParams } from 'react-router';
import { SearchResults } from '@/pages/Search';
import { MovieCard } from '@/entities/movie/ui';
import { SearchForm } from '@/shared';
import { normalizeSearchQuery, searchQuerySchema } from '@/shared/validation/tmdbSchemas.ts';
import { toast } from 'react-toastify';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [triggerSearch, { data, reset }] = useLazyFetchSearchMoviesQuery();
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams] = useSearchParams();

  const queryValue = searchParams.get('query');

  useEffect(() => {
    if (queryValue) {
      const parsedQuery = searchQuerySchema.safeParse(queryValue);

      if (!parsedQuery.success) {
        setIsSearching(false);
        setSearchQuery('');
        reset();
        toast('Search query must contain from 1 to 100 characters', {
          type: 'warning',
          theme: 'colored',
        });
        return;
      }

      const normalizedQuery = parsedQuery.data;
      setIsSearching(true);
      setSearchQuery(normalizedQuery);
      setPage(1);
    }
  }, [queryValue, reset, triggerSearch]);

  useEffect(() => {
    if (isSearching && page >= 1 && searchQuery.trim()) {
      triggerSearch({ query: searchQuery, page });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isSearching, page, searchQuery, triggerSearch]);

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedQuery = searchQuerySchema.safeParse(searchQuery);

    if (!parsedQuery.success) {
      toast('Search query must contain from 1 to 100 characters', {
        type: 'warning',
        theme: 'colored',
      });
      return;
    }

    const normalizedQuery = normalizeSearchQuery(searchQuery);
    setIsSearching(true);
    setSearchQuery(normalizedQuery);
    setPage(1);
  };

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 100);
    setSearchQuery(value);

    if (!value.trim()) {
      setIsSearching(false);
      reset();
    }
  };

  const showData = isSearching ? data : null;
  const hasResults = !!showData?.results?.length;
  const shouldShowResults =
    !!data?.results.length && data.results.length > 0 && isSearching && hasResults;

  return (
    <div className={s.container}>
      <h2 className={s.title}>Search Results</h2>
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleSearchInput={handleSearchInput}
        searchQuery={searchQuery}
      />
      <SearchResults isSearching={isSearching} searchQuery={searchQuery} hasResults={hasResults} />

      {shouldShowResults && (
        <div>
          <h2 className={s.resultsTitle}>{`Results for "${searchQuery}"`}</h2>
          <MovieCard data={data} />
          <Pagination
            currentPage={page}
            setCurrentPage={setPage}
            pagesCount={data?.total_pages || 1}
          />
        </div>
      )}
    </div>
  );
};
