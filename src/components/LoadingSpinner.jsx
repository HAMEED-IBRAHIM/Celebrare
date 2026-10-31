/**
 * LoadingSpinner — shown while photos are being fetched.
 * Centered in the available space.
 */
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-40 gap-4">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-[#2a2a40] border-t-violet-500 rounded-full animate-spin" />
      <p className="text-white font-semibold">Loading Photos</p>
      <p className="text-gray-500 text-sm">Fetching images from Picsum…</p>
    </div>
  );
}

export default LoadingSpinner;
