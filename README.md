# Photo Gallery — React + Vite + Tailwind CSS

A responsive photo gallery web app that fetches images from the Picsum Photos API, lets you search by author name, and mark photos as favourites (persisted in localStorage).

**Live Demo:** [https://fast-nickel-pp0l2h6.tmp.now](https://fast-nickel-pp0l2h6.tmp.now)  
**GitHub Repository:** [https://github.com/HAMEED-IBRAHIM/Celebrare](https://github.com/HAMEED-IBRAHIM/Celebrare)

## Tech Stack

- **React 19** — functional components + hooks
- **Vite** — dev server and build tool
- **Tailwind CSS v4** — utility-first styling (no other UI libraries)

## Features

1. **Fetch 30 photos** from Picsum Photos API on load with loading spinner and error handling.
2. **Responsive grid** — 4 columns on desktop, 2 on tablet, 1 on mobile.
3. **Real-time search filter** — filter photos by author name as you type (no API calls, client-side only).
4. **Favourites** — toggle a heart icon to favourite/unfavourite photos. Managed with `useReducer` and persisted in `localStorage`.
5. **Custom hook** — `useFetchPhotos` encapsulates all fetch logic and returns `{ photos, loading, error }`.
6. **Performance hooks** — `useCallback` for the search handler, `useMemo` for the filtered photo list.

## Project Structure

```
src/
├── hooks/
│   └── useFetchPhotos.js       # Custom hook: fetches photos from API
├── reducers/
│   └── favouritesReducer.js    # useReducer: TOGGLE_FAVOURITE action + localStorage init
├── components/
│   ├── Gallery.jsx             # Main page component
│   ├── PhotoCard.jsx           # Individual photo card with heart button
│   ├── SearchBar.jsx           # Controlled search input
│   ├── LoadingSpinner.jsx      # Loading state UI
│   ├── ErrorMessage.jsx        # Error state UI
│   └── FavouritesBar.jsx       # Favourites count badge
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```
