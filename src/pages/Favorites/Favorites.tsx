import {useFavorites} from "@/shared";

import s from './Favorites.module.css';
import {FavoriteMoviesCard} from "@/pages/Favorites/FavoriteMoviesCard/FavoriteMoviesCard.tsx";

export const Favorites = () => {
    const { favorites } = useFavorites();


    console.log(favorites, "favoritesfavorites")
    return (
        <div className={s.container}>
            <h1 className={s.title}>My Favorite Movies</h1>

            {favorites.length === 0 ? (
                <div className={s.emptyState}>
                    <p>Add movies to favorites to see them on this page.</p>
                </div>
            ) : (
                <FavoriteMoviesCard  className={s.moviesGrid} />
            )}
        </div>
    );
};