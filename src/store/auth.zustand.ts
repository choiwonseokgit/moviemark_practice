import { create } from "zustand";

import type { DecodedToken } from "@/types/auth";

interface AuthState {
  user: DecodedToken | null;
  setUser: (user: DecodedToken | null) => void;
  isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	isLoggedIn: () => {
		const state:AuthState = useAuthStore.getState();
		return !!state.user?.sub;
	},
}));