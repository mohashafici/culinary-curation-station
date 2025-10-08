# 🍽️ Meal Discovery App

A beautiful, responsive web application that helps you discover amazing recipes from around the world using TheMealDB API.

**Live Demo:** https://culinary-curation-station.lovable.app

## ✨ Features

- **Random Meal Discovery**: Get surprised with a random meal recipe at the click of a button
- **Smart Search**: Search for meals by name, ingredient, or cuisine type
- **Favorites System**: Bookmark your favorite recipes for quick access (stored locally)
- **Detailed Recipe View**: View complete meal information including:
  - High-quality meal images
  - Step-by-step cooking instructions
  - Complete ingredient list with measurements
  - Cuisine area and category
  - YouTube cooking videos (when available)
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## 🛠️ Technologies Used

- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **React Router** - Client-side routing
- **TheMealDB API** - Free meal database API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <project-name>
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Radix UI)
│   ├── MealCard.tsx     # Recipe card display
│   ├── SearchBar.tsx    # Search input component
│   ├── FavoritesList.tsx # Favorites display
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── hooks/
│   ├── useMealAPI.ts    # TheMealDB API integration
│   ├── useFavorites.ts  # LocalStorage favorites management
│   └── useDarkMode.ts   # Theme toggle logic
├── pages/
│   ├── Index.tsx        # Main app page
│   └── NotFound.tsx     # 404 page
├── lib/
│   └── utils.ts         # Utility functions
└── main.tsx             # App entry point
```

## 🔌 API Reference

This app uses [TheMealDB API](https://www.themealdb.com/api.php):

- **Random Meal**: `GET https://www.themealdb.com/api/json/v1/1/random.php`
- **Search by Name**: `GET https://www.themealdb.com/api/json/v1/1/search.php?s={query}`
- **Lookup by ID**: `GET https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}`

## 💾 Local Storage

The app uses browser localStorage to persist:
- Favorite meals list
- Dark/Light mode preference

## 🎨 Customization

### Theming

The app uses a semantic color system defined in `src/index.css`. You can customize the color scheme by modifying CSS variables for both light and dark modes.

### Components

All UI components are built with Radix UI and styled with Tailwind CSS, making them easy to customize and extend.

## 📦 Build for Production

```bash
npm run build
# or
bun run build
```

The production-ready files will be in the `dist/` directory.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for the amazing free recipe API
- [Lovable](https://lovable.dev/) for the development platform
- All the open-source libraries that made this project possible

---

Built with ❤️ using Lovable
