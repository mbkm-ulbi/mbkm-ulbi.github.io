import { onClick } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/element.js';
import { fullPath, redirect } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/url.js';

onClick('loginulbi', loginUlbi);
function loginUlbi() {
  console.log('loginulbi');
  setCookieWithExpireHour('redirect', fullPath(), 1);
    redirect('https://login.ulbi.ac.id');
}

export function setCookieWithExpireHour(cname, cvalue, exhour) {
    const d = new Date();
    d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    
    // Replace 'example.com' with your domain name
    let domain = "domain=.ulbi.ac.id"; 
  
    document.cookie = cname + "=" + cvalue + ";" + expires + ";" + domain + ";path=/";
  }
  