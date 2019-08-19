import React from "react";
import { Provider } from "react-redux";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import EditMovie from "./edit-movie";

jest.mock("../redux", () => ({
  updateMovie: () => ({ type: "UPDATE_MOVIE_REQUEST" })
}));

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const movies = [
  {
    id: "1",
    genre: "Drama",
    title: "Lawrence of Arabia",
    year: "1962"
  }
];

let store;

beforeEach(() => {
  store = mockStore({ movies, isFetching: false });
});

afterEach(cleanup);

test("disabled when there is no id", () => {
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <EditMovie />
    </Provider>
  );

  expect(getByLabelText("Title").disabled).toBe(true);
  expect(getByLabelText("Genre").disabled).toBe(true);
  expect(getByLabelText("Title").disabled).toBe(true);
  expect(getByText("Update").disabled).toBe(true);
});

test("disabled when fetching", () => {
  store = mockStore({ movies, isFetching: true });
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <EditMovie id="1" />
    </Provider>
  );

  expect(getByLabelText("Title").disabled).toBe(true);
  expect(getByLabelText("Genre").disabled).toBe(true);
  expect(getByLabelText("Year").disabled).toBe(true);
  expect(getByText("Update").disabled).toBe(true);
});

test("displays movie", () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <EditMovie id="1" />
    </Provider>
  );

  expect(getByLabelText("Title").value).toBe("Lawrence of Arabia");
  expect(getByLabelText("Genre").value).toBe("Drama");
  expect(getByLabelText("Year").value).toBe("1962");
});

test("updates movie", () => {
  const { getByText } = render(
    <Provider store={store}>
      <EditMovie id="1" />
    </Provider>
  );

  fireEvent.click(getByText("Update"));

  expect(store.getActions()).toEqual([{ type: "UPDATE_MOVIE_REQUEST" }]);
});

test("displays error when input loses focus and required text is missing", () => {
  const { queryByText, getByLabelText } = render(
    <Provider store={store}>
      <EditMovie id="1" />
    </Provider>
  );

  fireEvent.change(getByLabelText("Title"), { target: { value: "" } });
  fireEvent.blur(getByLabelText("Title"));

  expect(queryByText("title is required")).toBeInTheDocument();
});

test("displays error when submitting and required text is missing", () => {
  const { queryByText, getByText, getByLabelText } = render(
    <Provider store={store}>
      <EditMovie id="1" />
    </Provider>
  );

  fireEvent.change(getByLabelText("Title"), { target: { value: "" } });
  fireEvent.click(getByText("Update"));

  expect(queryByText("title is required")).toBeInTheDocument();
});
