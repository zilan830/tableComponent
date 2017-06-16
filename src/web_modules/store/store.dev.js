import {createStore, applyMiddleware} from "redux";
import {createEpicMiddleware} from "redux-observable";
import {composeWithDevTools} from "remote-redux-devtools";
import { rootEpic } from "../epics";
import rootReducer from "../reducers";

console.log("enter dev store");
const composeEnhancers = composeWithDevTools({
  name: "tableComponent",
  hostname: "localhost",
  // port: 8050
});

const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
);
export default store;