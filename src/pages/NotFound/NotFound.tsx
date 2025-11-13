import { Link } from 'react-router-dom';
import { Path } from '@/common/Routing/Routing';
import s from './NotFound.module.css';

export const NotFound = () => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.errorCode}>404</div>
        <h1 className={s.title}>Page Not Found</h1>
        <p className={s.message}>The page you are looking for doesn't exist or has been moved.</p>
        <Link to={Path.Main} className={s.homeLink}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
};
