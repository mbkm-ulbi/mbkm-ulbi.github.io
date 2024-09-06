import { onClick } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/element.js';
import { redirect } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/url.js';
import { getCookie } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/cookie.js';

// Fungsi untuk login
function loginUlbi() {
  console.log('Tombol login diklik');
  setCookieWithExpireHour('redirect', window.location.href, 1);
  redirect('https://login.ulbi.ac.id');
}

// Fungsi untuk mengatur cookie dengan batas waktu dalam jam
function setCookieWithExpireHour(cname, cvalue, exhour) {
  const d = new Date();
  d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${cname}=${cvalue};${expires};domain=.ulbi.ac.id;path=/`;
  console.log(`Cookie disetel: ${cname}=${cvalue}`);
}

// Fungsi untuk menghapus cookie
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.ulbi.ac.id;path=/`;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  console.log(`Cookie dihapus: ${name}`);
}

// Fungsi untuk logout
function logout() {
  console.log('Tombol logout diklik');
  deleteCookie('login');
  deleteCookie('redirect');
  window.location.href = "/";
}

// Fungsi untuk memperbarui tombol login/logout
function updateLoginButton() {
  let token = getCookie("login");
  let loginButton = document.getElementById("loginulbi");

  if (token) {
    // Jika ada token, ubah teks tombol menjadi "Logout"
    loginButton.textContent = "Logout";
    loginButton.onclick = logout;
    console.log("Pengguna sudah login. Tombol logout diaktifkan.");
  } else {
    // Jika tidak ada token, ubah teks tombol menjadi "Login"
    loginButton.textContent = "Login";
    loginButton.onclick = loginUlbi;
    console.log("Pengguna belum login. Tombol login diaktifkan.");
  }
}

// Tunggu sampai seluruh dokumen HTML dimuat
document.addEventListener("DOMContentLoaded", function() {
  updateLoginButton();
});
