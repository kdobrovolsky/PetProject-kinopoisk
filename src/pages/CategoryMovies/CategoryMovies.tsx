import s from './CategoryMovies.module.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Pagination } from '@/common';
import { MOVIE_CATEGORIES } from '@/features';
import { categoriesTitle } from '@/features/api/tmdbApi.types.ts';
import { MovieCard } from '@/entities/movie/ui';
import { useCategoryData } from '@/features/movies/hooks/useCategoryData.ts';

export const CategoryMovies = () => {
  const navigate = useNavigate();
  const { type = 'popular' } = useParams();
  const [page, setPage] = useState(1);

  const data = useCategoryData({ type, page });

  useEffect(() => {
    setPage(1);
  }, [type]);

  return (
    <div className={s.container}>
      <nav className={s.navigation}>
        {MOVIE_CATEGORIES.map(category => (
          <button
            key={category.key}
            onClick={() => navigate(`/category/${category.key}`)}
            className={`${s.navButton} ${type === category.key ? s.active : ''}`}
          >
            {category.label}
          </button>
        ))}
      </nav>

      <h1 className={s.categoryTitle}>{categoriesTitle[type]}</h1>
      <MovieCard data={data} />
      <Pagination currentPage={page} setCurrentPage={setPage} pagesCount={data?.total_pages || 1} />
    </div>
  );
};
