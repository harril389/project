import Cookie from "js-cookie";

export const getCookie = name => {
  return Cookie.get(name) || null;
};

export const setCookie = (name, value, options) => {
  return Cookie.set(name, value, options);
};

export const removeCookie = name => {
  return Cookie.remove(name);
};
