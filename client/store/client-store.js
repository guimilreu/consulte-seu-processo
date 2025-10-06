"use client";

import { create } from "zustand";

// Dados mockados - No futuro virão da API
const MOCK_CLIENTS = [
	{
		id: 1,
		name: "Maria Silva Santos",
		email: "maria.santos@email.com",
		cpf: "123.456.789-00",
		phone: "(14) 99999-1111",
		createdAt: "2023-01-15",
		processCount: 3,
		role: "client",
	},
	{
		id: 2,
		name: "João Pedro Oliveira",
		email: "joao.oliveira@email.com",
		cpf: "987.654.321-00",
		phone: "(14) 99999-2222",
		createdAt: "2023-04-20",
		processCount: 1,
		role: "client",
	},
	{
		id: 3,
		name: "Ana Carolina Souza",
		email: "ana.souza@email.com",
		cpf: "456.789.123-00",
		phone: "(14) 99999-3333",
		createdAt: "2024-02-10",
		processCount: 1,
		role: "client",
	},
	{
		id: 4,
		name: "Pedro Henrique Costa",
		email: "pedro.costa@email.com",
		cpf: "321.654.987-00",
		phone: "(14) 99999-4444",
		createdAt: "2024-05-05",
		processCount: 0,
		role: "client",
	},
];

export const useClientStore = create((set, get) => ({
	// State
	clients: [],
	selectedClient: null,
	isLoading: false,
	error: null,

	// Actions
	fetchClients: async () => {
		set({ isLoading: true, error: null });
		// No futuro: await api.get('/clients')
		await new Promise((resolve) => setTimeout(resolve, 800));

		set({ clients: MOCK_CLIENTS, isLoading: false });
	},

	addClient: async (clientData) => {
		set({ isLoading: true, error: null });
		// No futuro: await api.post('/clients', clientData)
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const newClient = {
			id: MOCK_CLIENTS.length + 1,
			...clientData,
			createdAt: new Date().toISOString().split("T")[0],
			processCount: 0,
			role: "client",
		};

		MOCK_CLIENTS.push(newClient);
		set({ clients: [...MOCK_CLIENTS], isLoading: false });

		return { success: true, client: newClient };
	},

	// Buscar cliente específico
	fetchClient: async (clientId) => {
		set({ isLoading: true, error: null });
		// No futuro: await api.get(`/clients/${clientId}`)
		await new Promise((resolve) => setTimeout(resolve, 600));

		const client = MOCK_CLIENTS.find((c) => c.id === parseInt(clientId));
		set({ selectedClient: client, isLoading: false });
		return client;
	},

	// Atualizar cliente
	updateClient: async (clientId, updateData) => {
		set({ isLoading: true, error: null });
		// No futuro: await api.put(`/clients/${clientId}`, updateData)
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const index = MOCK_CLIENTS.findIndex((c) => c.id === clientId);
		if (index !== -1) {
			MOCK_CLIENTS[index] = {
				...MOCK_CLIENTS[index],
				...updateData,
			};
			set({ clients: [...MOCK_CLIENTS], isLoading: false });
			return { success: true, client: MOCK_CLIENTS[index] };
		}

		set({ isLoading: false, error: "Cliente não encontrado" });
		return { success: false, error: "Cliente não encontrado" };
	},

	// Buscar todos os clientes (retorna array para select)
	getAllClients: () => {
		return MOCK_CLIENTS;
	},

	getStats: () => {
		return {
			totalClients: MOCK_CLIENTS.length,
		};
	},
}));

