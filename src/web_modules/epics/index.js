import { combineEpics } from "redux-observable";
import tableData from "./request";

export const rootEpic = combineEpics(tableData);