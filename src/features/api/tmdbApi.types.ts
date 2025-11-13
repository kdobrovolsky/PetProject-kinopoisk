// Базовые типы для фильма
export type TMDBMovie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

// Ответ для списка фильмов
export type TMDBMoviesResponse = {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
};

// Параметры запроса для популярных фильмов
export type PopularMoviesParams = {
  language?: string;
  page?: number;
  region?: string;
};

// Параметры запроса для поиска
export type SearchMoviesParams = {
  query: string;
  language?: string;
  page?: number;
};

// Параметры для других категорий
export type MoviesParams = {
  language?: string;
  page?: number;
};

// Типы для ошибок
export type TMDBError = {
  status_code: number;
  status_message: string;
  success: boolean;
};

// Состояния загрузки
export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

// Для избранных фильмов (localStorage)
export type FavoriteMovie = {
  id: number;
  title: string;
  posterUrl: string | null;
  voteAverage: number;
};
