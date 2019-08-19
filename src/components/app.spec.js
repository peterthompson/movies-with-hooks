import React from "react";
import { Provider } from "react-redux";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import App from "./app";

jest.mock("../redux", () => ({
  getMovies: () => ({ type: "GET_MOVIES_REQUEST" })
}));

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const movies = [
  {
    id: "1",
    genre: "Western",
    title: "Once Upon a Time in the West",
    year: "1968"
  }
];

let store;

beforeEach(() => {
  store = mockStore({ movies, isFetching: false });
});

afterEach(cleanup);

test("displays", () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(container).toMatchSnapshot();
});

test("gets movies", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(store.getActions()).toEqual([{ type: "GET_MOVIES_REQUEST" }]);
});
