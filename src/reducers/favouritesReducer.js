/**
 * favouritesReducer — manages the favourites list.
 *
 * Actions:
 *  - { type: 'TOGGLE_FAVOURITE', payload: photo }
 *      If the photo is already in favourites → remove it.
 *      If not → add it.
 *
 * We chose useReducer over useState because:
 *  1. The state transition logic (add / remove) lives in one clear, testable
 *     place rather than inline in every component.
 *  2. When state depends on the *previous* state (checking existing IDs),
 *     a reducer keeps that logic predictable.
 *  3. It mirrors the Redux pattern our codebase uses for shared state.
 */

export const initialState = {
  favourites: [],
};

/**
 * Load persisted favourites from localStorage on app start.
 * Returns the initial state shape, hydrated with any saved data.
 */
export function loadInitialState() {
  try {
    const saved = localStorage.getItem('photo-gallery-favourites');
    if (saved) {
      return { favourites: JSON.parse(saved) };
    }
  } catch {
    // If localStorage is unavailable or data is corrupt, start fresh.
  }
  return initialState;
}

export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const photo = action.payload;
      const alreadyFavourited = state.favourites.some((p) => p.id === photo.id);

      const newFavourites = alreadyFavourited
        ? state.favourites.filter((p) => p.id !== photo.id) // remove
        : [...state.favourites, photo]; // add

      return { ...state, favourites: newFavourites };
    }

    default:
      return state;
  }
}
