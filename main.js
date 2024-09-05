import { onClick } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/element.js';
import { redirect } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/url.js';
import { getCookie } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/cookie.js';

onClick('loginulbi', loginUlbi);
function loginUlbi() {
  console.log('loginulbi');
  setCookieWithExpireHour('redirect', window.location.href, 1);
    redirect('https://login.ulbi.ac.id');
}

export function setCookieWithExpireHour(cname, cvalue, exhour) {
    const d = new Date();
    d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    
    // Set domain to ulbi.ac.id to allow subdomains access
    let domain = "domain=.ulbi.ac.id"; 
  
    document.cookie = cname + "=" + cvalue + ";" + expires + ";" + domain + ";path=/";
  }

function updateLoginButton() {
  let token = getCookie("login");
  let loginButton = document.getElementById("loginulbi");
  if (token !== "") {
    loginButton.textContent = "Logout";
    loginButton.id = "logout";
    loginButton.onclick = function() {
      logout();
    }
  } 
}

function logout() {
  document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/";
}

window.onload = function() {
  updateLoginButton();
};