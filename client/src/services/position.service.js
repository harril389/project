import { ApiConst } from "const";
import { createApi } from "api";
import StringFormat from "string-format";

export const getListPosition = () => createApi().get(ApiConst.GET_LIST_POSITION);

// export const removeQuestion = data => createApi().delete(StringFormat(ApiConst.QUESTION_UPDATE_DELETE, data?.data.uid));

// export const updateQuestion = data =>
//   createApi().put(StringFormat(ApiConst.QUESTION_UPDATE_DELETE, data.data.uid), data.data);

// export const createQuestion = data => createApi().post(ApiConst.QUESTION, data.data);
