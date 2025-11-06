"use client";

import { create } from "zustand";
import api from "@/lib/api";

export const useAuthStore = create((set, get) => ({
	// State
	user: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,

	// Actions
	login: async (email, password) => {
		set({ isLoading: true, error: null });

		try {
			const response = await api.post('/auth/login', { email, password });
			
			set({
				user: response.user,
				isAuthenticated: true,
				isLoading: false,
				error: null,
			});
			
			return { success: true, user: response.user };
		} catch (error) {
			set({
				error: error.message || "Email ou senha incorretos",
				isLoading: false,
			});
			return { success: false, error: error.message || "Email ou senha incorretos" };
		}
	},

	logout: async () => {
		try {
			await api.post('/auth/logout');
		} catch (error) {
			console.error('Erro ao fazer logout:', error);
		} finally {
			set({
				user: null,
				isAuthenticated: false,
				error: null,
			});
		}
	},

	loadUser: async () => {
		set({ isLoading: true });
		try {
			const response = await api.get('/auth/me');
			set({
				user: response.user,
				isAuthenticated: true,
				isLoading: false,
			});
			return true;
		} catch (error) {
			set({
				user: null,
				isAuthenticated: false,
				isLoading: false,
			});
			return false;
		}
	},

	// Helper functions
	isAdmin: () => {
		const user = get().user;
		return user?.role === "admin" || user?.role === "lawyer";
	},

	isClient: () => {
		const user = get().user;
		return user?.role === "client";
	},
}));
