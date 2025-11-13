import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tmdbApi } from '@/features/api/tmdbApi.ts';

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tmdbApi.middleware),
});

setupListeners(store.dispatch);
