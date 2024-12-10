import { useSetRecoilState } from "recoil";

import { login as loginApi } from "@/api/auth";
import { authState } from "@/store/auth";
import { useAuthStore } from "@/store/auth.zustand";
import type { AuthCredentials, DecodedToken } from "@/types/auth";
import { decodeJwt } from "@/utils/decodeJwt";
import { removeAuthTokens } from "@/utils/token";

export const useAuth = () => {
	const setAuthState = useSetRecoilState(authState);
	const setUser = useAuthStore((state) => state.setUser);

	const login = async (credentials: AuthCredentials) => {
		const response = await loginApi(credentials);
		const decodedToken = decodeJwt<DecodedToken>(response.access_token);
		if (decodedToken) {
			setAuthState({ user: decodedToken });
			setUser(decodedToken);
		}
		return response;
	};

	const logout = () => {
		removeAuthTokens();
		setAuthState({ user: null });
		setUser(null);
	};

	return { login, logout };
};