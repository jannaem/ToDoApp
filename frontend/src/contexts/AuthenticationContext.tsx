import React, { createContext, useContext, useEffect, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/Cookies";
import Principal from "../models/Principal";
import Roles from "../models/Roles";
import AuthenticationService from "../services/AuthenticationService";
import CookieUtility from "../utils/CookieUtility";
import JWTUtility from "../utils/JWTUtility";
import SnackbarContext from "./SnackbarContext";

type AuthenticationProviderProps = {
  children: React.ReactNode;
};

type Keypair = { access_token: string; refresh_token: string };

export type AuthenticationContextProps = {
  principal: Principal | undefined;
  isProcessingAuthentication: boolean;
  hasRole: (searchedRoles: Roles[]) => boolean;
  login: (username: string, password: string) => Promise<void>;
  requestNewToken: () => Promise<void>;
  logout: () => void;
};

const AuthenticationContext = createContext<AuthenticationContextProps>(
  {} as AuthenticationContextProps
);

export const useAuth = () => useContext(AuthenticationContext);

export const AuthenticationContextProvider = ({
  children,
}: AuthenticationProviderProps) => {
  const [principal, setPrincipal] = useState<Principal | undefined>(undefined);
  const [isProcessingAuthentication, setIsProcessingAuthentication] =
    useState(true);
  const { displaySnackbarMessage } = useContext(SnackbarContext);

  const extractAndSetPrincipalAndTokens = ({
    access_token,
    refresh_token,
  }: Keypair) => {
    CookieUtility.set(ACCESS_TOKEN, access_token);
    CookieUtility.set(REFRESH_TOKEN, refresh_token);
    const payload = JWTUtility.decodePayload(access_token);
    setPrincipal({
      username: payload.sub,
      roles: (payload.roles as string[]).map(
        (role: string) => Roles[role as keyof typeof Roles]
      ),
    });
  };

  useEffect(() => {
    authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authenticate = async () => {
    const accessToken = CookieUtility.get(ACCESS_TOKEN);
    const refreshToken = CookieUtility.get(REFRESH_TOKEN);
    if (accessToken && refreshToken) {
      if (JWTUtility.checkIfIsExpired(accessToken)) {
        await requestNewToken();
      } else {
        extractAndSetPrincipalAndTokens({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      }
    }
    setIsProcessingAuthentication(false);
  };

  const hasRole = (searchedRoles: Roles[]) =>
    principal != undefined &&
    principal.roles.some((role) => searchedRoles.includes(role));

  const login = (username: string, password: string) => {
    return AuthenticationService()
      .login(username, password)
      .then((data) => extractAndSetPrincipalAndTokens(data));
  };

  const logout = async () => {
    CookieUtility.remove(ACCESS_TOKEN);
    CookieUtility.remove(REFRESH_TOKEN);
    setPrincipal(undefined);
    displaySnackbarMessage("Logout war erfolgreich", "success");
  };

  const requestNewToken = () =>
    AuthenticationService()
      .requestNewToken()
      .then((data) => extractAndSetPrincipalAndTokens(data));

  return (
    <AuthenticationContext.Provider
      value={{
        principal,
        hasRole,
        login,
        logout,
        requestNewToken,
        isProcessingAuthentication,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
