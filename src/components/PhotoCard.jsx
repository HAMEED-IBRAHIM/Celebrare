import React from 'react';

/**
 * PhotoCard — displays a single photo with author name and favourite toggle.
 *
 * Props:
 *  - photo: object from Picsum API { id, author, download_url, width, height }
 *  - isFavourited: boolean
 *  - onToggleFavourite: function(photo) → dispatches TOGGLE_FAVOURITE
 */
function PhotoCard({ photo, isFavourited, onToggleFavourite }) {
  const imageUrl = `https://picsum.photos/id/${photo.id}/400/300`;

  return (
    <div className="rounded-lg overflow-hidden bg-[#12121e] border border-[#1c1c30] hover:border-[#2a2a44] transition-colors">
      {/* Photo */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-[#1a1a2a]">
        <img
          src={imageUrl}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Author + Heart */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <p className="text-sm text-gray-200 font-medium truncate pr-2">{photo.author}</p>

        <button
          onClick={() => onToggleFavourite(photo)}
          aria-label={isFavourited ? 'Remove from favourites' : 'Add to favourites'}
          className="flex-shrink-0 p-1 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-5 h-5 transition-colors ${
              isFavourited
                ? 'fill-pink-500 text-pink-500'
                : 'fill-none text-gray-500 hover:text-pink-400'
            }`}
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default React.memo(PhotoCard);
