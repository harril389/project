import { ApiConst } from "const";
import { createApi } from "api";
import StringFormat from "string-format";

export const getListExamUser = data =>
  createApi().get(
    StringFormat(
      ApiConst.GET_LIST_EXAM_USER,
      data.data.paging,
      data.data.page,
      data.data.size,
      data.data.name_exam_filter,
    ),
  );

export const checkPass = data => createApi().post(ApiConst.CHECK_PASS, data.data);

export const createAnswer = data => createApi().put(StringFormat(ApiConst.POST_ANSWER, data.data.uid), data.data);
