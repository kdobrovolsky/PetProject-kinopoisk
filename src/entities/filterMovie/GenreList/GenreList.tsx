import s from './GenreList.module.css';

type Props = {
  genres: Array<{ id: number; name: string }>;
  selectedGenres: string;
  onGenreToggle: (genreId: string) => void;
};

export const GenreList = ({ genres, selectedGenres, onGenreToggle }: Props) => {
  return (
    <div className={s.filterGroup}>
      <div className={s.filterTitle}>Genres</div>
      <div className={s.genresGrid}>
        {genres.map(genre => (
          <button
            key={genre.id}
            className={`${s.genreButton} ${
              selectedGenres.includes(genre.id.toString()) ? s.genreButtonActive : ''
            }`}
            onClick={() => onGenreToggle(genre.id.toString())}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};
