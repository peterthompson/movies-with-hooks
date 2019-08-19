import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./redux";

function configureStore() {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
}

export default configureStore;
