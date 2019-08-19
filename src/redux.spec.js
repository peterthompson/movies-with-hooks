import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as redux from "./redux";
import fetchMock from "fetch-mock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const movies = [
  {
    id: "1",
    title: "Back to the Future",
    year: 1985,
    genre: "Adventure"
  }
];

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("getMovies", () => {
    it(`creates ${redux.GET_MOVIES_SUCCESS} action when fetching movies is done`, async () => {
      fetchMock.getOnce("http://localhost:3000/movies", {
        body: movies,
        headers: { "content-type": "application/json" }
      });
      const expectedActions = [
        { type: redux.GET_MOVIES_REQUEST },
        { type: redux.GET_MOVIES_SUCCESS, payload: movies }
      ];
      const store = mockStore({ movies: [], isFetching: false });

      await store.dispatch(redux.getMovies());

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe("updateMovie", () => {
    it(`creates ${redux.UPDATE_MOVIE_SUCCESS} action when updating movie is done and dispatches getMovies`, async () => {
      fetchMock.putOnce("http://localhost:3000/movies/1", 200);
      fetchMock.getOnce("http://localhost:3000/movies", {
        body: movies,
        headers: { "content-type": "application/json" }
      });
      const expectedActions = [
        { type: redux.UPDATE_MOVIE_REQUEST },
        { type: redux.UPDATE_MOVIE_SUCCESS },
        { type: redux.GET_MOVIES_REQUEST }
      ];
      const store = mockStore({ movies: [], isFetching: false });
      const payload = {
        id: "1",
        title: "Back to the Future",
        year: 1985,
        genre: "Comedy"
      };

      await store.dispatch(redux.updateMovie(payload));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("reducer", () => {
  it("handles initial state", () => {
    const initialState = {
      movies: [],
      isFetching: false
    };

    expect(redux.reducer()).toEqual(initialState);
  });

  it("handles unknown action", () => {
    const state = {
      movies,
      isFetching: false
    };
    const action = { type: "UNKNOWN" };

    expect(redux.reducer(state, action)).toEqual(state);
  });

  it(`handles ${redux.GET_MOVIES_REQUEST} action`, () => {
    const state = { movies: [], isFetching: false };
    const action = { type: redux.GET_MOVIES_REQUEST };

    expect(redux.reducer(state, action)).toEqual({
      movies: [],
      isFetching: true
    });
  });

  it(`handles ${redux.GET_MOVIES_SUCCESS} action`, () => {
    const state = { movies: [], isFetching: true };
    const action = { type: redux.GET_MOVIES_SUCCESS, payload: movies };

    expect(redux.reducer(state, action)).toEqual({
      movies,
      isFetching: false
    });
  });

  it(`handles ${redux.GET_MOVIES_FAILURE} action`, () => {
    const state = { movies: [], isFetching: true };
    const action = { type: redux.GET_MOVIES_FAILURE };

    expect(redux.reducer(state, action)).toEqual({
      movies: [],
      isFetching: false
    });
  });

  it(`handles ${redux.UPDATE_MOVIE_REQUEST} action`, () => {
    const state = { movies: [], isFetching: false };
    const action = { type: redux.UPDATE_MOVIE_REQUEST };

    expect(redux.reducer(state, action)).toEqual({
      movies: [],
      isFetching: true
    });
  });

  it(`handles ${redux.UPDATE_MOVIE_SUCCESS} action`, () => {
    const state = { movies, isFetching: true };
    const action = { type: redux.UPDATE_MOVIE_SUCCESS };

    expect(redux.reducer(state, action)).toEqual({
      movies,
      isFetching: false
    });
  });

  it(`handles ${redux.UPDATE_MOVIE_FAILURE} action`, () => {
    const state = { movies, isFetching: true };
    const action = { type: redux.UPDATE_MOVIE_FAILURE };

    expect(redux.reducer(state, action)).toEqual({
      movies,
      isFetching: false
    });
  });
});
