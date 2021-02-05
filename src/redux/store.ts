import { createStore, applyMiddleware } from "redux";
import rootReducers from "./reducers/rootReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware();
// const middleware = [sagaMiddleware]; wrong
const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
