import { setCookieWithExpireDay, setCookieWithExpireSecond, getCookie, deleteCookie } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.3/cookie.js";
import cryptoJs from 'https://cdn.jsdelivr.net/npm/crypto-js@4.2.0/+esm'


const secretKey = "mbkm-ulbi-091";

export const setUserInfo = async (userInfo) => {
  // Enkripsi data menjadi ciphertext
  const encrypt = cryptoJs.AES.encrypt(JSON.stringify(userInfo), secretKey).toString();
  // Simpan ciphertext ke dalam cookie
  await setCookieWithExpireDay("userInfo", encrypt, 1);
};

export const getUserInfo = async () => {
  // Ambil ciphertext dari cookie
  const encryptedData = getCookie("userInfo");

  if (!encryptedData) {
    return null; // Jika cookie tidak ditemukan, kembalikan null
  }

  try {
    // Dekripsi data
    const bytes = cryptoJs.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(cryptoJs.enc.Utf8); // Ubah hasil dekripsi ke teks UTF-8

    // Parsing hasil dekripsi menjadi objek
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Failed to decrypt user info:", error);
    return null; // Jika terjadi kesalahan, kembalikan null
  }
};

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
