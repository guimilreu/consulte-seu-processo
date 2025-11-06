"use client";

import { create } from "zustand";
import api from "@/lib/api";

export const useClientStore = create((set, get) => ({
	// State
	clients: [],
	selectedClient: null,
	isLoading: false,
	error: null,

	// Actions
	fetchClients: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await api.get('/clients');
			set({ clients: response.clients, isLoading: false });
		} catch (error) {
			set({ error: error.message, isLoading: false });
		}
	},

	addClient: async (clientData) => {
		set({ isLoading: true, error: null });
		try {
			const response = await api.post('/clients', clientData);
			await get().fetchClients();
			return { success: true, client: response.client };
		} catch (error) {
			set({ error: error.message, isLoading: false });
			return { success: false, error: error.message };
		}
	},

	fetchClient: async (clientId) => {
		set({ isLoading: true, error: null });
		try {
			const client = await api.get(`/clients/${clientId}`);
		set({ selectedClient: client, isLoading: false });
		return client;
		} catch (error) {
			set({ error: error.message, isLoading: false });
			return null;
		}
	},

	updateClient: async (clientId, updateData) => {
		set({ isLoading: true, error: null });
		try {
			const response = await api.put(`/clients/${clientId}`, updateData);
			await get().fetchClients();
			return { success: true, client: response.client };
		} catch (error) {
			set({ error: error.message, isLoading: false });
			return { success: false, error: error.message };
		}
	},

	deleteClient: async (clientId) => {
		set({ isLoading: true, error: null });
		try {
			await api.delete(`/clients/${clientId}`);
			await get().fetchClients();
			return { success: true };
		} catch (error) {
			set({ error: error.message, isLoading: false });
			return { success: false, error: error.message };
		}
	},

	getAllClients: () => {
		return get().clients;
	},

	getStats: async () => {
		try {
			const response = await api.get('/clients/stats');
			return response;
		} catch (error) {
			// Fallback para cálculo local se a API falhar
			return {
				totalClients: get().clients.length,
				clientsThisMonth: 0,
				clientsLastMonth: 0,
			};
		}
	},
}));

