import { useFetchDiscoverMoviesQuery, useFetchMovieListQuery } from '@/shared/api/tmdbApi.ts';
import { useState } from 'react';
import s from './FilteredMovies.module.css';
import { Pagination } from '@/common';

import { GenreList, SortSelect, RatingRange } from '@/pages/FilteredMovies';
import { MovieCard } from '@/entities/movie/ui';
import { INITIAL_FILTERS } from '@/shared/constants/moviesConstants/moviesConstants.ts';

export const FilteredMovies = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const { data: discoverData } = useFetchDiscoverMoviesQuery(filters);
  const { data: genresData } = useFetchMovieListQuery();

  const handleGenreToggle = (genreId: string) => {
    const currentGenres = filters.with_genres.split(',').filter(Boolean);
    if (currentGenres.includes(genreId.toString())) {
      const newArray = currentGenres.filter(id => id !== genreId.toString());
      setFilters({
        ...filters,
        with_genres: newArray.join(','),
        page: 1,
      });
    } else {
      const newArray = [...currentGenres, genreId.toString()];
      setFilters({
        ...filters,
        with_genres: newArray.join(','),
        page: 1,
      });
    }
  };

  return (
    <div className={s.container}>
      <div className={s.filters}>
        <SortSelect
          value={filters.sort_by}
          onChange={sortBy => setFilters({ ...filters, sort_by: sortBy })}
        />

        <RatingRange
          minRating={filters['vote_average.gte']}
          maxRating={filters['vote_average.lte']}
          onRatingChange={(min, max) => {
            setFilters({
              ...filters,
              'vote_average.gte': min,
              'vote_average.lte': max,
              page: 1,
            });
          }}
        />

        <GenreList
          genres={genresData?.genres || []}
          selectedGenres={filters.with_genres}
          onGenreToggle={handleGenreToggle}
        />

        <button className={s.resetButton} onClick={() => setFilters(INITIAL_FILTERS)}>
          Reset Filters
        </button>
      </div>

      <div className={s.results}>
        <MovieCard data={discoverData} />
        <Pagination
          currentPage={filters.page}
          setCurrentPage={newPage => {
            setFilters({ ...filters, page: newPage });
          }}
          pagesCount={discoverData?.total_pages || 1}
        />
      </div>
    </div>
  );
};
