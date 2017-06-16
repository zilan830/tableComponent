import { RequestAction } from "../actions";

const TABLE_DATA = RequestAction.TABLE_DATA;

const defaultState = {
    data: {},
    error: false,
}

const request = (state = defaultState, action) => {
    switch (action.type) {
        case TABLE_DATA.SUCCESS:
        const dataSource = action.payload;
        return {
            error: false,
            data: dataSource
        };
        case TABLE_DATA.FAILURE:
        const errMsg = action.payload;
        return {
            error: true,
            err: errMsg,
        };
        default:
        break;
    }
    return state;
};
module.exports = request;