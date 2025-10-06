"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Dados mockados - No futuro, virão do backend
const MOCK_USERS = [
	// Clientes
	{
		id: 1,
		name: "Maria Silva Santos",
		email: "maria@email.com",
		password: "maria",
		role: "client",
		cpf: "123.456.789-00",
		phone: "(14) 99999-1111",
	},
	{
		id: 2,
		name: "João Pedro Oliveira",
		email: "joao.oliveira@email.com",
		password: "123456",
		role: "client",
		cpf: "987.654.321-00",
		phone: "(14) 99999-2222",
	},
	{
		id: 3,
		name: "Ana Carolina Souza",
		email: "ana.souza@email.com",
		password: "123456",
		role: "client",
		cpf: "456.789.123-00",
		phone: "(14) 99999-3333",
	},
	// Administradores
	{
		id: 4,
		name: "Fabio Candido Pereira",
		email: "fabio@email.com",
		password: "admin",
		role: "admin",
	},
];

export const useAuthStore = create(
	persist(
		(set, get) => ({
			// State
			user: null,
			isAuthenticated: false,
			isLoading: false,
			error: null,

			// Actions
			login: async (email, password) => {
				set({ isLoading: true, error: null });

				// Simula delay de API - No futuro: await api.post('/auth/login', { email, password })
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const user = MOCK_USERS.find(
					(u) => u.email === email && u.password === password
				);

				if (user) {
					const { password: _, ...userWithoutPassword } = user;
					set({
						user: userWithoutPassword,
						isAuthenticated: true,
						isLoading: false,
						error: null,
					});
					return { success: true, user: userWithoutPassword };
				} else {
					set({
						error: "Email ou senha incorretos",
						isLoading: false,
					});
					return { success: false, error: "Email ou senha incorretos" };
				}
			},

			logout: () => {
				// No futuro: await api.post('/auth/logout')
				set({
					user: null,
					isAuthenticated: false,
					error: null,
				});
			},

			// Helper functions
			isAdmin: () => {
				const user = get().user;
				return user?.role === "admin" || user?.role === "team";
			},

			isClient: () => {
				const user = get().user;
				return user?.role === "client";
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);

