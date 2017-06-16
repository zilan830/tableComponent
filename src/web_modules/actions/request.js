import createRequestTypes from "./actionHelper";

class RequestAction {
    TABLE_DATA = createRequestTypes("TABLE_DATA");
    tableData(url,obj, page, pageSize) {
        return {
            type: this.TABLE_DATA.REQUEST,
            url,
            data: {
                ...obj,
                startIndex: page*pageSize,
                pageSize,
            }
        }
    }
}

export default {
    RequestAction: new RequestAction()
}