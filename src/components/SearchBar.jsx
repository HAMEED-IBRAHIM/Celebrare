/**
 * SearchBar — controlled search input.
 *
 * Props:
 *  - value: string — current search text
 *  - onChange: function — useCallback-wrapped handler from Gallery
 */
function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center w-full h-11 rounded-lg bg-[#0a0a12] border border-[#2a2a40] focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/40 transition-colors">
      {/* Search icon — fixed width, not overlapping */}
      <div className="flex items-center justify-center w-12 flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>

      {/* Input — takes remaining space */}
      <input
        id="search-input"
        type="text"
        placeholder="Search by author name…"
        value={value}
        onChange={onChange}
        autoComplete="off"
        spellCheck="false"
        className="flex-1 h-full bg-transparent text-white text-sm placeholder-gray-500 outline-none border-none pr-3"
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange({ target: { value: '' } })}
          aria-label="Clear search"
          className="flex items-center justify-center w-10 flex-shrink-0 text-gray-500 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
