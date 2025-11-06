"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { useProcessStore } from "@/store/process-store";
import { useClientStore } from "@/store/client-store";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, FileText, Calendar, User, Edit, Clock, Trash2, Filter, X, Eye } from "lucide-react";
import FileUpload from "@/components/ui/file-upload";
import EmptyState from "@/components/ui/empty-state";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import ProcessViewDialog from "@/components/process/ProcessViewDialog";

const ProcessosPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { isAdmin, user } = useAuthStore();
	const {
		processes,
		fetchAllProcesses,
		createProcess,
		updateProcess,
		deleteProcess,
		addTimeline,
		updateTimeline,
		deleteTimeline,
		isLoading,
	} = useProcessStore();
	const { clients, fetchClients } = useClientStore();

	// Estados para Dialog de Novo Processo
	const [openNewProcess, setOpenNewProcess] = useState(false);
	const [newProcessForm, setNewProcessForm] = useState({
		clientId: "",
		processNumber: "",
		actionType: "",
		court: "",
		plaintiff: "",
		defendant: "",
		filingDate: "",
		caseValue: "",
		subject: "",
		description: "",
		status: "Distribuído",
		tags: [],
		priority: "media",
	});

	// Estados para Filtros e Ordenação
	const [filters, setFilters] = useState({
		status: [],
		priority: [],
		tags: [],
		clientId: "",
	});
	const [sortBy, setSortBy] = useState("recent"); // "recent", "oldest", "az", "za", "priority"

	// Estados para Dialog de Visualizar Processo
	const [openViewProcess, setOpenViewProcess] = useState(false);
	const [viewProcess, setViewProcess] = useState(null);
	const [hasProcessedQueryParams, setHasProcessedQueryParams] = useState(false);

	// Estados para Dialog de Gerenciar Processo
	const [openManageProcess, setOpenManageProcess] = useState(false);
	const [selectedProcess, setSelectedProcess] = useState(null);
	const [manageMode, setManageMode] = useState("edit"); // "edit" ou "timeline"
	const [editForm, setEditForm] = useState({
		processNumber: "",
		actionType: "",
		court: "",
		plaintiff: "",
		defendant: "",
		filingDate: "",
		caseValue: "",
		subject: "",
		description: "",
		status: "",
		tags: [],
		priority: "media",
	});
	const [timelineForm, setTimelineForm] = useState({
		title: "",
		text: "",
		type: "official",
		date: new Date().toISOString().split("T")[0],
		createdBy: "Administrador",
		attachments: [],
	});

	// Estados para Edição de Andamento
	const [openEditTimeline, setOpenEditTimeline] = useState(false);
	const [editingTimeline, setEditingTimeline] = useState(null);
	const [editTimelineForm, setEditTimelineForm] = useState({
		title: "",
		text: "",
		type: "official",
		date: "",
		createdBy: "",
	});

	// Estados para Confirmação
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [timelineToDelete, setTimelineToDelete] = useState(null);
	const [confirmDeleteProcess, setConfirmDeleteProcess] = useState(false);
	const [processToDelete, setProcessToDelete] = useState(null);

	// Tags predefinidas
	const availableTags = [
		"Trabalhista",
		"Cível",
		"Criminal",
		"Família",
		"Tributário",
		"Previdenciário",
		"Empresarial",
	];

	// Filtrar e ordenar processos
	const filteredAndSortedProcesses = React.useMemo(() => {
		let result = [...processes];

		// Aplicar filtros
		if (filters.status.length > 0) {
			result = result.filter((p) => filters.status.includes(p.status));
		}
		if (filters.priority.length > 0) {
			result = result.filter((p) => filters.priority.includes(p.priority));
		}
		if (filters.tags.length > 0) {
			result = result.filter((p) => p.tags?.some((tag) => filters.tags.includes(tag)));
		}
		if (filters.clientId) {
			result = result.filter((p) => {
				const pClientId = p.clientId?._id || p.clientId;
				return pClientId === filters.clientId || pClientId?.toString() === filters.clientId;
			});
		}

		// Aplicar ordenação
		switch (sortBy) {
			case "oldest":
				result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
				break;
			case "az":
				result.sort((a, b) => a.actionType.localeCompare(b.actionType));
				break;
			case "za":
				result.sort((a, b) => b.actionType.localeCompare(a.actionType));
				break;
			case "priority":
				const priorityOrder = { urgente: 0, alta: 1, media: 2, baixa: 3 };
				result.sort((a, b) => priorityOrder[a.priority || "media"] - priorityOrder[b.priority || "media"]);
				break;
			case "recent":
			default:
				result.sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate));
				break;
		}

		return result;
	}, [processes, filters, sortBy]);

	const clearFilters = () => {
		setFilters({
			status: [],
			priority: [],
			tags: [],
			clientId: "",
		});
		setSortBy("recent");
	};

	const hasActiveFilters =
		filters.status.length > 0 ||
		filters.priority.length > 0 ||
		filters.tags.length > 0 ||
		filters.clientId ||
		sortBy !== "recent";

	// Helper para cor de prioridade
	const getPriorityColor = (priority) => {
		switch (priority) {
			case "urgente":
				return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-300";
			case "alta":
				return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-300";
			case "media":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300";
			case "baixa":
				return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-gray-300";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-gray-300";
		}
	};

	// Helper para cor de tag
	const getTagColor = (tag) => {
		const colors = {
			Trabalhista: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
			Cível: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
			Criminal: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
			Família: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
			Tributário: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
			Previdenciário: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
			Empresarial: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
		};
		return colors[tag] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
	};

	// Templates de andamentos comuns
	const timelineTemplates = [
		{
			title: "Processo Distribuído",
			text: "Processo foi distribuído para [Vara/Juízo]. Aguardando análise da petição inicial.",
		},
		{
			title: "Petição Inicial Recebida",
			text: "A petição inicial foi recebida e deferida pelo juízo. Determinada a citação da parte ré para apresentar contestação no prazo legal de 15 dias.",
		},
		{
			title: "Contestação Apresentada",
			text: "A parte ré apresentou contestação refutando os fatos alegados na inicial.",
		},
		{
			title: "Réplica Apresentada",
			text: "Foi apresentada réplica à contestação, reiterando os pedidos iniciais e rebatendo os argumentos da defesa.",
		},
		{
			title: "Audiência de Conciliação Designada",
			text: "Foi designada audiência de conciliação para o dia [DATA] às [HORA].",
		},
		{
			title: "Audiência Realizada",
			text: "Audiência realizada. As partes não chegaram a um acordo. O processo seguirá para a fase de instrução.",
		},
		{
			title: "Perícia Deferida",
			text: "O juízo deferiu a realização de perícia. O perito nomeado entrará em contato para agendar.",
		},
		{
			title: "Sentença Publicada",
			text: "Sentença publicada [FAVORÁVEL/DESFAVORÁVEL]. Análise detalhada em anexo.",
		},
		{
			title: "Recurso Interposto",
			text: "Foi interposto recurso de [TIPO] contra a decisão. Aguardando análise do tribunal.",
		},
		{ title: "Juntada de Documentos", text: "Foram juntados aos autos os documentos solicitados." },
	];

	useEffect(() => {
		if (user && isAdmin()) {
			fetchAllProcesses();
			fetchClients();
		}
	}, [user, isAdmin, fetchAllProcesses, fetchClients]);

	// Abrir dialogs automaticamente baseado nos query parameters
	useEffect(() => {
		if (!processes.length || !searchParams || hasProcessedQueryParams) return;

		const viewProcessId = searchParams.get("view");
		const editProcessId = searchParams.get("edit");

		if (viewProcessId) {
			const process = processes.find(p => {
				const pId = p._id || p.id;
				return pId?.toString() === viewProcessId || pId === viewProcessId;
			});
			if (process) {
				setViewProcess(process);
				setOpenViewProcess(true);
				setHasProcessedQueryParams(true);
				// Limpar query parameter após um pequeno delay para garantir que o dialog abriu
				setTimeout(() => {
					router.replace("/admin/dashboard/processos", { scroll: false });
				}, 300);
				return;
			}
		}

		if (editProcessId) {
			const process = processes.find(p => {
				const pId = p._id || p.id;
				return pId?.toString() === editProcessId || pId === editProcessId;
			});
			if (process) {
				setSelectedProcess(process);
				setEditForm({
					processNumber: process.processNumber,
					actionType: process.actionType,
					court: process.court,
					plaintiff: process.plaintiff,
					defendant: process.defendant,
					filingDate: process.filingDate,
					caseValue: process.caseValue,
					subject: process.subject,
					description: process.description,
					status: process.status,
					tags: process.tags || [],
					priority: process.priority || "media",
				});
				setTimelineForm({
					title: "",
					text: "",
					type: "official",
					date: new Date().toISOString().split("T")[0],
					createdBy: "Administrador",
					attachments: [],
				});
				setManageMode("edit");
				setOpenManageProcess(true);
				setHasProcessedQueryParams(true);
				// Limpar query parameter após um pequeno delay para garantir que o dialog abriu
				setTimeout(() => {
					router.replace("/admin/dashboard/processos", { scroll: false });
				}, 300);
			}
		}
	}, [searchParams, processes, router, hasProcessedQueryParams]);

	// Resetar flag quando não há query parameters
	useEffect(() => {
		if (searchParams && !searchParams.get("view") && !searchParams.get("edit")) {
			setHasProcessedQueryParams(false);
		}
	}, [searchParams]);

	// Handlers para Novo Processo
	const handleNewProcessSubmit = async (e) => {
		e.preventDefault();

		const client = clients.find((c) => {
			const cId = c._id || c.id;
			return cId?.toString() === newProcessForm.clientId || cId === newProcessForm.clientId;
		});
		if (!client) {
			toast.error("Selecione um cliente válido");
			return;
		}

		toast.loading("Criando processo...");
		const clientId = client._id || client.id;
		const result = await createProcess({
			...newProcessForm,
			clientId: clientId,
		});

		toast.dismiss();
		if (result.success) {
			toast.success("Processo criado com sucesso!");
			setOpenNewProcess(false);
			setNewProcessForm({
				clientId: "",
				processNumber: "",
				actionType: "",
				court: "",
				plaintiff: "",
				defendant: "",
				filingDate: "",
				caseValue: "",
				subject: "",
				description: "",
				status: "Distribuído",
				tags: [],
				priority: "media",
			});
			await fetchAllProcesses();
		} else {
			toast.error("Erro ao criar processo. Tente novamente.");
		}
	};

	// Handlers para Visualizar Processo
	const handleOpenView = (process) => {
		if (!process) return;
		setViewProcess(process);
		setOpenViewProcess(true);
	};

	const handleCloseViewDialog = (open) => {
		setOpenViewProcess(open);
		if (!open) {
			setViewProcess(null);
		}
	};

	const handleEditFromView = () => {
		if (!viewProcess) return;
		setOpenViewProcess(false);
		handleOpenManage(viewProcess);
	};

	// Handlers para Gerenciar Processo
	const handleOpenManage = (process) => {
		setSelectedProcess(process);
		setEditForm({
			processNumber: process.processNumber,
			actionType: process.actionType,
			court: process.court,
			plaintiff: process.plaintiff,
			defendant: process.defendant,
			filingDate: process.filingDate,
			caseValue: process.caseValue,
			subject: process.subject,
			description: process.description,
			status: process.status,
			tags: process.tags || [],
			priority: process.priority || "media",
		});
		setTimelineForm({
			title: "",
			text: "",
			type: "official",
			date: new Date().toISOString().split("T")[0],
			createdBy: "Administrador",
			attachments: [],
		});
		setManageMode("edit");
		setOpenManageProcess(true);
	};

	const handleUpdateProcess = async (e) => {
		e.preventDefault();
		if (!selectedProcess) return;

		toast.loading("Salvando alterações...");
		const result = await updateProcess(selectedProcess.id, editForm);
		toast.dismiss();

		if (result.success) {
			toast.success("Processo atualizado com sucesso!");
			setOpenManageProcess(false);
			await fetchAllProcesses();
		} else {
			toast.error("Erro ao atualizar processo. Tente novamente.");
		}
	};

	const handleAddTimeline = async (e) => {
		e.preventDefault();
		if (!selectedProcess) return;

		toast.loading("Adicionando andamento...");
		const result = await addTimeline(selectedProcess.id, timelineForm);
		toast.dismiss();

		if (result.success) {
			toast.success("Andamento adicionado com sucesso!");
			setTimelineForm({
				title: "",
				text: "",
				type: "official",
				date: new Date().toISOString().split("T")[0],
				createdBy: "Administrador",
				attachments: [],
			});
			// Atualizar o processo selecionado com o novo timeline
			const updatedProcess = processes.find((p) => p.id === selectedProcess.id);
			if (updatedProcess) {
				setSelectedProcess(updatedProcess);
			}
		} else {
			toast.error("Erro ao adicionar andamento. Tente novamente.");
		}
	};

	const handleEditTimelineOpen = (timeline) => {
		setEditingTimeline(timeline);
		setEditTimelineForm({
			title: timeline.title,
			text: timeline.text,
			type: timeline.type,
			date: timeline.date,
			createdBy: timeline.createdBy,
		});
		setOpenEditTimeline(true);
	};

	const handleUpdateTimeline = async (e) => {
		e.preventDefault();
		if (!selectedProcess || !editingTimeline) return;

		toast.loading("Salvando alterações...");
		const result = await updateTimeline(selectedProcess.id, editingTimeline.id, editTimelineForm);
		toast.dismiss();

		if (result.success) {
			toast.success("Andamento atualizado com sucesso!");
			setOpenEditTimeline(false);
			// Atualizar o processo selecionado
			const updatedProcess = processes.find((p) => p.id === selectedProcess.id);
			if (updatedProcess) {
				setSelectedProcess(updatedProcess);
			}
		} else {
			toast.error("Erro ao atualizar andamento. Tente novamente.");
		}
	};

	const handleDeleteTimelineConfirm = (timeline) => {
		setTimelineToDelete(timeline);
		setConfirmDelete(true);
	};

	const handleDeleteTimeline = async () => {
		if (!selectedProcess || !timelineToDelete) return;

		toast.loading("Deletando andamento...");
		const result = await deleteTimeline(selectedProcess.id, timelineToDelete.id);
		toast.dismiss();

		if (result.success) {
			toast.success("Andamento deletado com sucesso!");
			// Atualizar o processo selecionado
			const updatedProcess = processes.find((p) => p.id === selectedProcess.id);
			if (updatedProcess) {
				setSelectedProcess(updatedProcess);
			}
			setTimelineToDelete(null);
		} else {
			toast.error("Erro ao deletar andamento. Tente novamente.");
		}
	};

	const handleDeleteProcessConfirm = (process) => {
		setProcessToDelete(process);
		setConfirmDeleteProcess(true);
	};

	const handleDeleteProcess = async () => {
		if (!processToDelete) return;

		toast.loading("Deletando processo...");
		const processId = processToDelete._id || processToDelete.id;
		const result = await deleteProcess(processId);
		toast.dismiss();

		if (result.success) {
			toast.success("Processo deletado com sucesso!");
			setConfirmDeleteProcess(false);
			setProcessToDelete(null);
			await fetchAllProcesses();
		} else {
			toast.error(result.error || "Erro ao deletar processo. Tente novamente.");
		}
	};

	if (isLoading && processes.length === 0) {
		return <EmptyState icon={Clock} title="Carregando..." description="Aguarde enquanto carregamos os processos" />;
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between border-b pb-4">
				<div className="flex-1">
					<h1 className="text-2xl font-bold">Gerenciar Processos</h1>
					<p className="text-sm text-muted-foreground">
						Cadastre, edite e acompanhe todos os processos judiciais do escritório
					</p>
				</div>

				{/* Dialog de Novo Processo */}
				<Dialog open={openNewProcess} onOpenChange={setOpenNewProcess}>
					<DialogTrigger asChild>
						<Button>
							<Plus className="h-4 w-4" />
							Novo Processo
						</Button>
					</DialogTrigger>
					<DialogContent className="!max-w-5xl max-h-[95vh]">
						<DialogHeader>
							<DialogTitle>Cadastrar Novo Processo</DialogTitle>
							<DialogDescription>
								Preencha as informações abaixo. Campos marcados com * são obrigatórios.
							</DialogDescription>
						</DialogHeader>
						<ScrollArea className="max-h-[calc(70vh)] pr-4">
							<form onSubmit={handleNewProcessSubmit}>
								<div className="grid gap-4 py-4">
									{/* Cliente */}
									<div className="grid gap-2">
										<Label htmlFor="client">Cliente *</Label>
										<Select
											value={newProcessForm.clientId}
											onValueChange={(value) =>
												setNewProcessForm({ ...newProcessForm, clientId: value })
											}
											required
										>
											<SelectTrigger>
												<SelectValue placeholder="Selecione o cliente" />
											</SelectTrigger>
											<SelectContent>
												{clients.length === 0 ? (
													<div className="p-2 text-sm text-muted-foreground">
														Nenhum cliente cadastrado
													</div>
												) : (
													clients.map((client) => {
														const clientId = client._id || client.id;
														return (
														<SelectItem key={clientId} value={clientId.toString()}>
															{client.name} - {client.cpf}
														</SelectItem>
														);
													})
												)}
											</SelectContent>
										</Select>
										{clients.length === 0 && (
											<p className="text-xs text-orange-600">
												⚠️ Cadastre um cliente antes de criar um processo
											</p>
										)}
									</div>

									{/* Número do Processo */}
									<div className="grid gap-2">
										<Label htmlFor="processNumber">Número do Processo *</Label>
										<Input
											id="processNumber"
											placeholder="0000000-00.0000.0.00.0000"
											value={newProcessForm.processNumber}
											onChange={(e) =>
												setNewProcessForm({
													...newProcessForm,
													processNumber: e.target.value,
												})
											}
											required
										/>
									</div>

									{/* Tipo de Ação */}
									<div className="grid gap-2">
										<Label htmlFor="actionType">Tipo de Ação *</Label>
										<Input
											id="actionType"
											placeholder="Ex: Ação de Indenização por Danos Morais"
											value={newProcessForm.actionType}
											onChange={(e) =>
												setNewProcessForm({ ...newProcessForm, actionType: e.target.value })
											}
											required
										/>
									</div>

									{/* Juízo/Foro */}
									<div className="grid gap-2">
										<Label htmlFor="court">Juízo/Foro *</Label>
										<Input
											id="court"
											placeholder="Ex: 1ª Vara Cível da Comarca de São Paulo"
											value={newProcessForm.court}
											onChange={(e) =>
												setNewProcessForm({ ...newProcessForm, court: e.target.value })
											}
											required
										/>
									</div>

									{/* Autor e Réu em Grid de 2 colunas */}
									<div className="grid grid-cols-2 gap-4">
										<div className="grid gap-2">
											<Label htmlFor="plaintiff">Autor *</Label>
											<Input
												id="plaintiff"
												placeholder="Nome do autor"
												value={newProcessForm.plaintiff}
												onChange={(e) =>
													setNewProcessForm({ ...newProcessForm, plaintiff: e.target.value })
												}
												required
											/>
										</div>

										<div className="grid gap-2">
											<Label htmlFor="defendant">Réu (Parte Contrária) *</Label>
											<Input
												id="defendant"
												placeholder="Nome do réu"
												value={newProcessForm.defendant}
												onChange={(e) =>
													setNewProcessForm({ ...newProcessForm, defendant: e.target.value })
												}
												required
											/>
										</div>
									</div>

									{/* Data do Ajuizamento e Valor da Causa em Grid de 2 colunas */}
									<div className="grid grid-cols-2 gap-4">
										<div className="grid gap-2">
											<Label htmlFor="filingDate">Data do Ajuizamento *</Label>
											<Input
												id="filingDate"
												type="date"
												value={newProcessForm.filingDate}
												onChange={(e) =>
													setNewProcessForm({ ...newProcessForm, filingDate: e.target.value })
												}
												required
											/>
										</div>

										<div className="grid gap-2">
											<Label htmlFor="caseValue">Valor da Causa *</Label>
											<Input
												id="caseValue"
												placeholder="Ex: R$ 50.000,00"
												value={newProcessForm.caseValue}
												onChange={(e) =>
													setNewProcessForm({ ...newProcessForm, caseValue: e.target.value })
												}
												required
											/>
										</div>
									</div>

									{/* Assunto */}
									<div className="grid gap-2">
										<Label htmlFor="subject">Assunto Principal do Processo *</Label>
										<Input
											id="subject"
											placeholder="Ex: Danos morais decorrentes de acidente de trânsito"
											value={newProcessForm.subject}
											onChange={(e) =>
												setNewProcessForm({ ...newProcessForm, subject: e.target.value })
											}
											required
										/>
									</div>

									{/* Descrição */}
									<div className="grid gap-2">
										<Label htmlFor="description">Descrição Detalhada *</Label>
										<Textarea
											id="description"
											placeholder="Descreva detalhadamente o processo: contexto, pedidos principais, situação atual..."
											value={newProcessForm.description}
											onChange={(e) =>
												setNewProcessForm({
													...newProcessForm,
													description: e.target.value,
												})
											}
											rows={4}
											required
										/>
										<p className="text-xs text-muted-foreground">
											{newProcessForm.description.length} caracteres
										</p>
									</div>

									<div className="grid grid-cols-3 w-full gap-4">
										{/* Status do Processo */}
										<div className="flex flex-col gap-2">
											<Label htmlFor="status">Status do Processo *</Label>
											<Select
												value={newProcessForm.status}
												onValueChange={(value) =>
													setNewProcessForm({ ...newProcessForm, status: value })
												}
											>
												<SelectTrigger className="w-full">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Distribuído">Distribuído</SelectItem>
													<SelectItem value="Aguardando análise inicial">
														Aguardando análise inicial
													</SelectItem>
													<SelectItem value="Citação pendente">Citação pendente</SelectItem>
													<SelectItem value="Aguardando contestação">
														Aguardando contestação
													</SelectItem>
													<SelectItem value="Em fase de instrução">
														Em fase de instrução
													</SelectItem>
													<SelectItem value="Aguardando perícia">
														Aguardando perícia
													</SelectItem>
													<SelectItem value="Perícia em andamento">
														Perícia em andamento
													</SelectItem>
													<SelectItem value="Audiência designada">
														Audiência designada
													</SelectItem>
													<SelectItem value="Aguardando documentação">
														Aguardando documentação
													</SelectItem>
													<SelectItem value="Concluso para sentença">
														Concluso para sentença
													</SelectItem>
													<SelectItem value="Sentença proferida">
														Sentença proferida
													</SelectItem>
													<SelectItem value="Em fase de recurso">
														Em fase de recurso
													</SelectItem>
													<SelectItem value="Aguardando trânsito em julgado">
														Aguardando trânsito em julgado
													</SelectItem>
													<SelectItem value="Em fase de cumprimento">
														Em fase de cumprimento
													</SelectItem>
													<SelectItem value="Arquivado">Arquivado</SelectItem>
													<SelectItem value="Concluído">Concluído</SelectItem>
												</SelectContent>
											</Select>
											<p className="text-xs text-muted-foreground">
												Selecione o estágio atual do processo no sistema judiciário
											</p>
										</div>
										<div className="flex flex-col gap-2">
											<Label htmlFor="priority">Prioridade *</Label>
											<Select
												value={newProcessForm.priority}
												onValueChange={(value) =>
													setNewProcessForm({ ...newProcessForm, priority: value })
												}
											>
												<SelectTrigger className="w-full">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="urgente">
														<div className="flex items-center gap-2">
															<div className="w-2 h-2 rounded-full bg-red-500"></div>
															<span>Urgente</span>
														</div>
													</SelectItem>
													<SelectItem value="alta">
														<div className="flex items-center gap-2">
															<div className="w-2 h-2 rounded-full bg-orange-500"></div>
															<span>Alta</span>
														</div>
													</SelectItem>
													<SelectItem value="media">
														<div className="flex items-center gap-2">
															<div className="w-2 h-2 rounded-full bg-blue-500"></div>
															<span>Média</span>
														</div>
													</SelectItem>
													<SelectItem value="baixa">
														<div className="flex items-center gap-2">
															<div className="w-2 h-2 rounded-full bg-gray-400"></div>
															<span>Baixa</span>
														</div>
													</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div className="flex flex-col gap-2">
											<Label htmlFor="tags">Área Jurídica *</Label>
											<Select
												value={newProcessForm.tags[0] || ""}
												onValueChange={(value) => {
													if (value) {
														setNewProcessForm({ ...newProcessForm, tags: [value] });
													}
												}}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Selecione a área" />
												</SelectTrigger>
												<SelectContent>
													{availableTags.map((tag) => (
														<SelectItem key={tag} value={tag}>
															{tag}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<p className="text-xs text-muted-foreground">
												Escolha a área principal do processo
											</p>
										</div>
									</div>
								</div>
								<DialogFooter>
									<Button type="button" variant="outline" onClick={() => setOpenNewProcess(false)}>
										Cancelar
									</Button>
									<Button type="submit" disabled={isLoading}>
										{isLoading ? "Salvando..." : "Cadastrar Processo"}
									</Button>
								</DialogFooter>
							</form>
						</ScrollArea>
					</DialogContent>
				</Dialog>
			</div>

			{/* Barra de Filtros e Ordenação */}
			<Card className="border-2">
				<CardContent className="pt-0">
					<div className="space-y-4">
						<div className="flex items-center gap-2 mb-3">
							<div className="p-2 bg-primary/10 rounded-md">
								<Filter className="h-4 w-4 text-primary" />
							</div>
							<div className="flex-1">
								<h3 className="font-semibold">Filtros e Ordenação</h3>
								<p className="text-xs text-muted-foreground">
									Use os filtros abaixo para encontrar processos específicos
								</p>
							</div>
							<Badge variant="secondary" className="ml-auto text-sm px-3 py-1">
								{filteredAndSortedProcesses.length} de {processes.length}
							</Badge>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
							{/* Filtro de Status */}
							<div className="space-y-1">
								<Label className="text-xs">Status</Label>
								<div className="relative">
									<Select
										value={filters.status[0] || "todos"}
										onValueChange={(value) => {
											if (value === "todos") {
												setFilters({ ...filters, status: [] });
											} else {
												setFilters({ ...filters, status: [value] });
											}
										}}
									>
										<SelectTrigger className="w-full">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="todos">
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 rounded-full bg-gray-400"></div>
													<span>Todos os Status</span>
												</div>
											</SelectItem>
											<SelectItem value="Distribuído">Distribuído</SelectItem>
											<SelectItem value="Aguardando análise inicial">
												Aguardando análise
											</SelectItem>
											<SelectItem value="Citação pendente">Citação pendente</SelectItem>
											<SelectItem value="Em fase de instrução">Em instrução</SelectItem>
											<SelectItem value="Aguardando perícia">Aguardando perícia</SelectItem>
											<SelectItem value="Audiência designada">Audiência designada</SelectItem>
											<SelectItem value="Aguardando documentação">Aguardando doc</SelectItem>
											<SelectItem value="Concluso para sentença">Concluso</SelectItem>
											<SelectItem value="Sentença proferida">Sentença</SelectItem>
											<SelectItem value="Em fase de recurso">Em recurso</SelectItem>
											<SelectItem value="Em fase de cumprimento">Cumprimento</SelectItem>
											<SelectItem value="Arquivado">Arquivado</SelectItem>
											<SelectItem value="Concluído">Concluído</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							{/* Filtro de Prioridade */}
							<div className="space-y-1">
								<Label className="text-xs">Prioridade</Label>
								<div className="relative">
									<Select
										value={filters.priority[0] || "todas"}
										onValueChange={(value) => {
											if (value === "todas") {
												setFilters({ ...filters, priority: [] });
											} else {
												setFilters({ ...filters, priority: [value] });
											}
										}}
									>
										<SelectTrigger className="w-full">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="todas">
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 rounded-full bg-gray-400"></div>
													<span>Todas Prioridades</span>
												</div>
											</SelectItem>
											<SelectItem value="urgente">
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 rounded-full bg-red-500"></div>
													<span>Urgente</span>
												</div>
											</SelectItem>
											<SelectItem value="alta">
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 rounded-full bg-orange-500"></div>
													<span>Alta</span>
												</div>
											</SelectItem>
											<SelectItem value="media">
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 rounded-full bg-blue-500"></div>
													<span>Média</span>
												</div>
											</SelectItem>
											<SelectItem value="baixa">
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 rounded-full bg-gray-400"></div>
													<span>Baixa</span>
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							{/* Filtro de Tags */}
							<div className="space-y-1">
								<Label className="text-xs">Área Jurídica</Label>
								<div className="relative">
									<Select
										value={filters.tags[0] || "todas"}
										onValueChange={(value) => {
											if (value === "todas") {
												setFilters({ ...filters, tags: [] });
											} else {
												setFilters({ ...filters, tags: [value] });
											}
										}}
									>
										<SelectTrigger className="w-full">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="todas">
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 rounded-full bg-gray-400"></div>
													<span>Todas as Áreas</span>
												</div>
											</SelectItem>
											{availableTags.map((tag) => (
												<SelectItem key={tag} value={tag}>
													{tag}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>

							{/* Filtro de Cliente */}
							<div className="space-y-1">
								<Label className="text-xs">Cliente</Label>
								<div className="relative">
									<Select
										value={filters.clientId || "todos"}
										onValueChange={(value) => {
											if (value === "todos") {
												setFilters({ ...filters, clientId: "" });
											} else {
												setFilters({ ...filters, clientId: value });
											}
										}}
									>
										<SelectTrigger className="w-full">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="todos">
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 rounded-full bg-gray-400"></div>
													<span>Todos os Clientes</span>
												</div>
											</SelectItem>
											{clients.map((client) => {
												const clientId = client._id || client.id;
												return (
												<SelectItem key={clientId} value={clientId.toString()}>
													{client.name}
												</SelectItem>
												);
											})}
										</SelectContent>
									</Select>
								</div>
							</div>

							{/* Ordenação */}
							<div className="space-y-1">
								<Label className="text-xs">Ordenar por</Label>
								<Select value={sortBy} onValueChange={setSortBy}>
									<SelectTrigger className="w-full">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="recent">Mais recentes</SelectItem>
										<SelectItem value="oldest">Mais antigos</SelectItem>
										<SelectItem value="az">A-Z</SelectItem>
										<SelectItem value="za">Z-A</SelectItem>
										<SelectItem value="priority">Prioridade</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* Botão Limpar Filtros */}
						{hasActiveFilters && (
							<div className="flex items-center gap-2">
								<Button variant="outline" size="sm" onClick={clearFilters}>
									<X className="h-3 w-3 mr-1" />
									Limpar Todos os Filtros
								</Button>
								<span className="text-xs text-muted-foreground">
									{filters.status.length +
										filters.priority.length +
										filters.tags.length +
										(filters.clientId ? 1 : 0)}{" "}
									filtro(s) ativo(s)
								</span>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-4">
				{filteredAndSortedProcesses.length === 0 ? (
					<Card>
						<CardContent>
							<EmptyState
								icon={FileText}
								title={
									processes.length === 0 ? "Nenhum processo cadastrado" : "Nenhum processo encontrado"
								}
								description={
									processes.length === 0
										? "Comece cadastrando o primeiro processo do sistema"
										: "Tente ajustar os filtros para encontrar processos"
								}
								action={processes.length === 0 ? () => setOpenNewProcess(true) : clearFilters}
								actionLabel={processes.length === 0 ? "Cadastrar Primeiro Processo" : "Limpar Filtros"}
							/>
						</CardContent>
					</Card>
				) : (
					filteredAndSortedProcesses.map((process) => {
						const processId = process._id || process.id;
						return (
						<Card key={processId} className="hover:shadow-md transition-shadow">
							<CardHeader>
								<div className="flex items-start justify-between gap-4">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-2">
											<CardTitle className="text-lg">{process.actionType}</CardTitle>
										</div>

										{/* Tags e Prioridade */}
										<div className="flex flex-wrap items-center gap-2 mb-3">
											{process.priority && (
												<Badge
													variant="outline"
													className={`${getPriorityColor(
														process.priority
													)} text-xs font-semibold border flex items-center gap-1.5`}
												>
													<div className={`w-2 h-2 rounded-full ${
														process.priority === "urgente" ? "bg-red-500" :
														process.priority === "alta" ? "bg-orange-500" :
														process.priority === "media" ? "bg-blue-500" :
														"bg-gray-400"
													}`}></div>
													<span className="uppercase">{process.priority}</span>
												</Badge>
											)}
											{process.tags &&
												process.tags.map((tag, idx) => (
													<Badge
														key={idx}
														variant="secondary"
														className={`${getTagColor(tag)} text-xs`}
													>
														{tag}
													</Badge>
												))}
										</div>
										<CardDescription className="mb-3 line-clamp-2">
											{process.subject}
										</CardDescription>

										<div className="grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm mb-3">
											<div className="flex items-center gap-2 text-muted-foreground">
												<FileText className="h-4 w-4 flex-shrink-0" />
												<span className="truncate">{process.processNumber}</span>
											</div>
											<div className="flex items-center gap-2 text-muted-foreground">
												<User className="h-4 w-4 flex-shrink-0" />
												<span className="truncate">{process.clientName}</span>
											</div>
											<div className="flex items-center gap-2 text-muted-foreground">
												<Clock className="h-4 w-4 flex-shrink-0" />
												<span>{process.timeline?.length || 0} andamentos</span>
											</div>
										</div>

										<div className="flex items-center gap-2 text-xs text-muted-foreground">
											<Calendar className="h-3.5 w-3.5" />
											<span>
												Atualizado: {new Date(process.lastUpdate).toLocaleDateString("pt-BR")}
											</span>
										</div>
									</div>
									<div className="flex flex-col items-end gap-2">
										<Badge
											variant="outline"
											className={`text-xs px-3 py-1.5 font-semibold whitespace-nowrap ${
												process.status === "Concluído" || process.status === "Arquivado"
													? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300"
													: process.status === "Sentença proferida" ||
													  process.status === "Concluso para sentença"
													? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 border-indigo-300"
													: process.status === "Em fase de recurso" ||
													  process.status === "Aguardando trânsito em julgado"
													? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300"
													: process.status === "Aguardando documentação"
													? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-300"
													: process.status === "Audiência designada"
													? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-300"
													: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300"
											}`}
										>
											{process.status}
										</Badge>
										<div className="flex gap-2">
											<Button size="sm" variant="outline" onClick={() => handleOpenView(process)}>
												<Eye className="h-4 w-4 mr-1" />
												Visualizar
											</Button>
											<Button size="sm" variant="outline" onClick={() => handleOpenManage(process)}>
												<Edit className="h-4 w-4 mr-1" />
												Gerenciar
											</Button>
											<Button 
												size="sm" 
												variant="outline" 
												onClick={() => handleDeleteProcessConfirm(process)}
												className="text-destructive hover:text-destructive"
											>
												<Trash2 className="h-4 w-4 mr-1" />
												Excluir
											</Button>
										</div>
									</div>
								</div>
							</CardHeader>
						</Card>
						);
					})
				)}
			</div>

			{/* Dialog de Gerenciar Processo */}
			<Dialog open={openManageProcess} onOpenChange={setOpenManageProcess}>
				<DialogContent className="!max-w-4xl max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Gerenciar Processo</DialogTitle>
						<DialogDescription>
							{selectedProcess?.processNumber} - {selectedProcess?.clientName}
						</DialogDescription>
					</DialogHeader>

					{/* Tabs de Modo */}
					<div className="flex gap-2 border-b pb-2">
						<Button
							variant={manageMode === "edit" ? "default" : "ghost"}
							size="sm"
							onClick={() => setManageMode("edit")}
						>
							<Edit className="h-4 w-4 mr-1" />
							Editar Dados
						</Button>
						<Button
							variant={manageMode === "timeline" ? "default" : "ghost"}
							size="sm"
							onClick={() => setManageMode("timeline")}
						>
							<Clock className="h-4 w-4 mr-1" />
							Adicionar Andamento
						</Button>
					</div>

					<ScrollArea className="max-h-[60vh] pr-4">
						{manageMode === "edit" ? (
							<form onSubmit={handleUpdateProcess}>
								<div className="grid gap-4 py-4">
									{/* Número do Processo */}
									<div className="grid gap-2">
										<Label htmlFor="edit-processNumber">Número do Processo *</Label>
										<Input
											id="edit-processNumber"
											value={editForm.processNumber}
											onChange={(e) =>
												setEditForm({ ...editForm, processNumber: e.target.value })
											}
											required
										/>
									</div>

									{/* Tipo de Ação */}
									<div className="grid gap-2">
										<Label htmlFor="edit-actionType">Tipo de Ação *</Label>
										<Input
											id="edit-actionType"
											value={editForm.actionType}
											onChange={(e) => setEditForm({ ...editForm, actionType: e.target.value })}
											required
										/>
									</div>

									{/* Juízo/Foro */}
									<div className="grid gap-2">
										<Label htmlFor="edit-court">Juízo/Foro *</Label>
										<Input
											id="edit-court"
											value={editForm.court}
											onChange={(e) => setEditForm({ ...editForm, court: e.target.value })}
											required
										/>
									</div>

									{/* Autor e Réu */}
									<div className="grid grid-cols-2 gap-4">
										<div className="grid gap-2">
											<Label htmlFor="edit-plaintiff">Autor *</Label>
											<Input
												id="edit-plaintiff"
												value={editForm.plaintiff}
												onChange={(e) =>
													setEditForm({ ...editForm, plaintiff: e.target.value })
												}
												required
											/>
										</div>

										<div className="grid gap-2">
											<Label htmlFor="edit-defendant">Réu *</Label>
											<Input
												id="edit-defendant"
												value={editForm.defendant}
												onChange={(e) =>
													setEditForm({ ...editForm, defendant: e.target.value })
												}
												required
											/>
										</div>
									</div>

									{/* Data e Valor */}
									<div className="grid grid-cols-2 gap-4">
										<div className="grid gap-2">
											<Label htmlFor="edit-filingDate">Data do Ajuizamento *</Label>
											<Input
												id="edit-filingDate"
												type="date"
												value={editForm.filingDate}
												onChange={(e) =>
													setEditForm({ ...editForm, filingDate: e.target.value })
												}
												required
											/>
										</div>

										<div className="grid gap-2">
											<Label htmlFor="edit-caseValue">Valor da Causa *</Label>
											<Input
												id="edit-caseValue"
												value={editForm.caseValue}
												onChange={(e) =>
													setEditForm({ ...editForm, caseValue: e.target.value })
												}
												required
											/>
										</div>
									</div>

									{/* Assunto */}
									<div className="grid gap-2">
										<Label htmlFor="edit-subject">Assunto Principal *</Label>
										<Input
											id="edit-subject"
											value={editForm.subject}
											onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
											required
										/>
									</div>

									{/* Descrição */}
									<div className="grid gap-2">
										<Label htmlFor="edit-description">Descrição *</Label>
										<Textarea
											id="edit-description"
											value={editForm.description}
											onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
											rows={3}
											required
										/>
									</div>

									<div className="grid grid-cols-3 w-full gap-4">
										{/* Status do Processo */}
										<div className="flex flex-col gap-2">
											<Label htmlFor="edit-status">Status do Processo *</Label>
											<Select
												value={editForm.status}
												onValueChange={(value) => setEditForm({ ...editForm, status: value })}
											>
												<SelectTrigger className="w-full">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Distribuído">Distribuído</SelectItem>
													<SelectItem value="Aguardando análise inicial">
														Aguardando análise inicial
													</SelectItem>
													<SelectItem value="Citação pendente">Citação pendente</SelectItem>
													<SelectItem value="Aguardando contestação">
														Aguardando contestação
													</SelectItem>
													<SelectItem value="Em fase de instrução">
														Em fase de instrução
													</SelectItem>
													<SelectItem value="Aguardando perícia">Aguardando perícia</SelectItem>
													<SelectItem value="Perícia em andamento">
														Perícia em andamento
													</SelectItem>
													<SelectItem value="Audiência designada">Audiência designada</SelectItem>
													<SelectItem value="Aguardando documentação">
														Aguardando documentação
													</SelectItem>
													<SelectItem value="Concluso para sentença">
														Concluso para sentença
													</SelectItem>
													<SelectItem value="Sentença proferida">Sentença proferida</SelectItem>
													<SelectItem value="Em fase de recurso">Em fase de recurso</SelectItem>
													<SelectItem value="Aguardando trânsito em julgado">
														Aguardando trânsito em julgado
													</SelectItem>
													<SelectItem value="Em fase de cumprimento">
														Em fase de cumprimento
													</SelectItem>
													<SelectItem value="Arquivado">Arquivado</SelectItem>
													<SelectItem value="Concluído">Concluído</SelectItem>
												</SelectContent>
											</Select>
											<p className="text-xs text-muted-foreground">
												Selecione o estágio atual do processo no sistema judiciário
											</p>
										</div>

										{/* Prioridade */}
										<div className="flex flex-col gap-2">
											<Label htmlFor="edit-priority">Prioridade *</Label>
											<Select
												value={editForm.priority}
												onValueChange={(value) => setEditForm({ ...editForm, priority: value })}
											>
												<SelectTrigger className="w-full">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="urgente">
														<div className="flex items-center gap-2">
															<div className="w-2 h-2 rounded-full bg-red-500"></div>
															<span>Urgente</span>
														</div>
													</SelectItem>
													<SelectItem value="alta">
														<div className="flex items-center gap-2">
															<div className="w-2 h-2 rounded-full bg-orange-500"></div>
															<span>Alta</span>
														</div>
													</SelectItem>
													<SelectItem value="media">
														<div className="flex items-center gap-2">
															<div className="w-2 h-2 rounded-full bg-blue-500"></div>
															<span>Média</span>
														</div>
													</SelectItem>
													<SelectItem value="baixa">
														<div className="flex items-center gap-2">
															<div className="w-2 h-2 rounded-full bg-gray-400"></div>
															<span>Baixa</span>
														</div>
													</SelectItem>
												</SelectContent>
											</Select>
										</div>

										{/* Área Jurídica */}
										<div className="flex flex-col gap-2">
											<Label htmlFor="edit-tags">Área Jurídica *</Label>
											<Select
												value={editForm.tags[0] || ""}
												onValueChange={(value) => {
													if (value) {
														setEditForm({ ...editForm, tags: [value] });
													}
												}}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Selecione a área" />
												</SelectTrigger>
												<SelectContent>
													{availableTags.map((tag) => (
														<SelectItem key={tag} value={tag}>
															{tag}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<p className="text-xs text-muted-foreground">
												Escolha a área principal do processo
											</p>
										</div>
									</div>
								</div>
								<DialogFooter>
									<Button type="button" variant="outline" onClick={() => setOpenManageProcess(false)}>
										Cancelar
									</Button>
									<Button type="submit" disabled={isLoading}>
										{isLoading ? "Salvando..." : "Salvar Alterações"}
									</Button>
								</DialogFooter>
							</form>
						) : (
							<form onSubmit={handleAddTimeline}>
								<div className="grid gap-4 py-4">
									{/* Templates de Andamentos */}
									<div className="grid gap-2">
										<Label htmlFor="timeline-template">Templates de Andamentos Comuns</Label>
										<Select
											onValueChange={(value) => {
												const template = timelineTemplates[parseInt(value)];
												if (template) {
													setTimelineForm({
														...timelineForm,
														title: template.title,
														text: template.text,
													});
												}
											}}
										>
											<SelectTrigger>
												<SelectValue placeholder="Selecione um template (opcional)" />
											</SelectTrigger>
											<SelectContent>
												{timelineTemplates.map((template, index) => (
													<SelectItem key={index} value={index.toString()}>
														{template.title}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<p className="text-xs text-muted-foreground">
											Selecione um template para preencher automaticamente o título e descrição
										</p>
									</div>

									{/* Tipo de Andamento */}
									<div className="grid gap-2">
										<Label htmlFor="timeline-type">Tipo de Andamento *</Label>
										<Select
											value={timelineForm.type}
											onValueChange={(value) => setTimelineForm({ ...timelineForm, type: value })}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="official">Andamento Oficial</SelectItem>
												<SelectItem value="comment">Comentário do Advogado</SelectItem>
											</SelectContent>
										</Select>
										<p className="text-xs text-muted-foreground">
											Andamentos oficiais são movimentações do processo. Comentários são
											observações internas.
										</p>
									</div>

									{/* Data do Andamento */}
									<div className="grid gap-2">
										<Label htmlFor="timeline-date">Data do Andamento *</Label>
										<Input
											id="timeline-date"
											type="date"
											value={timelineForm.date}
											onChange={(e) => setTimelineForm({ ...timelineForm, date: e.target.value })}
											required
										/>
									</div>

									{/* Título do Andamento */}
									<div className="grid gap-2">
										<Label htmlFor="timeline-title">Título do Andamento *</Label>
										<Input
											id="timeline-title"
											placeholder="Ex: Audiência Realizada"
											value={timelineForm.title}
											onChange={(e) =>
												setTimelineForm({ ...timelineForm, title: e.target.value })
											}
											required
										/>
									</div>

									{/* Descrição do Andamento */}
									<div className="grid gap-2">
										<Label htmlFor="timeline-text">Descrição do Andamento *</Label>
										<Textarea
											id="timeline-text"
											placeholder="Descreva o que aconteceu neste andamento..."
											value={timelineForm.text}
											onChange={(e) => setTimelineForm({ ...timelineForm, text: e.target.value })}
											rows={5}
											required
										/>
									</div>

									{/* Criado por */}
									<div className="grid gap-2">
										<Label htmlFor="timeline-author">Criado por</Label>
										<Input
											id="timeline-author"
											value={timelineForm.createdBy}
											onChange={(e) =>
												setTimelineForm({ ...timelineForm, createdBy: e.target.value })
											}
										/>
									</div>

									{/* Upload de Anexos */}
									<div className="grid gap-2">
										<Label>Anexos</Label>
										<FileUpload
											files={timelineForm.attachments}
											onChange={(files) =>
												setTimelineForm({ ...timelineForm, attachments: files })
											}
											maxFiles={5}
										/>
										<p className="text-xs text-muted-foreground">
											Adicione sentenças, petições, decisões e outros documentos relevantes
										</p>
									</div>

									{/* Mostrar timeline existente */}
									{selectedProcess?.timeline && selectedProcess.timeline.length > 0 && (
										<div className="border-t pt-4">
											<Label className="mb-3 block">Andamentos Anteriores</Label>
											<div className="space-y-3 max-h-60 overflow-y-auto">
												{[...selectedProcess.timeline].reverse().map((item, index) => (
													<div key={item.id} className="border-l-2 border-primary pl-4 pb-3">
														<div className="flex items-start justify-between">
															<div className="flex-1">
																<p className="font-medium text-sm">{item.title}</p>
																<p className="text-xs text-muted-foreground mt-1">
																	{new Date(item.date).toLocaleDateString("pt-BR")} -{" "}
																	{item.createdBy}
																</p>
															</div>
															<div className="flex gap-1">
																<Button
																	type="button"
																	variant="ghost"
																	size="icon"
																	className="h-7 w-7"
																	onClick={() => handleEditTimelineOpen(item)}
																>
																	<Edit className="h-3 w-3" />
																</Button>
																<Button
																	type="button"
																	variant="ghost"
																	size="icon"
																	className="h-7 w-7 text-destructive"
																	onClick={() => handleDeleteTimelineConfirm(item)}
																>
																	<Trash2 className="h-3 w-3" />
																</Button>
															</div>
														</div>
														<p className="text-sm text-muted-foreground mt-2 line-clamp-2">
															{item.text}
														</p>
													</div>
												))}
											</div>
										</div>
									)}
								</div>
								<DialogFooter>
									<Button type="button" variant="outline" onClick={() => setOpenManageProcess(false)}>
										Fechar
									</Button>
									<Button type="submit" disabled={isLoading}>
										{isLoading ? "Adicionando..." : "Adicionar Andamento"}
									</Button>
								</DialogFooter>
							</form>
						)}
					</ScrollArea>
				</DialogContent>
			</Dialog>

			{/* Dialog de Visualizar Processo */}
			{viewProcess && (
				<ProcessViewDialog
					open={openViewProcess}
					onOpenChange={handleCloseViewDialog}
					process={viewProcess}
					onEdit={handleEditFromView}
				/>
			)}

			{/* Dialog de Edição de Andamento */}
			<Dialog open={openEditTimeline} onOpenChange={setOpenEditTimeline}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Editar Andamento</DialogTitle>
						<DialogDescription>Atualize as informações do andamento</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleUpdateTimeline}>
						<div className="grid gap-4 py-4">
							{/* Tipo de Andamento */}
							<div className="grid gap-2">
								<Label htmlFor="edit-timeline-type">Tipo de Andamento *</Label>
								<Select
									value={editTimelineForm.type}
									onValueChange={(value) => setEditTimelineForm({ ...editTimelineForm, type: value })}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="official">Andamento Oficial</SelectItem>
										<SelectItem value="comment">Comentário do Advogado</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Data do Andamento */}
							<div className="grid gap-2">
								<Label htmlFor="edit-timeline-date">Data do Andamento *</Label>
								<Input
									id="edit-timeline-date"
									type="date"
									value={editTimelineForm.date}
									onChange={(e) => setEditTimelineForm({ ...editTimelineForm, date: e.target.value })}
									required
								/>
							</div>

							{/* Título do Andamento */}
							<div className="grid gap-2">
								<Label htmlFor="edit-timeline-title">Título do Andamento *</Label>
								<Input
									id="edit-timeline-title"
									placeholder="Ex: Audiência Realizada"
									value={editTimelineForm.title}
									onChange={(e) =>
										setEditTimelineForm({ ...editTimelineForm, title: e.target.value })
									}
									required
								/>
							</div>

							{/* Descrição do Andamento */}
							<div className="grid gap-2">
								<Label htmlFor="edit-timeline-text">Descrição do Andamento *</Label>
								<Textarea
									id="edit-timeline-text"
									placeholder="Descreva o que aconteceu neste andamento..."
									value={editTimelineForm.text}
									onChange={(e) => setEditTimelineForm({ ...editTimelineForm, text: e.target.value })}
									rows={5}
									required
								/>
							</div>

							{/* Criado por */}
							<div className="grid gap-2">
								<Label htmlFor="edit-timeline-author">Criado por</Label>
								<Input
									id="edit-timeline-author"
									value={editTimelineForm.createdBy}
									onChange={(e) =>
										setEditTimelineForm({ ...editTimelineForm, createdBy: e.target.value })
									}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button type="button" variant="outline" onClick={() => setOpenEditTimeline(false)}>
								Cancelar
							</Button>
							<Button type="submit" disabled={isLoading}>
								{isLoading ? "Salvando..." : "Salvar Alterações"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* Dialog de Confirmação para Excluir Andamento */}
			<ConfirmationDialog
				open={confirmDelete}
				onOpenChange={setConfirmDelete}
				title="Excluir Andamento"
				description={`Tem certeza que deseja deletar o andamento "${timelineToDelete?.title}"? Esta ação não pode ser desfeita.`}
				onConfirm={handleDeleteTimeline}
				confirmLabel="Excluir"
				cancelLabel="Cancelar"
			/>

			{/* Dialog de Confirmação para Excluir Processo */}
			<ConfirmationDialog
				open={confirmDeleteProcess}
				onOpenChange={setConfirmDeleteProcess}
				title="Excluir Processo"
				description={`Tem certeza que deseja deletar o processo "${processToDelete?.processNumber}"? Esta ação não pode ser desfeita.`}
				onConfirm={handleDeleteProcess}
				confirmLabel="Excluir"
				cancelLabel="Cancelar"
			/>
		</div>
	);
};

export default ProcessosPage;
