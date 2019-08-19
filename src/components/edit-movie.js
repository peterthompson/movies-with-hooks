import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { updateMovie } from "../redux";

const EditMovie = ({ id = "" }) => {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.isFetching);
  const movies = useSelector(state => state.movies);
  const [values, setValues] = useState({ genre: "", title: "", year: "" });
  const [errors, setErrors] = useState({ genre: "", title: "", year: "" });

  useEffect(() => {
    const { title = "", genre = "", year = "" } =
      movies.find(movie => movie.id === id) || {};
    setValues({ genre, title, year });
    setErrors({ genre: "", title: "", year: "" });
  }, [id, movies, setValues]);

  const validate = ([name, value]) => {
    if (value === "") {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: `${name} is required`
      }));
      return false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
      return true;
    }
  };

  const handleSubmit = event => {
    const hasErrors = Object.entries(values)
      .map(validate)
      .includes(false);

    if (!hasErrors) {
      dispatch(updateMovie({ id, ...values }));
    }
    event.preventDefault();
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const handleBlur = event => {
    const { name, value } = event.target;
    validate([name, value]);
  };

  const isDisabled = id === "" || isFetching;

  return (
    <Fragment>
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit} className="pure-form pure-form-aligned">
        <fieldset>
          <div className="pure-control-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isDisabled}
            />
            {errors.title && (
              <span className="pure-form-message-inline">{errors.title}</span>
            )}
          </div>
          <div className="pure-control-group">
            <label htmlFor="genre">Genre</label>
            <input
              id="genre"
              name="genre"
              type="text"
              value={values.genre}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isDisabled}
            />
            {errors.genre && (
              <span className="pure-form-message-inline">{errors.genre}</span>
            )}
          </div>
          <div className="pure-control-group">
            <label htmlFor="year">Year</label>
            <input
              id="year"
              name="year"
              type="text"
              value={values.year}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isDisabled}
            />
            {errors.year && (
              <span className="pure-form-message-inline">{errors.year}</span>
            )}
          </div>
          <div className="pure-controls">
            <button type="submit" className="pure-button" disabled={isDisabled}>
              Update
            </button>
          </div>
        </fieldset>
      </form>
    </Fragment>
  );
};

EditMovie.propTypes = {
  id: PropTypes.string
};

export default EditMovie;
