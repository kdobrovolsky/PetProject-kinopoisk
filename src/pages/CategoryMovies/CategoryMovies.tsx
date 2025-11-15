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
import {useState} from "react";
import {Pagination} from "@/common";

export const CategoryMovies = () => {

    const navigate = useNavigate();
    const {type = 'popular'} = useParams()
    const [page, setPage] = useState(1);

    const {data:dataPopular} = useFetchPopularMoviesQuery(page)
    const {data:dataNowPlaying} = useFetchNowPlayingQuery(page)
    const {data:dataUpcoming} = useFetchUpcomingQuery(page)
    const {data:dataTopRated} = useFetchTopRatedQuery(page)


    let data;
    switch (type) {
        case "popular":
            data = dataPopular
            break;
        case "top-rated":
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

    console.log(`total pages${data?.total_pages} `)
    console.log(`total pages${data?.total_results} `)

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
                    className={`${s.navButton} ${type === 'popular' ? s.active : ''}`}
                >
                    Popular Movies
                </button>
                <button
                    onClick={handleClickTopRated}
                    className={`${s.navButton} ${type === 'top-rated' ? s.active : ''}`}
                >
                    Top Rated Movies
                </button>
                <button
                    onClick={handleClickUpcomingMovies}
                    className={`${s.navButton} ${type === 'upcoming' ? s.active : ''}`}
                >
                    Upcoming Movies
                </button>
                <button
                    onClick={handleClickNowPlayingMovies}
                    className={`${s.navButton} ${type === 'now-playing' ? s.active : ''}`}
                >
                    Now Playing Movies
                </button>
            </nav>

            {/* Заголовок категории */}
            <h1 className={s.categoryTitle}>{categoriesTitle[type]}</h1>

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
            <Pagination currentPage={page} setCurrentPage={setPage} pagesCount={data?.total_pages || 1}/>
        </div>
    )
}