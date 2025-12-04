🎬 Kinopoisk TMDB

A movie discovery web app built with React + TypeScript + RTK Query using FSD architecture and deployed on Vercel.

<p align="left"> <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Redux Toolkit-RTK Query-764ABC?style=for-the-badge&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white"/> </p>

🔗 Live Demo: https://pet-project-kinopoisk.vercel.app/

✨ Features

✔️ Movie categories (popular, trending, top-rated)
✔️ Movie search
✔️ Filters: genres, rating range, sorting
✔️ Responsive filter panel
✔️ Movie details: description, genres, trailers, similar movies
✔️ Skeleton loading
✔️ Dark / light theme
✔️ Full responsiveness

🧩 Tech Stack

React 19 + TypeScript

Redux Toolkit (Slices & RTK Query)

React Router v7

CSS Modules

Feature-Sliced Design (FSD)

Prettier

Vercel

📁 Project Architecture (FSD)
src/
 ├── app/         # App initialization
 ├── pages/       # Application pages
 ├── widgets/     # Large UI blocks (Header, FilterPanel, etc.)
 ├── features/    # Functional features (filters, search, sorting)
 ├── entities/    # Core domain entities (Movie, Genre, Person)
 └── shared/      # UI components, helpers, utils

🚀 Installation & Setup
git clone https://github.com/USERNAME/REPO.git
cd REPO
pnpm install
pnpm run dev
