import { onClick } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/element.js';
import { setCookieWithExpireHour } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/cookie.js';
import { fullPath, redirect } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/url.js';

onClick('loginulbi', loginUlbi);
function loginUlbi() {
  console.log('loginulbi');
  setCookieWithExpireHour('redirect', fullPath(), 1);
    redirect('https://login.ulbi.ac.id');
}
