import s from "@/pages/Main/Main.module.css";
import {type ChangeEvent, type FormEvent, useState} from "react";
import {useLazyFetchSearchMoviesQuery} from "@/features/api/tmdbApi.ts";

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [triggerSearch,{data}] = useLazyFetchSearchMoviesQuery()


    const handleSearchSubmit =async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            await triggerSearch({query:searchQuery})
        }
    };
    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };


    return (
      <div>
          <h2>Search Results</h2>
          <form onSubmit={handleSearchSubmit} className={s.searchForm}>
              <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInput}
                  placeholder="Search for movies..."
                  className={s.searchInput}
              />
              <button
                  type="submit"
                  className={s.searchButton}
                  disabled={!searchQuery.trim()}
              >
                  Search
              </button>
          </form>
          <div className={s.moviesGrid}>
              {data?.results.map((movie) => (
                  <article key={movie.id} className={s.movieCard}>
                      {movie.poster_path ? (
                          <img
                              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                              alt={movie.title}
                              className={s.moviePoster}
                              loading="lazy"
                          />
                      ) : (
                          <div className={s.posterPlaceholder}>
                              No Image
                          </div>
                      )}


                      <div
                          className={`${s.movieRatingOverlay} ${
                              movie.vote_average >= 7 ? s.high :
                                  movie.vote_average >= 5 ? s.medium : s.low
                          }`}
                      >
                          {movie.vote_average.toFixed(1)}
                      </div>
                      <div className={s.movieInfo}>
                          <h3 className={s.movieTitle}>{movie.title}</h3>
                      </div>
                  </article>
              ))}
          </div>
      </div>
    )
}