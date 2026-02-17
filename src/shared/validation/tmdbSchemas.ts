import { z } from 'zod';

const pageSchema = z.number().int().min(1).max(500);
const movieIdSchema = z.number().int().positive();
const ratingStringSchema = z
  .string()
  .refine(value => {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) && numberValue >= 0 && numberValue <= 10;
  }, 'Rating must be between 0 and 10');
const genresStringSchema = z
  .string()
  .regex(/^$|^\d+(,\d+)*$/, 'Genres must be comma-separated numeric ids');

export const sortByValues = [
  'popularity.desc',
  'popularity.asc',
  'vote_average.desc',
  'vote_average.asc',
  'release_date.desc',
  'release_date.asc',
  'title.asc',
  'title.desc',
] as const;

export const searchQuerySchema = z.string().trim().min(1).max(100);
export const tmdbPageParamSchema = pageSchema.default(1);
export const tmdbMovieIdSchema = movieIdSchema;

export const searchMoviesParamsSchema = z.object({
  query: searchQuerySchema,
  language: z.string().trim().min(2).max(10).optional(),
  page: pageSchema.optional(),
});

export const discoverMoviesParamsSchema = z
  .object({
    sort_by: z.enum(sortByValues).optional(),
    with_genres: genresStringSchema.optional(),
    'vote_average.gte': ratingStringSchema.optional(),
    'vote_average.lte': ratingStringSchema.optional(),
    page: pageSchema.optional(),
  })
  .superRefine((value, ctx) => {
    if (value['vote_average.gte'] && value['vote_average.lte']) {
      const min = Number(value['vote_average.gte']);
      const max = Number(value['vote_average.lte']);

      if (min > max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Minimum rating cannot be higher than maximum rating',
          path: ['vote_average.gte'],
        });
      }
    }
  });

export const discoverFiltersSchema = z
  .object({
    sort_by: z.enum(sortByValues),
    with_genres: genresStringSchema,
    'vote_average.gte': ratingStringSchema,
    'vote_average.lte': ratingStringSchema,
    page: pageSchema,
  })
  .superRefine((value, ctx) => {
    const min = Number(value['vote_average.gte']);
    const max = Number(value['vote_average.lte']);

    if (min > max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Minimum rating cannot be higher than maximum rating',
        path: ['vote_average.gte'],
      });
    }
  });

export type DiscoverFilters = z.infer<typeof discoverFiltersSchema>;

const tmdbMovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number().int()),
  id: z.number().int(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number().int(),
});

export const tmdbMoviesResponseSchema = z.object({
  page: z.number().int(),
  results: z.array(tmdbMovieSchema),
  total_pages: z.number().int(),
  total_results: z.number().int(),
});

export const tmdbUpcomingResponseSchema = tmdbMoviesResponseSchema.extend({
  dates: z.object({
    maximum: z.string(),
    minimum: z.string(),
  }),
});

const movieCastSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number().int(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  cast_id: z.number().int(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number().int(),
});

const movieCrewSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number().int(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  credit_id: z.string(),
  department: z.string(),
  job: z.string(),
});

export const movieCreditsResponseSchema = z.object({
  id: z.number().int(),
  cast: z.array(movieCastSchema),
  crew: z.array(movieCrewSchema),
});

export const similarMoviesResponseSchema = z.object({
  page: z.number().int(),
  results: z.array(tmdbMovieSchema),
  total_pages: z.number().int(),
  total_results: z.number().int(),
});

export const movieDetailsResponseSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z.nullable(z.object({}).passthrough()),
  budget: z.number(),
  genres: z.array(
    z.object({
      id: z.number().int(),
      name: z.string(),
    }),
  ),
  homepage: z.string(),
  id: z.number().int(),
  imdb_id: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  production_companies: z.array(
    z.object({
      id: z.number().int(),
      logo_path: z.string().nullable(),
      name: z.string(),
      origin_country: z.string(),
    }),
  ),
  production_countries: z.array(
    z.object({
      iso_3166_1: z.string(),
      name: z.string(),
    }),
  ),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(
    z.object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    }),
  ),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number().int(),
});

export const genresResponseSchema = z.object({
  genres: z.array(
    z.object({
      id: z.number().int(),
      name: z.string(),
    }),
  ),
});

const zodErrorMessage = (error: z.ZodError) =>
  error.issues.map(issue => `${issue.path.join('.') || 'root'}: ${issue.message}`).join('; ');

export const parseWithSchema = <T>(schema: z.ZodSchema<T>, data: unknown, entity: string): T => {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    throw new Error(`Validation failed for ${entity}: ${zodErrorMessage(parsed.error)}`);
  }

  return parsed.data;
};

export const parseWithSchemaOrFallback = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  entity: string,
  fallback: T,
): T => {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    console.warn(`Validation failed for ${entity}: ${zodErrorMessage(parsed.error)}`);
    return fallback;
  }

  return parsed.data;
};

export const normalizeSearchQuery = (value: string) =>
  parseWithSchema(searchQuerySchema, value, 'search query');

export const normalizeDiscoverFilters = (value: unknown) =>
  parseWithSchema(discoverFiltersSchema, value, 'discover filters');
