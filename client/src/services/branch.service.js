import { ApiConst } from "const";
import { createApi } from "api";
import StringFormat from "string-format";

export const getBranchByUid = data => createApi().get(StringFormat(ApiConst.BRANCH_UPDATE_DELETE, data.uid));

export const getListBranch = () => createApi().get(ApiConst.BRANCH);

export const updateBranch = data =>
  createApi().put(StringFormat(ApiConst.BRANCH_UPDATE_DELETE, data.data.uid), data.data);

export const createBranch = data => createApi().post(ApiConst.BRANCH, data.data);
