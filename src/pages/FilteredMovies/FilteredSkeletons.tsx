import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import s from './FilteredMovies.module.css';

export const FilteredSkeleton = () => {
  return (
    <SkeletonTheme baseColor='#f0f0f0' highlightColor='#e0e0e0'>
      <div className={s.container}>
        {/* Скелетон панели фильтров */}
        <div className={s.filtersSkeleton}>
          {/* Заголовок фильтров */}
          <Skeleton height={24} width={120} style={{ marginBottom: '20px' }} />

          {/* Секции фильтров */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={s.filterSectionSkeleton}>
              <Skeleton height={18} width={80} style={{ marginBottom: '12px' }} />
              {Array.from({ length: 3 }).map((_, subIndex) => (
                <div key={subIndex} className={s.filterOptionSkeleton}>
                  <Skeleton height={16} width={16} circle />
                  <Skeleton height={16} width={100} style={{ marginLeft: '8px' }} />
                </div>
              ))}
            </div>
          ))}

          {/* Кнопка сброса */}
          <Skeleton height={40} className={s.resetButtonSkeleton} />
        </div>

        {/* Скелетон основной content */}
        <div className={s.resultsSkeleton}>
          {/* Заголовок результатов */}
          <Skeleton height={32} width={200} style={{ marginBottom: '24px' }} />

          {/* Сетка фильмов */}
          <div className={s.moviesGridSkeleton}>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className={s.movieCardSkeleton}>
                <Skeleton className={s.posterSkeleton} />
                <Skeleton className={s.movieTitleSkeleton} />
                <Skeleton className={s.movieSubtitleSkeleton} />
              </div>
            ))}
          </div>

          {/* Пагинация */}
          <div className={s.paginationSkeleton}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className={s.paginationButtonSkeleton} />
            ))}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};
