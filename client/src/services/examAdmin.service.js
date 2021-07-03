import { ApiConst } from "const";
import { createApi } from "api";
import StringFormat from "string-format";

export const getListExam = data =>
  createApi().get(
    StringFormat(
      ApiConst.GET_LIST_EXAM,
      data.data.paging,
      data.data.size,
      data.data.page,
      data.data.name_exam_filter,
      // data.data.status,
    ),
  );

export const getExamByUid = data => createApi().get(StringFormat(ApiConst.EXAM_UPDATE_DELETE, data.data.uid));

export const createExam = data => createApi().post(ApiConst.EXAM, data.data);

export const updateExam = data => createApi().put(StringFormat(ApiConst.EXAM_UPDATE_DELETE, data.data.uid), data.data);

export const removeExam = data => createApi().delete(StringFormat(ApiConst.EXAM_UPDATE_DELETE, data?.data.uid));
