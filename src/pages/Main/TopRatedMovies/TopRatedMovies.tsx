import s from '/src/pages/Main/Main.module.css'
import {useNavigate} from "react-router-dom";
import {useFetchTopRatedQuery} from "@/features/api/tmdbApi.ts";


export const TopRatedMovies = () => {

    const {data} = useFetchTopRatedQuery()
    const navigate = useNavigate();
    const handleViewMore = () => {
        navigate('/category/topRated');
    };
    return (
        <section className={s.mainContent}>
            <div className={s.sectionHeader}>
                <h2 className={s.sectionTitle}>Top Rated Movies</h2>
                <button
                    className={s.viewMoreButton}
                    onClick={handleViewMore}
                >
                    View More
                </button>
            </div>

            <div className={s.moviesGrid}>
                {data?.results.slice(0, 6).map((movie) => (
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
        </section>
    )
}