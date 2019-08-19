import React from "react";
import { Provider } from "react-redux";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import SelectMovie from "./select-movie";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const movies = [
  {
    id: "1",
    genre: "Crime",
    title: "The Godfather",
    year: "1972"
  },
  {
    id: "2",
    genre: "Drama",
    title: "Apocalypse Now",
    year: "1979"
  }
];

let store;

beforeEach(() => {
  store = mockStore({ movies, isFetching: false });
});

afterEach(() => {
  cleanup();
});

test("displays years select", () => {
  const { container } = render(
    <Provider store={store}>
      <SelectMovie />
    </Provider>
  );

  const options = container.querySelectorAll('select[name="year"] > option');

  expect(options.length).toBe(3);
  expect(options[0].textContent).toBe("Please select");
  expect(options[1].textContent).toBe("1972");
  expect(options[2].textContent).toBe("1979");
});

test("displays genres select", () => {
  const { container } = render(
    <Provider store={store}>
      <SelectMovie />
    </Provider>
  );

  const options = container.querySelectorAll('select[name="genre"] > option');

  expect(options.length).toBe(3);
  expect(options[0].textContent).toBe("Please select");
  expect(options[1].textContent).toBe("Crime");
  expect(options[2].textContent).toBe("Drama");
});

test("displays movies select", () => {
  const { container } = render(
    <Provider store={store}>
      <SelectMovie />
    </Provider>
  );

  const options = container.querySelectorAll('select[name="id"] > option');

  expect(options.length).toBe(1);
  expect(options[0].textContent).toBe("Please select");
});

test("displays movies when genre and year are selected", () => {
  const { container, getByLabelText } = render(
    <Provider store={store}>
      <SelectMovie />
    </Provider>
  );

  fireEvent.change(getByLabelText("Year"), { target: { value: "1972" } });
  fireEvent.change(getByLabelText("Genre"), { target: { value: "Crime" } });

  const options = container.querySelectorAll('select[name="id"] > option');

  expect(options.length).toBe(2);
  expect(options[0].textContent).toBe("Please select");
  expect(options[1].textContent).toBe("The Godfather");
});

test("disables movies select when genre and year are not selected", () => {
  const { container } = render(
    <Provider store={store}>
      <SelectMovie />
    </Provider>
  );

  const select = container.querySelector('select[name="id"]');

  expect(select.disabled).toBe(true);
});

test("displays message no movies are found", () => {
  const { container, getByLabelText, getByText } = render(
    <Provider store={store}>
      <SelectMovie />
    </Provider>
  );

  fireEvent.change(getByLabelText("Year"), { target: { value: "1972" } });
  fireEvent.change(getByLabelText("Genre"), { target: { value: "Drama" } });

  const options = container.querySelectorAll('select[name="id"] > option');

  expect(options.length).toBe(1);
  expect(options[0].textContent).toBe("Please select");
  expect(getByText("No Movies Found")).toBeInTheDocument();
});

test("disabled when fetching", () => {
  store = mockStore({ movies, isFetching: true });
  const { getByLabelText } = render(
    <Provider store={store}>
      <SelectMovie />
    </Provider>
  );

  expect(getByLabelText("Year").disabled).toBe(true);
  expect(getByLabelText("Genre").disabled).toBe(true);
  expect(getByLabelText("Movie").disabled).toBe(true);
});

test("calls onChange with id", () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <Provider store={store}>
      <SelectMovie onChange={onChange} />
    </Provider>
  );

  fireEvent.change(getByLabelText("Year"), { target: { value: "1972" } });
  fireEvent.change(getByLabelText("Genre"), { target: { value: "Crime" } });
  fireEvent.change(getByLabelText("Movie"), { target: { value: "1" } });

  expect(onChange).toHaveBeenCalledWith("1");
});
