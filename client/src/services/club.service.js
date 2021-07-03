import { ApiConst } from "const";
import { createApi } from "api";
import StringFormat from "string-format";

export const getClubByUid = data => createApi().get(StringFormat(ApiConst.CLUB_UPDATE_DELETE, data.uid));

export const getAllClub = () => createApi().get(ApiConst.GET_ALL_CLUB);

export const getListClub = data =>
  createApi().get(
    StringFormat(
      ApiConst.GET_LIST_CLUB,
      data.data.paging,
      data.data.size,
      data.data.page,
      data.data.name_filter,
      data.data.code_branch_filter,
    ),
  );

export const updateClub = data => createApi().put(StringFormat(ApiConst.CLUB_UPDATE_DELETE, data.data.uid), data.data);

export const createClub = data => createApi().post(ApiConst.CLUB, data.data);
