import React, { useMemo, useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { filterSelector } from "../selectors";

const noop = () => {};

const SelectMovie = ({ onChange = noop, id = "" }) => {
  const [values, setValues] = useState({ genre: "", id: "", year: "" });
  const { years, genres } = useSelector(filterSelector);
  const movies = useSelector(state => state.movies);
  const isFetching = useSelector(state => state.isFetching);
  const selectedMovies = useMemo(
    () =>
      movies.filter(
        ({ year, genre }) => genre === values.genre && year === values.year
      ),
    [movies, values]
  );
  const hasSelectedMovies = selectedMovies.length !== 0;

  useEffect(() => {
    const movie = movies.find(movie => movie.id === id);
    if (movie) {
      const { id = "", genre = "", year = "" } = movie;
      setValues({ id, genre, year });
    }
  }, [id, movies]);

  const handleChange = event => {
    const { name, value } = event.target;
    const newId = name === "id" ? value : "";

    if (newId !== values.id) {
      onChange(newId);
    }

    setValues(prevValues => ({ ...prevValues, id: newId, [name]: value }));
  };

  return (
    <Fragment>
      <h2>Select Movie</h2>
      <form className="pure-form pure-form-aligned">
        <fieldset>
          <div className="pure-control-group">
            <label htmlFor="year">Year</label>
            <select
              id="year"
              name="year"
              value={values.year}
              onChange={handleChange}
              disabled={isFetching}
            >
              <option value="" disabled hidden>
                Please select
              </option>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="pure-control-group">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              name="genre"
              value={values.genre}
              onChange={handleChange}
              disabled={isFetching}
            >
              <option value="" disabled hidden>
                Please select
              </option>
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div className="pure-control-group">
            <label htmlFor="id">Movie</label>
            <select
              id="id"
              name="id"
              value={values.id}
              onChange={handleChange}
              disabled={!hasSelectedMovies || isFetching}
            >
              <option value="" disabled hidden>
                Please select
              </option>
              {selectedMovies.map(movie => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
            {values.genre && values.year && !hasSelectedMovies && (
              <span className="pure-form-message-inline">No Movies Found</span>
            )}
          </div>
        </fieldset>
      </form>
    </Fragment>
  );
};

SelectMovie.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string
};

export default SelectMovie;
