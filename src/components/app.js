import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getMovies } from "../redux";

import Movies from "./movies";
import EditMovie from "./edit-movie";
import SelectMovie from "./select-movie";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const [id, setId] = useState("");

  return (
    <Fragment>
      <Movies />
      <SelectMovie id={id} onChange={setId} />
      <EditMovie id={id} />
    </Fragment>
  );
};

export default App;
