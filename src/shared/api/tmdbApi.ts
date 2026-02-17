import type {
  DiscoverMoviesParams,
  GenresResponse,
  MovieCreditsResponse,
  MovieDetailsResponse,
  SearchMoviesParams,
  SimilarMoviesResponse,
  TMDBMoviesResponse,
} from '@/shared/api/tmdbApi.types.ts';
import { baseApi } from '@/shared/api/baseApi/baseApi.ts';
import {
  discoverMoviesParamsSchema,
  genresResponseSchema,
  movieCreditsResponseSchema,
  movieDetailsResponseSchema,
  parseWithSchema,
  parseWithSchemaOrFallback,
  searchMoviesParamsSchema,
  similarMoviesResponseSchema,
  tmdbMoviesResponseSchema,
  tmdbMovieIdSchema,
  tmdbPageParamSchema,
} from '@/shared/validation/tmdbSchemas.ts';

const fallbackMoviesResponse: TMDBMoviesResponse = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 0,
};

const fallbackCreditsResponse: MovieCreditsResponse = {
  id: 0,
  cast: [],
  crew: [],
};

const fallbackSimilarResponse: SimilarMoviesResponse = {
  ...fallbackMoviesResponse,
};

const fallbackMovieDetailsResponse: MovieDetailsResponse = {
  adult: false,
  backdrop_path: null,
  belongs_to_collection: null,
  budget: 0,
  genres: [],
  homepage: '',
  id: 0,
  imdb_id: '',
  original_language: '',
  original_title: '',
  overview: '',
  popularity: 0,
  poster_path: null,
  production_companies: [],
  production_countries: [],
  release_date: '',
  revenue: 0,
  runtime: 0,
  spoken_languages: [],
  status: '',
  tagline: '',
  title: '',
  video: false,
  vote_average: 0,
  vote_count: 0,
};

const fallbackGenresResponse: GenresResponse = {
  genres: [],
};

