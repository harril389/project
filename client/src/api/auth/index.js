import { Cookies } from "../storage";
import { AppConst } from "const";

export const getUserToken = () => {
  return Cookies.getCookie(AppConst.KEY_TOKEN);
};

export const setUserToken = token => {
  Cookies.setCookie(AppConst.KEY_TOKEN, token);
};

export const removeUserToken = () => {
  return Cookies.removeCookie(AppConst.KEY_TOKEN);
};

export const getInfoUser = () => {
  return Cookies.getCookie(AppConst.KEY_INFO_USER);
};

export const setInfoUser = data => {
  Cookies.setCookie(AppConst.KEY_INFO_USER, data);
};

export const removeInfoUser = () => {
  return Cookies.removeCookie(AppConst.KEY_INFO_USER);
};
