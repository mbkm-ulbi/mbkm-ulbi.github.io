import { getAuth, getUserInfo } from "./libraries/cookies.js";
import { slugUri } from "./customs/settings.js";

const auth = await getAuth();
const profileInfo = await getUserInfo();
if (auth && profileInfo) window.location.replace(`${slugUri}beranda`);
