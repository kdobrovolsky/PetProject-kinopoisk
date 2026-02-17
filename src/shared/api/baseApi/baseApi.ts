import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { isErrorWithProperty } from '@/shared';
import { z } from 'zod';

const envSchema = z.object({
  VITE_BASE_URL: z.string().url(),
  VITE_ACCESS_TOKEN: z.string().trim().min(1),
});

const parsedEnv = envSchema.safeParse(import.meta.env);
const envConfig = parsedEnv.success ? parsedEnv.data : null;

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Movies', 'MovieDetails', 'Credits', 'Similar', 'Genres'],
  keepUnusedDataFor: 300000,
  baseQuery: async (args, api, extraOptions) => {
    if (!envConfig) {
      const message = 'Invalid environment variables: VITE_BASE_URL and VITE_ACCESS_TOKEN are required';
      toast(message, { type: 'error', theme: 'colored' });
      return {
        error: {
          status: 'CUSTOM_ERROR',
          error: message,
        },
      };
    }

    const result = await fetchBaseQuery({
      baseUrl: envConfig.VITE_BASE_URL,
      prepareHeaders: headers => {
        headers.set('Authorization', `Bearer ${envConfig.VITE_ACCESS_TOKEN}`);
        return headers;
      },
    })(args, api, extraOptions);

    if (result.error) {
      switch (result.error.status) {
        case 'FETCH_ERROR':
        case 'PARSING_ERROR':
        case 'CUSTOM_ERROR':
        case 'TIMEOUT_ERROR':
          toast(result.error.error, { type: 'error', theme: 'colored' });
          break;

        case 404:
          if (isErrorWithProperty(result.error.data, 'error')) {
            toast(result.error.data.error, { type: 'error', theme: 'colored' });
          } else {
            toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' });
          }
          break;

        case 429:
          if (isErrorWithProperty(result.error.data, 'message')) {
            toast(result.error.data.message, { type: 'error', theme: 'colored' });
          } else {
            toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' });
          }
          break;

        case 401:
          if (isErrorWithProperty(result.error.data, 'status_message')) {
            toast(`Authorization failed: ${result.error.data.status_message}`, {
              type: 'error',
              theme: 'colored',
            });
          } else {
            toast('Invalid authorization token', { type: 'error', theme: 'colored' });
          }
          break;

        default:
          toast('Some error occurred', { type: 'error', theme: 'colored' });
      }
    }

    return result;
  },
  endpoints: () => ({}),
});

