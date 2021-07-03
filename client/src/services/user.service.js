import { ApiConst } from "const";
import { createApi, createApiMember } from "api";
import StringFormat from "string-format";

export const createUser = data => createApi().post(ApiConst.CREATE_USER, data.data);

export const getListUser = data =>
  createApi().get(
    StringFormat(
      ApiConst.GET_LIST_USER,
      data.data.paging,
      data.data.size,
      data.data.page,
      data.data.full_name,
      data.data.blood_group,
      data.data.address,
      data.data.birthday,
      data.data.club_uid,
    ),
  );

export const getMember = () => createApi().get(ApiConst.GET_MEMBER);

export const uploadAvatar = data => createApi().post(ApiConst.UPLOAD_AVATAR, data);

export const changePassMember = data => createApi().put(ApiConst.PASSWORD, data);

export const forgotPassMember = data => createApi().post(ApiConst.PASSWORD_FORGET, data);

export const newPasswordMember = data => createApiMember().post(ApiConst.PASSWORD_NEW, data);

export const updateUserMember = data => createApi().put(ApiConst.GET_MEMBER, data.data);

export const updateMemberAdmin = data =>
  createApi().put(StringFormat(ApiConst.UPDATE_MEMBER, data.data.uid), data.data);
