import { ApiConst } from "const";
import { createApi } from "api";

export const login = data => createApi().post(ApiConst.LOGIN, data);
