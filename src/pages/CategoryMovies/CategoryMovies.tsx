import {
    useFetchNowPlayingQuery,
    useFetchPopularMoviesQuery,
    useFetchTopRatedQuery,
    useFetchUpcomingQuery
} from "@/features/api/tmdbApi.ts";
import s from "./CategoryMovies.module.css";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {categoriesTitle} from "@/features/api/tmdbApi.types.ts";

export const CategoryMovies = () => {

    const navigate = useNavigate();
    const {type = 'popular'} = useParams()
    const currentType = type || "popular" ;

    const dataPopular = useFetchPopularMoviesQuery().data
    const dataNowPlaying = useFetchNowPlayingQuery().data
    const dataUpcoming = useFetchUpcomingQuery().data
    const dataTopRated = useFetchTopRatedQuery().data


    let data;
    switch (currentType) {
        case "popular":
            data = dataPopular
            break;
        case "topRated":
            data = dataTopRated
            break;
        case 'upcoming':
            data = dataUpcoming
            break;
        case 'now-playing':
            data = dataNowPlaying
            break;
        default:
            data = dataPopular
    }

    const handleClickPopular = () => {
        navigate("/category/popular");
    }

    const handleClickTopRated = () => {
        navigate("/category/top-rated");
    }

    const handleClickUpcomingMovies = () => {
        navigate("/category/upcoming");
    }
    const handleClickNowPlayingMovies = () => {
        navigate("/category/now-playing");
    }


    return (
        <div className={s.container}>
            <nav className={s.navigation}>
                <button
                    onClick={handleClickPopular}
                    className={`${s.navButton} ${currentType === 'popular' ? s.active : ''}`}
                >
                    Popular Movies
                </button>
                <button
                    onClick={handleClickTopRated}
                    className={`${s.navButton} ${currentType === 'top-rated' ? s.active : ''}`}
                >
                    Top Rated Movies
                </button>
                <button
                    onClick={handleClickUpcomingMovies}
                    className={`${s.navButton} ${currentType === 'upcoming' ? s.active : ''}`}
                >
                    Upcoming Movies
                </button>
                <button
                    onClick={handleClickNowPlayingMovies}
                    className={`${s.navButton} ${currentType === 'now-playing' ? s.active : ''}`}
                >
                    Now Playing Movies
                </button>
            </nav>

            {/* Заголовок категории */}
            <h1 className={s.categoryTitle}>{categoriesTitle[currentType]}</h1>

            {/* Сетка фильмов */}
            <div className={s.moviesGrid}>
                {data?.results.map((movie) => (
                    <article key={movie.id} className={s.movieCard}>
                        {/* Постер фильма */}
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

                        {/* Рейтинг */}
                        <div
                            className={`${s.movieRatingOverlay} ${
                                movie.vote_average >= 7 ? s.high :
                                    movie.vote_average >= 5 ? s.medium : s.low
                            }`}
                        >
                            {movie.vote_average.toFixed(1)}
                        </div>

                        {/* Информация о фильме */}
                        <div className={s.movieInfo}>
                            <h3 className={s.movieTitle}>{movie.title}</h3>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}