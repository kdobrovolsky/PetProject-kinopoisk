import s from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={s.footer}>
            <div className={s.container}>
                <div className={s.content}>
                    <p className={s.copyright}>
                        © 2025 Kinopoisk Demo · Data courtesy of TMDB.
                    </p>
                    <div className={s.links}>
                        <a
                            href="https://github.com/kdobrovolsky"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={s.link}
                        >
                            GitHub
                        </a>
                        <a
                            href=""
                            target="_blank"
                            rel="noopener noreferrer"
                            className={s.link}
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://t.me/kdobrovolsky"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={s.link}
                        >
                            Telegram
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
