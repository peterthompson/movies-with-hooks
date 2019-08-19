import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";

const Movies = () => {
  const movies = useSelector(state => state.movies);

  const [isHidden, toggle] = useState(false);

  return (
    <Fragment>
      <h2
        role="button"
        onClick={() => toggle(!isHidden)}
        style={{ cursor: "pointer" }}
      >
        <span style={{ fontFamily: "courier" }}>{isHidden ? "+" : "-"}</span>{" "}
        Movies
      </h2>
      {isHidden ? null : (
        <table className="pure-table pure-table-striped">
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>year</th>
              <th>genre</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(({ id, title, year, genre }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{title}</td>
                <td>{year}</td>
                <td>{genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

export default Movies;
