import { onClick } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/element.js';
import { redirect } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/url.js';

onClick('loginulbi', loginUlbi);
function loginUlbi() {
  console.log('loginulbi');
  const login = getCookie('login');
  setCookieWithExpireHour('redirect', window.location.href, 1);
  setCookieWithExpireHour('login', login, 18);
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
  
  // Helper to get the value of a cookie by its name
export function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
      }
  }
  return "";
}
