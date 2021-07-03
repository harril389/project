import { ApiConst, AppConst } from "const";
import apisauce from "apisauce";
import Cookies from "js-cookie";

// export const DEFAULT_CONFIG = {
//   baseURL: ApiConst.BASE_URL,
//   header: ApiConst.HEADER_DEFAULT,
//   timeout: ApiConst.TIMEOUT,
// };

// export const createApi = (initConfig = DEFAULT_CONFIG) => {
//   const token = Cookie.get(AppConst.KEY_TOKEN);
//   if (token && token.length > 0) {
//     initConfig.header.accessToken = token;
//   }
//   return apisauce.create(initConfig);
// };

// export const createApiQuestion = () => createApi(DEFAULT_CONFIG);
export const API_CONFIG_REG = {
  baseURL: ApiConst.BASE_URL,
  headers: ApiConst.HEADER_DEFAULT,
  timeout: ApiConst.TIMEOUT,
};

export const createApiWithToken = (initConfig = API_CONFIG_REG, token) => {
  let appToken = token || Cookies.get(AppConst.KEY_TOKEN);
  if (appToken && appToken.length > 0) {
    initConfig.headers["access-token"] = appToken;
  }
  return apisauce.create(initConfig);
};

export const createApi = () => createApiWithToken(API_CONFIG_REG);

export const createApiWithTokenMember = (initConfig = API_CONFIG_REG, token) => {
  let appToken = token || Cookies.get(AppConst.KEY_TOKEN_NEW_PASS);
  if (appToken && appToken.length > 0) {
    initConfig.headers["access-token"] = appToken;
  }
  return apisauce.create(initConfig);
};

export const createApiMember = () => createApiWithTokenMember(API_CONFIG_REG);
