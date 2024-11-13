import { setCookieWithExpireDay, setCookieWithExpireSecond, getCookie, deleteCookie } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.3/cookie.js";

export const setAuth = async (token) => {
  await setCookieWithExpireDay("token", token, 1);
};

export const getAuth = async () => {
  return getCookie("token");
};

export const removeAuth = async () => {
  deleteCookie("token");
};

export const setFlashMessage = async (message) => {
  await setCookieWithExpireSecond("flashMessage", message, 10);
};

export const getFlashMessage = async () => {
  const message = getCookie("flashMessage");

  if (!message || message.length === 0) return;

  await deleteCookie("flashMessage");
  return message;
};
