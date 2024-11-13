import { getAuth } from "./libraries/cookies.js";
import { slugUri } from "./customs/settings.js";

const auth = await getAuth();
if (auth) window.location.replace(`${slugUri}beranda`);
