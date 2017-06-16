import { RequestAction } from "../actions";

const TABLE_DATA = RequestAction.TABLE_DATA;

const defaultState = {
    data: {},
    error: false,
    loading: true,
}

const request = (state = defaultState, action) => {
    switch (action.type) {
        case TABLE_DATA.SUCCESS:
        const dataSource = action.payload;
        return {
            data: dataSource,
            error: false,
            loading: false,
        };
        case TABLE_DATA.FAILURE:
        const errMsg = action.payload;
        return {
            err: errMsg,
            error: true,
            loading: false
        };
        default:
        break;
    }
    return state;
};
module.exports = request;