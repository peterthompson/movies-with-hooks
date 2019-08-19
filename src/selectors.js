import { createSelector } from "reselect";

export const filterSelector = createSelector(
  state => state.movies,
  movies => {
    const genres = new Set();
    const years = new Set();

    movies.forEach(movie => {
      genres.add(movie.genre);
      years.add(movie.year);
    });

    return {
      years: Array.from(years),
      genres: Array.from(genres)
    };
  }
);
