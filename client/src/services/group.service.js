import { ApiConst } from "const";
import { createApi } from "api";
import StringFormat from "string-format";

export const uploadPDFHistory = data => createApi().post(ApiConst.PDF_HISTORY, data);

export const uploadPDFIntroduction = data => createApi().post(ApiConst.PDF_INTRODUCTION, data);

export const getGroup = () => createApi().get(ApiConst.ASSOCIATION);

export const updateGroup = data => createApi().post(ApiConst.ASSOCIATION, data.data);

export const getLeader = () => createApi().get(ApiConst.LEADER);
