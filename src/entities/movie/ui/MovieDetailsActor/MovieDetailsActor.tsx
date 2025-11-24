import { useFetchCreditsQuery } from '@/shared/api/tmdbApi.ts';
import s from './MovieDetailsActor.module.css';

type Props = {
  movieId: number;
};

export const MovieDetailsActor = ({ movieId }: Props) => {
  const { data: dataCredits } = useFetchCreditsQuery(movieId);
  return (
    <section className={s.castSection}>
      <h2 className={s.sectionTitle}>Top Cast</h2>
      <div className={s.castGrid}>
        {dataCredits?.cast.slice(0, 6).map(actor => (
          <article key={actor.id} className={s.actorCard}>
            <div className={s.actorImageContainer}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                  alt={actor.original_name}
                  className={s.actorImage}
                  loading='lazy'
                />
              ) : (
                <div className={s.actorPlaceholder}>No Photo</div>
              )}
            </div>
            <div className={s.actorInfo}>
              <h3 className={s.actorName}>{actor.original_name}</h3>
              <p className={s.actorCharacter}>{actor.character}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
