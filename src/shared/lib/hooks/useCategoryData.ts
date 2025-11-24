import {
  useFetchNowPlayingQuery,
  useFetchPopularMoviesQuery,
  useFetchTopRatedQuery,
  useFetchUpcomingQuery,
} from '@/features';

type Props = {
  page: number;
  type: string;
};

export const useCategoryData = ({ page, type }: Props) => {
  const popularQuery = useFetchPopularMoviesQuery(page, { skip: type !== 'popular' });
  const topRatedQuery = useFetchTopRatedQuery(page, { skip: type !== 'top-rated' });
  const upcomingQuery = useFetchUpcomingQuery(page, { skip: type !== 'upcoming' });
  const nowPlayingQuery = useFetchNowPlayingQuery(page, { skip: type !== 'now-playing' });

  switch (type) {
    case 'popular':
      return popularQuery.data;
    case 'top-rated':
      return topRatedQuery.data;
    case 'upcoming':
      return upcomingQuery.data;
    case 'now-playing':
      return nowPlayingQuery.data;
    default:
      return popularQuery.data;
  }
};
