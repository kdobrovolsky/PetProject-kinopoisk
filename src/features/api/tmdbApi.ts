import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {SearchMoviesParams, TMDBMoviesResponse, TMDBUpcomingResponse} from "@/features/api/tmdbApi.types.ts";

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {

      headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`);
      return headers;
    },
  }),
  endpoints: build => ({
    fetchPopularMovies: build.query<TMDBMoviesResponse, number | void >({
      query: (page=1) => {
        return{
          url:`movie/popular?page=${page}`,
        }
      },
    }),
    fetchTopRated: build.query<TMDBMoviesResponse, number | void>({
      query: (page=1) => `movie/top_rated?page=${page}`,
    }),
    fetchUpcoming: build.query<TMDBUpcomingResponse, number | void>({
      query: (page=1) => `movie/upcoming?page=${page}`,
    }),
    fetchNowPlaying: build.query<TMDBUpcomingResponse, number | void>({
      query: (page=1) => `movie/now_playing?page=${page}`,
    }),
    fetchSearchMovies: build.query<TMDBUpcomingResponse, SearchMoviesParams>({
      query: (params) => {
        return{
          url:'search/movie',
          params
        }
      }
    }),
  }),
});


export const {useFetchPopularMoviesQuery,useFetchNowPlayingQuery,useFetchTopRatedQuery,useFetchUpcomingQuery,useLazyFetchSearchMoviesQuery} = tmdbApi