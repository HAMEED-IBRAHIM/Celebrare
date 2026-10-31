/**
 * ErrorMessage — displayed when the API fetch fails.
 * Props:
 *  - message: string — the error details
 */
function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-40 gap-4 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
      <h2 className="text-white font-semibold text-lg">Failed to Load Photos</h2>
      <p className="text-gray-400 text-sm max-w-xs">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-violet-400"
      >
        Retry
      </button>
    </div>
  );
}

export default ErrorMessage;
