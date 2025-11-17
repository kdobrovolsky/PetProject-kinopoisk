// pages/Favorites/Favorites.tsx
import { useFavorites } from "@/shared";

import s from './Favorites.module.css';
import {FavoriteMoviesCard} from "@/pages/Favorites/FavoriteMoviesCard/FavoriteMoviesCard.tsx";

export const Favorites = () => {
    const { favorites } = useFavorites();

    return (
        <div className={s.container}>
            <h1 className={s.title}>My Favorite Movies</h1>

            {favorites.length === 0 ? (
                <div className={s.emptyState}>
                    <p>No favorite movies yet</p>
                </div>
            ) : (
                <FavoriteMoviesCard movies={favorites} className={s.moviesGrid} />
            )}
        </div>
    );
};