import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/Cookies";

type CookieType = typeof ACCESS_TOKEN | typeof REFRESH_TOKEN;

export default CookieType;