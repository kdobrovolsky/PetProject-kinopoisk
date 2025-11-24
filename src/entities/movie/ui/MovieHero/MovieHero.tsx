import s from './MovieHero.module.css';
import { useNavigate } from 'react-router-dom';
import { useFetchMovieDetailsQuery } from '@/shared/api/tmdbApi.ts';

type Props = {
  movieId: number;
};

export const MovieHero = ({ movieId }: Props) => {
  const { data } = useFetchMovieDetailsQuery(movieId);
  const navigate = useNavigate();
  const runtime = data?.runtime || 0;
  const hours = Math.floor(runtime / 60) || 0;
  const minutes = runtime % 60;

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      {data && (
        <>
          <nav className={s.navigation}>
            <button className={s.backButton} onClick={handleBack}>
              ← Back to Movies
            </button>
          </nav>
          <section className={s.movieHero}>
            <div className={s.posterSection}>
              <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={`Poster for ${data.title}`}
                className={s.poster}
                loading='lazy'
              />
            </div>

            <div className={s.infoSection}>
              <header className={s.movieHeader}>
                <h1 className={s.title}>{data.title}</h1>
                <div className={s.metaInfo}>
                  <span className={s.year}>
                    Release year: {new Date(data.release_date).getFullYear()}
                  </span>
                  <span className={s.rating}>⭐ {data.vote_average.toFixed(1)}</span>
                  <span className={s.runtime}>
                    {hours}h {minutes}m
                  </span>
                </div>
              </header>
              <p className={s.overview}>{data.overview}</p>

              <div className={s.genres}>
                <h3 className={s.titleGenres}>Genres</h3>
                <div className={s.genresList}>
                  {data.genres.map(genre => (
                    <span key={genre.id} className={s.genreTag}>
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
