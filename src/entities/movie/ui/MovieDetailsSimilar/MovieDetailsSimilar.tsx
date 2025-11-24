import s from './MovieDetailsSimilar.module.css';
import { useFetchSimilarQuery } from '@/shared/api/tmdbApi.ts';
type Props = {
  movieId: number;
};
export const MovieDetailsSimilar = ({ movieId }: Props) => {
  const { data: dataSimilar } = useFetchSimilarQuery(movieId);
  return (
    <section className={s.similarSection}>
      <h2 className={s.sectionTitle}>Similar Movies</h2>
      <div className={s.similarGrid}>
        {dataSimilar?.results.slice(0, 6).map(similar => (
          <article key={similar.id} className={s.similarCard}>
            <div className={s.similarImageContainer}>
              {similar.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${similar.poster_path}`}
                  alt={similar.title}
                  className={s.similarImage}
                  loading='lazy'
                />
              ) : (
                <div className={s.similarPlaceholder}>No Poster</div>
              )}
            </div>
            <div className={s.similarInfo}>
              <h3 className={s.similarTitle}>{similar.title}</h3>
              <p className={s.similarYear}>{new Date(similar.release_date).getFullYear()}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
