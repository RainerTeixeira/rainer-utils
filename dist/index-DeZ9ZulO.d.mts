declare const getToken: () => string | null;
declare const setToken: (token: string) => void;
declare const getRefreshToken: () => string | null;
declare const setRefreshToken: (refreshToken: string) => void;
declare const removeToken: () => void;
declare const hasToken: () => boolean;
declare const getTokens: () => {
    accessToken: string | null;
    refreshToken: string | null;
};
declare const setTokens: ({ accessToken, refreshToken, }: {
    accessToken: string;
    refreshToken: string;
}) => void;

declare const authModule_getRefreshToken: typeof getRefreshToken;
declare const authModule_getToken: typeof getToken;
declare const authModule_getTokens: typeof getTokens;
declare const authModule_hasToken: typeof hasToken;
declare const authModule_removeToken: typeof removeToken;
declare const authModule_setRefreshToken: typeof setRefreshToken;
declare const authModule_setToken: typeof setToken;
declare const authModule_setTokens: typeof setTokens;
declare namespace authModule {
  export { authModule_getRefreshToken as getRefreshToken, authModule_getToken as getToken, authModule_getTokens as getTokens, authModule_hasToken as hasToken, authModule_removeToken as removeToken, authModule_setRefreshToken as setRefreshToken, authModule_setToken as setToken, authModule_setTokens as setTokens };
}

export { authModule as a, getRefreshToken as b, setRefreshToken as c, getTokens as d, setTokens as e, getToken as g, hasToken as h, removeToken as r, setToken as s };
