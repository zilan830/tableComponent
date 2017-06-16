import Rx from "rxjs";
import { combineEpics } from "redux-observable";
import { baseAjax } from "./tool";
import { RequestAction } from "../actions";

const TABLE_DATA = RequestAction.TABLE_DATA;

export const tableData = (action$, store) => {
    return action$
        .ofType(TABLE_DATA.REQUEST)
        .mergeMap(action => {
            return baseAjax(action, store)
                .map(response => (
                    {
                        type: TABLE_DATA.SUCCESS,
                        payload: response,
                        error: false,
                    }
                ))
                .catch(err => {
                    return Rx.Observable
                        .of({
                            type: TABLE_DATA.FAILURE,
                            payload: err,
                            error: true,
                        })
                })
        })
}


export default combineEpics(tableData);