import { ApiConst } from "const";
import { createApi } from "api";
import StringFormat from "string-format";

export const getListQuestion = data =>
  createApi().get(
    StringFormat(
      ApiConst.GET_LIST_QUESTION,
      data.data.paging,
      data.data.size,
      data.data.page,
      data.data.filter,
      data.data.type_question_uid,
      data.data.point_start,
      data.data.point_end,
    ),
  );

export const removeQuestion = data => createApi().delete(StringFormat(ApiConst.QUESTION_UPDATE_DELETE, data?.data.uid));

export const updateQuestion = data =>
  createApi().put(StringFormat(ApiConst.QUESTION_UPDATE_DELETE, data.data.uid), data.data);

export const createQuestion = data => createApi().post(ApiConst.QUESTION, data.data);
