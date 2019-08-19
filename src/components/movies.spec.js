import React from "react";
import { Provider } from "react-redux";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import Movies from "./movies";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const movies = [
  {
    id: "1",
    genre: "Horror",
    title: "Dawn of the Dead",
    year: "1978"
  }
];

let store;

beforeEach(() => {
  store = mockStore({ movies, isFetching: false });
});

afterEach(cleanup);

test("displays movies", () => {
  const { getByText } = render(
    <Provider store={store}>
      <Movies />
    </Provider>
  );

  expect(getByText("1")).toBeInTheDocument();
  expect(getByText("Horror")).toBeInTheDocument();
  expect(getByText("Dawn of the Dead")).toBeInTheDocument();
  expect(getByText("1978")).toBeInTheDocument();
});

test("toggles movies visibility", () => {
  const { getByText, queryByText } = render(
    <Provider store={store}>
      <Movies />
    </Provider>
  );

  expect(getByText("Dawn of the Dead")).toBeInTheDocument();

  fireEvent.click(getByText("-"));

  expect(queryByText("Dawn of the Dead")).not.toBeInTheDocument();

  fireEvent.click(getByText("+"));

  expect(getByText("Dawn of the Dead")).toBeInTheDocument();
});
