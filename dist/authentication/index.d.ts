export declare const getToken: () => string | null;
export declare const setToken: (token: string) => void;
export declare const getRefreshToken: () => string | null;
export declare const setRefreshToken: (refreshToken: string) => void;
export declare const removeToken: () => void;
export declare const hasToken: () => boolean;
export declare const getTokens: () => {
    accessToken: string | null;
    refreshToken: string | null;
};
export declare const setTokens: ({ accessToken, refreshToken, }: {
    accessToken: string;
    refreshToken: string;
}) => void;
//# sourceMappingURL=index.d.ts.map