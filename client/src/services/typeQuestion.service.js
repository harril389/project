import { ApiConst } from "const";
import { createApi } from "api";
import StringFormat from "string-format";

export const getListTypeQuestion = data =>
  createApi().get(
    StringFormat(
      ApiConst.GET_LIST_TYPE_QUESTION,
      data.data.type_filter,
      data.data.paging,
      data.data.size,
      data.data.page,
    ),
  );

export const createTypeQuestion = data => createApi().post(ApiConst.TYPE_QUESTION, data.data);

export const removeTypeQuestion = data =>
  createApi().delete(StringFormat(ApiConst.TYPE_QUESTION_UPDATE_DELETE, data.data.uid));

export const updateTypeQuestion = data =>
  createApi().put(StringFormat(ApiConst.TYPE_QUESTION_UPDATE_DELETE, data.data.uid), data.data);
