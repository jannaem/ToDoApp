import { REFRESH_TOKEN } from "../constants/Cookies";
import CookieUtility from "../utils/CookieUtility";
import ApiService from "./ApiService";

const baseURL = "/"

const AuthenticationService = () => ({
  login: async (username:string, password: string) => {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      const {data} = await ApiService.post(baseURL + "login", params);
      return data;
  },
  requestNewToken: async () => {
      const {data} = await ApiService.get(baseURL + "refresh-token", {
          headers: {Authorization: "Bearer " + CookieUtility.get(REFRESH_TOKEN)},
      })
      return data;
    }
  
})

export default AuthenticationService
