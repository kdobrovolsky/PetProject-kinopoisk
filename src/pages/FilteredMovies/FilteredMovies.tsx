import { useFetchDiscoverMoviesQuery, useFetchMovieListQuery } from '@/shared/api/tmdbApi.ts';
import { useState } from 'react';
import s from './FilteredMovies.module.css';
import { Pagination } from '@/shared';
import { GenreList, RatingRange, SortSelect } from '@/pages/FilteredMovies';
import { MovieCard } from '@/entities/movie/ui';
import { INITIAL_FILTERS } from '@/shared/constants/moviesConstants/moviesConstants.ts';
import { FilteredSkeleton } from '@/pages/FilteredMovies/FilteredSkeletons.tsx';
import { useScrollToTopOnChange } from '@/shared/lib/hooks';
import { discoverFiltersSchema, type DiscoverFilters, normalizeDiscoverFilters } from '@/shared/validation/tmdbSchemas.ts';

export const FilteredMovies = () => {
  const [filters, setFilters] = useState<DiscoverFilters>(() => normalizeDiscoverFilters(INITIAL_FILTERS));
  const [isOpen, setIsOpen] = useState(false);
  const { data: discoverData, isLoading: discoverLoading } = useFetchDiscoverMoviesQuery(filters);
  const { data: genresData, isLoading: genresLoading } = useFetchMovieListQuery();
  const isLoading = discoverLoading || genresLoading;

  useScrollToTopOnChange([filters.page]);

  const updateFilters = (updater: (prev: DiscoverFilters) => unknown) => {
    setFilters(prev => {
      const next = updater(prev);
      const parsed = discoverFiltersSchema.safeParse(next);
      return parsed.success ? parsed.data : prev;
    });
  };

  if (isLoading) {
    return <FilteredSkeleton />;
  }

  const handleGenreToggle = (genreId: string) => {
    const currentGenres = filters.with_genres.split(',').filter(Boolean);

    const updated = currentGenres.includes(genreId)
      ? currentGenres.filter(id => id !== genreId)
      : [...currentGenres, genreId];

    updateFilters(prev => ({
      ...prev,
      with_genres: updated.join(','),
      page: 1,
    }));
  };

  return (
    <div className={s.container}>
      <button className={s.filterButton} onClick={() => setIsOpen(true)}>
        Filters
      </button>

      <div className={`${s.mobileFilters} ${isOpen ? s.open : ''}`}>
        <div className={s.mobileFiltersInner}>
          <SortSelect
            value={filters.sort_by}
            onChange={sortBy => updateFilters(prev => ({ ...prev, sort_by: sortBy }))}
          />

          <RatingRange
            minRating={filters['vote_average.gte']}
            maxRating={filters['vote_average.lte']}
            onRatingChange={(min, max) =>
              updateFilters(prev => ({
                ...prev,
                'vote_average.gte': min,
                'vote_average.lte': max,
                page: 1,
              }))
            }
          />

          <GenreList
            genres={genresData?.genres || []}
            selectedGenres={filters.with_genres}
            onGenreToggle={handleGenreToggle}
          />

          <button className={s.applyButton} onClick={() => setIsOpen(false)}>
            Apply Filters
          </button>

          <button
            className={s.resetButton}
            onClick={() => setFilters(normalizeDiscoverFilters(INITIAL_FILTERS))}
          >
            Reset Filters
          </button>
        </div>
      </div>
      <div className={s.filters}>
        <SortSelect
          value={filters.sort_by}
          onChange={sortBy => updateFilters(prev => ({ ...prev, sort_by: sortBy }))}
        />

        <RatingRange
          minRating={filters['vote_average.gte']}
          maxRating={filters['vote_average.lte']}
          onRatingChange={(min, max) =>
            updateFilters(prev => ({
              ...prev,
              'vote_average.gte': min,
              'vote_average.lte': max,
              page: 1,
            }))
          }
        />

        <GenreList
          genres={genresData?.genres || []}
          selectedGenres={filters.with_genres}
          onGenreToggle={handleGenreToggle}
        />

        <button
          className={s.resetButton}
          onClick={() => setFilters(normalizeDiscoverFilters(INITIAL_FILTERS))}
        >
          Reset Filters
        </button>
      </div>

      <div className={s.results}>
        <MovieCard data={discoverData} />

        <Pagination
          currentPage={filters.page}
          setCurrentPage={p => updateFilters(prev => ({ ...prev, page: p }))}
          pagesCount={discoverData?.total_pages || 1}
        />
      </div>
    </div>
  );
};
