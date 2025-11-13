
import {useEffect, useState} from "react";

export const useTheme = () => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return true;
        }

        return false;
    });

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    useEffect(() => {
        const theme = isDark ? 'dark' : 'light';

        localStorage.setItem('theme', theme);

        document.documentElement.setAttribute('data-theme', theme);

        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', isDark ? '#0d253f' : '#032541');
        }
    }, [isDark]);

    return { isDark, toggleTheme };
}