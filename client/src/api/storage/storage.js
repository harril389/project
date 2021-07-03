export const getStorage = name => {
  return JSON.parse(localStorage.getItem(name));
};

export const setStorage = (name, value) => {
  return localStorage.setItem(name, JSON.stringify(value));
};

export const removeStorage = name => {
  return localStorage.removeItem(name);
};
