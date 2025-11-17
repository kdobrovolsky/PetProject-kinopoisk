import s from "@/pages/CategoryMovies/CategoryMovies.module.css";
import { RATING_THRESHOLDS, useFavorites } from "@/shared";
import type { FavoriteMovie } from "@/features/api/tmdbApi.types.ts";

type Props = {
    movies: FavoriteMovie[];
    className?: string;
}

export const FavoriteMoviesCard = ({ movies, className }: Props) => {
    const {  removeFavorite } = useFavorites();

    const handleFavoriteClick = (movieId: number) => {
        removeFavorite(movieId);
    };

    return (
        <div className={className ? className : s.moviesGrid}>
            {movies.map((movie) => (
                <article key={movie.id} className={s.movieCard}>
                    {movie.posterUrl ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.posterUrl}`}
                            alt={movie.title}
                            className={s.moviePoster}
                            loading="lazy"
                        />
                    ) : (
                        <div className={s.posterPlaceholder}>
                            No Image
                        </div>
                    )}

                    <button
                        onClick={() => handleFavoriteClick(movie.id)}
                        className={`${s.favoriteButton} ${s.active}`}
                    >
                        🧡
                    </button>

                    <div
                        className={`${s.movieRatingOverlay} ${
                            movie.voteAverage >= RATING_THRESHOLDS.HIGH ? s.high :
                                movie.voteAverage >= RATING_THRESHOLDS.MEDIUM ? s.medium : s.low
                        }`}
                    >
                        {movie.voteAverage.toFixed(1)}
                    </div>

                    <div className={s.movieInfo}>
                        <h3 className={s.movieTitle}>{movie.title}</h3>
                    </div>
                </article>
            ))}
        </div>
    );
};