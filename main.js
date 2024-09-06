import { onClick } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/element.js';
import { redirect } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/url.js';
import { getCookie } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/cookie.js';

// Fungsi untuk login
function loginUlbi() {
  console.log('Login button clicked');
  setCookieWithExpireHour('redirect', window.location.href, 1);
  redirect('https://login.ulbi.ac.id');
}

// Fungsi untuk set cookie dengan expire dalam jam
function setCookieWithExpireHour(cname, cvalue, exhour) {
  const d = new Date();
  d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${cname}=${cvalue};${expires};domain=.ulbi.ac.id;path=/`;
  console.log(`Cookie set: ${cname}=${cvalue}`);
}

// Fungsi untuk delete cookie
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.ulbi.ac.id;path=/`;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  console.log(`Cookie deleted: ${name}`);
}

// Fungsi untuk logout
function logout() {
  console.log('Logout button clicked');
  deleteCookie('login');
  deleteCookie('redirect');
  window.location.href = "/";
}

// Fungsi untuk update button login/logout
function updateLoginButton() {
  let token = getCookie("login");
  let loginButton = document.getElementById("loginulbi");
  let logoutButton = document.getElementById("logoutulbi");

  console.log("Memperbarui visibilitas tombol. Token:", token);

  if (loginButton) {
    // Jika token ada, maka tombol login dihide
    loginButton.hidden = !!token;
  }
  
  if (logoutButton) {
    // Jika token tidak ada, maka tombol logout dihide
    logoutButton.hidden = !token;
  }

  if (token) {
    console.log("User is logged in. Binding logout function.");
    onClick('logoutulbi', logout); // Bind fungsi logout untuk logout button
  } else {
    console.log("User is not logged in. Binding login function.");
    onClick('loginulbi', loginUlbi); // Bind fungsi login untuk login button
  }
}

// Inisialisasi fungsi updateLoginButton saat window onload
window.onload = function() {
  updateLoginButton();
};
