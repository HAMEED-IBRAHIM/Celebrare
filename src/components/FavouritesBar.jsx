/**
 * FavouritesBar — a sticky top strip that shows the count of favourited photos.
 *
 * Props:
 *  - count: number — how many photos are currently favourited
 */
function FavouritesBar({ count }) {
  if (count === 0) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-pink-600/10 border border-pink-500/30 text-pink-300 text-sm font-medium">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-4 h-4 fill-pink-400"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
      <span>
        {count} {count === 1 ? 'photo' : 'photos'} favourited
      </span>
    </div>
  );
}

export default FavouritesBar;
