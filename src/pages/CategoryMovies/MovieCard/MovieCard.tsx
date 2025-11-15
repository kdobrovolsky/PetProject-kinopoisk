import s from "@/pages/CategoryMovies/CategoryMovies.module.css";
import {RATING_THRESHOLDS} from "@/shared";
import type {TMDBMoviesResponse} from "@/features/api/tmdbApi.types.ts";

type PropsMovieCard = {
    data: TMDBMoviesResponse | undefined
}

export const MovieCard = ({data}:PropsMovieCard) => {
    return(
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
                            movie.vote_average >= RATING_THRESHOLDS.HIGH ? s.high :
                                movie.vote_average >= RATING_THRESHOLDS.MEDIUM ? s.medium : s.low
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
    )
}