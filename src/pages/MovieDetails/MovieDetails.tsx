import { useParams } from 'react-router-dom';
import s from './MovieDetails.module.css';
import { MovieHero, MovieDetailsActor, MovieDetailsSimilar } from '@/pages/MovieDetails';

export const MovieDetails = () => {
  const { id } = useParams();
  const movieId = parseInt(id!); //id! - я уверен, что id не будет undefined/null

  return (
    <article className={s.container}>
      <MovieHero movieId={movieId} />
      <MovieDetailsActor movieId={movieId} />
      <MovieDetailsSimilar movieId={movieId} />
    </article>
  );
};