export const tmdbApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchPopularMovies: build.query<TMDBMoviesResponse, number | void>({
      query: (page = 1) => {
        const normalizedPage = parseWithSchema(tmdbPageParamSchema, page, 'popular movies page');
        return {
          url: `movie/popular?page=${normalizedPage}`,
        };
      },
      transformResponse: response =>
        parseWithSchemaOrFallback(
          tmdbMoviesResponseSchema,
          response,
          'popular movies',
          fallbackMoviesResponse,
        ),
      providesTags: ['Movies'],
    }),
    fetchTopRated: build.query<TMDBMoviesResponse, number | void>({
      query: (page = 1) => {
        const normalizedPage = parseWithSchema(tmdbPageParamSchema, page, 'top rated movies page');
        return `movie/top_rated?page=${normalizedPage}`;
      },
      transformResponse: response =>
        parseWithSchemaOrFallback(
          tmdbMoviesResponseSchema,
          response,
          'top rated movies',
          fallbackMoviesResponse,
        ),
      providesTags: ['Movies'],
    }),
    fetchUpcoming: build.query<TMDBMoviesResponse, number | void>({
      query: (page = 1) => {
        const normalizedPage = parseWithSchema(tmdbPageParamSchema, page, 'upcoming movies page');
        return `movie/upcoming?page=${normalizedPage}`;
      },
      transformResponse: response =>
        parseWithSchemaOrFallback(
          tmdbMoviesResponseSchema,
          response,
          'upcoming movies',
          fallbackMoviesResponse,
        ),
      providesTags: ['Movies'],
    }),
    fetchNowPlaying: build.query<TMDBMoviesResponse, number | void>({
      query: (page = 1) => {
        const normalizedPage = parseWithSchema(tmdbPageParamSchema, page, 'now playing movies page');
        return `movie/now_playing?page=${normalizedPage}`;
      },
      transformResponse: response =>
        parseWithSchemaOrFallback(
          tmdbMoviesResponseSchema,
          response,
          'now playing movies',
          fallbackMoviesResponse,
        ),
      providesTags: ['Movies'],
    }),
    fetchSearchMovies: build.query<TMDBMoviesResponse, SearchMoviesParams>({
      query: params => {
        const normalizedParams = parseWithSchema(
          searchMoviesParamsSchema,
          params,
          'search movies params',
        );
        return {
          url: 'search/movie',
          params: normalizedParams,
        };
      },
      transformResponse: response =>
        parseWithSchemaOrFallback(
          tmdbMoviesResponseSchema,
          response,
          'search movies',
          fallbackMoviesResponse,
        ),
      providesTags: (_result, _error, arg) => [
        'Movies',
        { type: 'Movies', id: `search-${arg.query}` },
      ],
    }),
    fetchCredits: build.query<MovieCreditsResponse, number>({
      query: movie_id => {
        const normalizedMovieId = parseWithSchema(tmdbMovieIdSchema, movie_id, 'movie id for credits');
        return `movie/${normalizedMovieId}/credits`;
      },
      transformResponse: response =>
        parseWithSchemaOrFallback(
          movieCreditsResponseSchema,
          response,
          'movie credits',
          fallbackCreditsResponse,
        ),
      providesTags: (_result, _error, movieId) => [{ type: 'Credits', id: movieId }],
    }),
    fetchSimilar: build.query<SimilarMoviesResponse, number>({
      query: movie_id => {
        const normalizedMovieId = parseWithSchema(tmdbMovieIdSchema, movie_id, 'movie id for similar');
        return `movie/${normalizedMovieId}/similar`;
      },
      transformResponse: response =>
        parseWithSchemaOrFallback(
          similarMoviesResponseSchema,
          response,
          'similar movies',
          fallbackSimilarResponse,
        ),
      providesTags: (_result, _error, movieId) => [{ type: 'Similar', id: movieId }],
    }),
    fetchMovieDetails: build.query<MovieDetailsResponse, number>({
      query: movie_id => {
        const normalizedMovieId = parseWithSchema(tmdbMovieIdSchema, movie_id, 'movie id for details');
        return `movie/${normalizedMovieId}`;
      },
      transformResponse: response =>
        parseWithSchemaOrFallback(
          movieDetailsResponseSchema,
          response,
          'movie details',
          fallbackMovieDetailsResponse,
        ),
      providesTags: (_result, _error, movieId) => [{ type: 'MovieDetails', id: movieId }],
    }),
    fetchMovieList: build.query<GenresResponse, void>({
      query: () => `genre/movie/list`,
      transformResponse: response =>
        parseWithSchemaOrFallback(
          genresResponseSchema,
          response,
          'movie genres list',
          fallbackGenresResponse,
        ),
      providesTags: ['Genres'],
    }),
    fetchDiscoverMovies: build.query<TMDBMoviesResponse, DiscoverMoviesParams>({
      query: params => {
        const normalizedParams = parseWithSchema(
          discoverMoviesParamsSchema,
          params,
          'discover movies params',
        );
        return {
          url: `discover/movie`,
          params: normalizedParams,
        };
      },
      transformResponse: response =>
        parseWithSchemaOrFallback(
          tmdbMoviesResponseSchema,
          response,
          'discover movies',
          fallbackMoviesResponse,
        ),
      providesTags: (_result, _error, arg) => [
        'Movies',
        { type: 'Movies', id: `discover-${JSON.stringify(arg)}` },
      ],
    }),
  }),
});

export const {
  useFetchPopularMoviesQuery,
  useFetchNowPlayingQuery,
  useFetchTopRatedQuery,
  useFetchUpcomingQuery,
  useLazyFetchSearchMoviesQuery,
  useFetchCreditsQuery,
  useFetchSimilarQuery,
  useFetchMovieDetailsQuery,
  useFetchDiscoverMoviesQuery,
  useFetchMovieListQuery,
} = tmdbApi;

