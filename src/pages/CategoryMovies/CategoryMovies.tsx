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
import {useEffect, useState} from "react";
import {Pagination} from "@/common";

import {MOVIE_CATEGORIES} from "@/features";
import {MovieCard} from "@/pages/CategoryMovies/MovieCard/MovieCard.tsx";

export const CategoryMovies = () => {

    const navigate = useNavigate();
    const {type = 'popular'} = useParams()
    const [page, setPage] = useState(1);

    const {data:dataPopular} = useFetchPopularMoviesQuery(page,{skip: type !== 'popular'});
    const {data:dataNowPlaying} = useFetchNowPlayingQuery(page,{skip: type !== 'now-playing'})
    const {data:dataUpcoming} = useFetchUpcomingQuery(page,{skip: type !== 'upcoming'})
    const {data:dataTopRated} = useFetchTopRatedQuery(page,{skip: type !== 'top-rated'})


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



    useEffect(() => {
        setPage(1)
    }, [type]);

    return (
        <div className={s.container}>

            <nav className={s.navigation}>
            {MOVIE_CATEGORIES.map((category) => (
                <button
                key={category.key}
                onClick={() => navigate(`/category/${category.key}`)}
                className={`${s.navButton} ${type === category.key ? s.active: ''}`}>
                    {category.label}
                </button>
            ))}
            </nav>

            <h1 className={s.categoryTitle}>{categoriesTitle[type]}</h1>
            <MovieCard data={data }/>
            <Pagination currentPage={page} setCurrentPage={setPage} pagesCount={data?.total_pages || 1}/>
        </div>
    )
}