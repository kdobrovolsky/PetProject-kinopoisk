# 🎬 Kinopoisk TMDB — Movie Explorer

A modern movie discovery app built with **React**, **TypeScript**, **RTK Query**, and **Feature-Sliced Design**, styled with **CSS Modules** and deployed to **Vercel**.

👉 **Live Demo:**  
https://pet-project-kinopoisk.vercel.app/

---

## 🌟 Features

- 🔎 Browse movie categories (Popular, Trending, Top Rated)  
- 🎯 Advanced filters: genres, rating range, sorting  
- 📱 Fully responsive and adaptive UI  
- 🧩 Mobile-friendly filter panel  
- 🎥 Detailed movie pages (info, cast, trailers, similar)  
- 💡 Light / Dark mode  
- ⚡ Skeleton loading states  
- 🎞 Pagination and error handling  
- 📦 Clean FSD architecture  

---

## 🛠 Tech Stack

### **Core Technologies**
<p align="left">
  <img src="https://img.shields.io/badge/React-18.0+-61DAFB?logo=react&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-RTK_Query-764ABC?logo=redux&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/React_Router-7+-CA4245?logo=react-router&logoColor=white&style=for-the-badge" />
</p>

### **Styling**
<p align="left">
  <img src="https://img.shields.io/badge/CSS%20Modules-000000?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/Responsive_Design-34D399?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Skeleton_Loading-999999?style=for-the-badge" />
</p>

### **Architecture**
<p align="left">
  <img src="https://img.shields.io/badge/FSD-Feature--Sliced--Design-8B5CF6?style=for-the-badge" />
</p>

### **Tooling**
<p align="left">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Prettier-code_style-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" />
  <img src="https://img.shields.io/badge/ESLint-linter-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

### **Other libraries**
<p align="left">
  <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Toastify-FF9800?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
</p>

---

## 🧱 Project Architecture (FSD) src/ ├── app/ # App initialization, providers ├── pages/ # Route-level pages ├── widgets/ # Layout-level UI blocks (Header, FilterPanel) ├── features/ # User interactions (filters, search, sorting) ├── entities/ # Domain entities (Movie, Genre) └── shared/ # UI components, helpers, config, styles ---

## 🚀 Getting Started

```bash
git clone https://github.com/USERNAME/REPO.git
cd REPO
pnpm install
pnpm run dev
