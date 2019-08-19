import { combineReducers } from "redux";
import "cross-fetch";

export const GET_MOVIES_REQUEST = "GET_MOVIES_REQUEST";
export const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";
export const GET_MOVIES_FAILURE = "GET_MOVIES_FAILURE";

export const UPDATE_MOVIE_REQUEST = "UPDATE_MOVIE_REQUEST";
export const UPDATE_MOVIE_SUCCESS = "UPDATE_MOVIE_SUCCESS";
export const UPDATE_MOVIE_FAILURE = "UPDATE_MOVIE_FAILURE";

export const getMovies = () => async dispatch => {
  dispatch({ type: GET_MOVIES_REQUEST });

  const movies = await fetch("http://localhost:3000/movies").then(response =>
    response.json()
  );

  dispatch({ type: GET_MOVIES_SUCCESS, payload: movies });
};

export const updateMovie = movie => async dispatch => {
  dispatch({ type: UPDATE_MOVIE_REQUEST });

  await fetch(`http://localhost:3000/movies/${movie.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(movie)
  });

  dispatch({ type: UPDATE_MOVIE_SUCCESS });

  dispatch(getMovies());
};

const initialState = {
  movies: [],
  isFetching: false
};

const isFetching = (state = initialState.isFetching, action = {}) => {
  switch (action.type) {
    case GET_MOVIES_REQUEST:
    case UPDATE_MOVIE_REQUEST:
      return true;
    case GET_MOVIES_SUCCESS:
    case GET_MOVIES_FAILURE:
    case UPDATE_MOVIE_SUCCESS:
    case UPDATE_MOVIE_FAILURE:
      return false;
    default:
      return state;
  }
};

const movies = (state = initialState.movies, action = {}) => {
  switch (action.type) {
    case GET_MOVIES_SUCCESS:
      return action.payload;
    case GET_MOVIES_FAILURE:
      return state;
    default:
      return state;
  }
};

export const reducer = combineReducers({
  isFetching,
  movies
});
