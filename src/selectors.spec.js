import { filterSelector } from "./selectors";

const movies = [
  {
    id: "1",
    genre: "Drama",
    title: "Metropolis",
    year: "1927"
  },
  {
    id: "2",
    genre: "Drama",
    title: "Citizen Kane",
    year: "1941"
  }
];

test("filterSelector", () => {
  const state = {
    movies,
    isFetching: false
  };

  const expected = {
    genres: ["Drama"],
    years: ["1927", "1941"]
  };

  expect(filterSelector(state)).toEqual(expected);

  state.isFetching = true;

  expect(filterSelector(state)).toEqual(expected);

  expect(filterSelector.recomputations()).toBe(1);
});
