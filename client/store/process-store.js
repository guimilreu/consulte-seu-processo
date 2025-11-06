"use client";

import { create } from "zustand";
import api from "@/lib/api";

export const useProcessStore = create((set, get) => ({
	// State
	processes: [],
	selectedProcess: null,
	searchResults: [],
	searchTerm: "",
	isLoading: false,
	error: null,

	// Actions para CLIENTES
	fetchMyProcesses: async (userId) => {
		set({ isLoading: true, error: null });
		try {
			const response = await api.get('/processes/user');
			set({ processes: response.processes, isLoading: false });
		} catch (error) {
			set({ error: error.message, isLoading: false });
		}
	},

	// Actions para ADMINS
	fetchAllProcesses: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await api.get('/processes');
			set({ processes: response.processes, isLoading: false });
		} catch (error) {
			set({ error: error.message, isLoading: false });
		}
	},

	// Buscar processo específico
	fetchProcess: async (processId) => {
		set({ isLoading: true, error: null });
		try {
			const process = await api.get(`/processes/${processId}`);
		set({ selectedProcess: process, isLoading: false });
		} catch (error) {
			set({ error: error.message, isLoading: false });
		}
	},

	// Busca (admin)
	search: async (term) => {
		set({ isLoading: true, searchTerm: term });
		try {
		if (!term || term.trim() === "") {
			set({ searchResults: [], isLoading: false });
			return;
		}

			const response = await api.get(`/processes/search?q=${encodeURIComponent(term)}`);
			set({ searchResults: response.processes, isLoading: false });
		} catch (error) {
			set({ error: error.message, isLoading: false });
		}
	},

	clearSearch: () => {
		set({ searchTerm: "", searchResults: [] });
	},

	// Export PDF no formato do relatório processual
	exportToPdf: async (processId) => {
		set({ isLoading: true });
		try {
			const process = await api.get(`/processes/${processId}`);

		if (process) {
			let reportContent = "RELATÓRIO PROCESSUAL\n\n";
			reportContent += "DADOS DO PROCESSO:\n";
			reportContent += `Nº do processo: ${process.processNumber}\n`;
			reportContent += `Juízo: ${process.court}\n`;
				reportContent += `Cliente: ${process.clientName || 'N/A'}\n`;
			reportContent += `Réu (parte contrária): ${process.defendant}\n`;
			reportContent += `Data do ajuizamento: ${new Date(process.filingDate).toLocaleDateString("pt-BR")}\n`;
			reportContent += `Valor da Causa: ${process.caseValue}\n`;
			reportContent += `Assunto principal do processo: ${process.subject}\n\n`;
			
			reportContent += "Andamentos do processo:\n";
			
				const sortedTimeline = [...(process.timeline || [])].sort((a, b) => 
				new Date(a.date) - new Date(b.date)
			);
			
			sortedTimeline.forEach((item) => {
				const formattedDate = new Date(item.date).toLocaleDateString("pt-BR", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric"
				});
				reportContent += `${formattedDate}: ${item.title}: ${item.text}\n`;
				if (item.attachments && item.attachments.length > 0) {
					reportContent += `   Anexos: ${item.attachments.map(a => a.name).join(", ")}\n`;
				}
				reportContent += "\n";
			});
			
			reportContent += "\n";
			reportContent += `STATUS ATUAL: ${process.status}\n`;
			reportContent += `\nRelatório gerado em: ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`;
			
			const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8" });
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `Relatorio_Processual_${process.processNumber.replace(/[^\d]/g, "")}.txt`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		}
		} catch (error) {
			set({ error: error.message });
		}
		set({ isLoading: false });
	},

	// Criar novo processo (admin)
	createProcess: async (processData) => {
		set({ isLoading: true, error: null });
		try {
			const response = await api.post('/processes', processData);
			await get().fetchAllProcesses();
			return { success: true, process: response.process };
		} catch (error) {
			set({ error: error.message, isLoading: false });
			return { success: false, error: error.message };
		}
	},

	// Atualizar processo (admin)
	updateProcess: async (processId, updateData) => {
		set({ isLoading: true, error: null });
		try {
			const response = await api.put(`/processes/${processId}`, updateData);
			await get().fetchAllProcesses();
			if (get().selectedProcess?._id === processId) {
				set({ selectedProcess: response.process });
			}
			return { success: true, process: response.process };
		} catch (error) {
			set({ error: error.message, isLoading: false });
			return { success: false, error: error.message };
		}
	},

	// Excluir processo (admin)
	deleteProcess: async (processId) => {
		set({ isLoading: true, error: null });
		try {
			await api.delete(`/processes/${processId}`);
			await get().fetchAllProcesses();
			return { success: true };
		} catch (error) {
			set({ error: error.message, isLoading: false });
			return { success: false, error: error.message };
		}
	},

	// Buscar processos por cliente
	getProcessesByClient: (clientId) => {
		return get().processes.filter((p) => p.clientId === clientId || p.clientId?._id === clientId);
	},

	// Adicionar andamento a um processo
	addTimeline: async (processId, timelineData) => {
		set({ isLoading: true, error: null });
		try {
			const response = await api.post(`/processes/${processId}/timeline`, timelineData);
			await get().fetchProcess(processId);
			return { success: true, timeline: response.timeline };
		} catch (error) {
			set({ error: error.message, isLoading: false });
			return { success: false, error: error.message };
		}
	},

	// Excluir andamento de um processo
	deleteTimeline: async (processId, timelineId) => {
		set({ isLoading: true, error: null });
		try {
			await api.delete(`/processes/${processId}/timeline/${timelineId}`);
			await get().fetchProcess(processId);
				return { success: true };
		} catch (error) {
			set({ error: error.message, isLoading: false });
			return { success: false, error: error.message };
		}
	},

	// Atualizar andamento de um processo
	updateTimeline: async (processId, timelineId, timelineData) => {
		set({ isLoading: true, error: null });
		try {
			const response = await api.put(`/processes/${processId}/timeline/${timelineId}`, timelineData);
			await get().fetchProcess(processId);
			return { success: true, timeline: response.timeline };
		} catch (error) {
			set({ error: error.message, isLoading: false });
			return { success: false, error: error.message };
		}
	},

	// Stats (admin)
	getStats: async () => {
		try {
			const stats = await api.get('/processes/stats');
			return stats;
		} catch (error) {
		return {
				totalProcesses: 0,
				activeProcesses: 0,
				completedProcesses: 0,
		};
		}
	},
}));
