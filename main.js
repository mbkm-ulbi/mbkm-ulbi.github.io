import { onClick } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/element.js';
import { setCookies } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/cookie.js';
import { fullPath, redirect } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/url.js';

onClick('loginulbi', loginUlbi);
function loginUlbi() {
  console.log('loginulbi');
  setCookies('redirect', fullPath());
    redirect('https://login.ulbi.ac.id');
}
