
import {CategoryMovies, Favorites, FilteredMovies, Main, Search} from "@/pages";
import { Route, Routes } from "react-router-dom";
import {NotFound} from "@/pages/NotFound/NotFound.tsx";

export const Path = {
    Main: '/',
    CategoryMovies: '/category/:type',
    FilteredMovies: '/filtered',
    Search: '/search',
    Favorites: '/favorites',
    NotFound: '*',
} as const

export const Routing = () => (
    <Routes>
        <Route path={Path.Main} element={<Main/>} />
        <Route path={Path.CategoryMovies} element={<CategoryMovies />} />
        <Route path={Path.FilteredMovies} element={<FilteredMovies />} />
        <Route path={Path.Search} element={<Search />} />
        <Route path={Path.Favorites} element={<Favorites />} />
        <Route path={Path.NotFound} element={<NotFound />} />
    </Routes>
)