import { useState, useReducer, useCallback, useMemo, useEffect } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import { favouritesReducer, loadInitialState } from '../reducers/favouritesReducer';
import PhotoCard from './PhotoCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

/**
 * Gallery — the main page component.
 *
 * Responsibilities:
 *  1. Use useFetchPhotos hook to get photos/loading/error
 *  2. Manage search query state
 *  3. Manage favourites via useReducer + localStorage persistence
 *  4. Filter photos with useMemo
 *  5. Handle search input change with useCallback
 */
function Gallery() {
  // ── Data fetching ─────────────────────────────────────────────────────────
  const { photos, loading, error } = useFetchPhotos();

  // ── Search state ──────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');

  // ── Favourites state — useReducer ─────────────────────────────────────────
  // We initialise the reducer lazily with loadInitialState so that the
  // persisted localStorage value is read only once, on mount.
  const [favouritesState, dispatch] = useReducer(
    favouritesReducer,
    undefined,      // initial arg is ignored when using the init function
    loadInitialState
  );

  // Persist favourites to localStorage whenever the list changes.
  useEffect(() => {
    try {
      localStorage.setItem(
        'photo-gallery-favourites',
        JSON.stringify(favouritesState.favourites)
      );
    } catch {
      // If localStorage write fails (e.g. private mode quota), silently ignore.
    }
  }, [favouritesState.favourites]);

  // ── useCallback — search handler ──────────────────────────────────────────
  // Why useCallback?
  //   SearchBar receives this function as a prop. Without useCallback, a new
  //   function reference is created on every render, which would cause
  //   React.memo(SearchBar) to always re-render even when nothing changed.
  //   useCallback memoises the function so its reference only changes when
  //   its dependencies change (none here → stable reference for the app's life).
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // ── useCallback — favourite toggle ────────────────────────────────────────
  // Same reasoning: PhotoCard is wrapped in React.memo and receives this as a
  // prop. A stable reference prevents unnecessary card re-renders.
  const handleToggleFavourite = useCallback((photo) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photo });
  }, []);

  // ── useMemo — filtered photo list ─────────────────────────────────────────
  // Why useMemo?
  //   Without useMemo, the filter() runs on every render — including renders
  //   triggered by unrelated state changes (e.g. a different card's favourite
  //   toggling). useMemo ensures the filtered list is only recomputed when
  //   `photos` or `searchQuery` actually change.
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return photos;
    const q = searchQuery.toLowerCase().trim();
    return photos.filter((p) => p.author.toLowerCase().includes(q));
  }, [photos, searchQuery]);

  // ── Derived set of favourited IDs for O(1) lookup ─────────────────────────
  const favouritedIds = useMemo(
    () => new Set(favouritesState.favourites.map((p) => p.id)),
    [favouritesState.favourites]
  );

  const favCount = favouritesState.favourites.length;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0a0a12]">

      {/* ══════════ HEADER ══════════ */}
      <header className="w-full bg-[#10101c] border-b border-[#1c1c30]">

        {/* Row 1: Brand + Favourites count */}
        <div className="w-full px-4 sm:px-8 lg:px-12 pt-5 pb-4">
          <div className="flex items-center justify-between">
            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">Celebrare Gallery</h1>
                <p className="text-[11px] text-gray-500">Powered by Picsum Photos</p>
              </div>
            </div>

            {/* Favourites badge */}
            {favCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-400 text-xs font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-pink-400" stroke="currentColor" strokeWidth={1}>
                  <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                {favCount} favourited
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Search bar */}
        <div className="w-full px-4 sm:px-8 lg:px-12 pb-4">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
        </div>
      </header>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 py-6">

        {/* Loading */}
        {loading && <LoadingSpinner />}

        {/* Error */}
        {!loading && error && <ErrorMessage message={error} />}

        {/* Empty search results */}
        {!loading && !error && filteredPhotos.length === 0 && searchQuery && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <p className="text-white font-semibold text-lg">No results for &ldquo;{searchQuery}&rdquo;</p>
            <p className="text-gray-500 text-sm">Try a different author name</p>
          </div>
        )}

        {/* Photo Grid */}
        {!loading && !error && filteredPhotos.length > 0 && (
          <>
            <p className="text-gray-500 text-sm mb-5">
              Showing <span className="text-white font-semibold">{filteredPhotos.length}</span>{' '}
              {filteredPhotos.length === 1 ? 'photo' : 'photos'}
              {searchQuery && (
                <span> for <span className="text-violet-400 font-semibold">&ldquo;{searchQuery}&rdquo;</span></span>
              )}
            </p>

            {/* Responsive grid: 1 col mobile · 2 col tablet · 4 col desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavourited={favouritedIds.has(photo.id)}
                  onToggleFavourite={handleToggleFavourite}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="w-full border-t border-[#1c1c30] py-5 text-center text-gray-600 text-xs">
        Photos from{' '}
        <a href="https://picsum.photos" target="_blank" rel="noreferrer" className="text-violet-400 hover:text-violet-300 transition-colors">
          Picsum Photos
        </a>
        {' '}· Built with React + Vite + Tailwind CSS
      </footer>
    </div>
  );
}

export default Gallery;
