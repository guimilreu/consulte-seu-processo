"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useProcessStore } from "@/store/process-store";
import { useClientStore } from "@/store/client-store";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, FileText, Calendar, User, Edit, Clock } from "lucide-react";

const ProcessosPage = () => {
	const router = useRouter();
	const { isAuthenticated, isAdmin } = useAuthStore();
	const { processes, fetchAllProcesses, createProcess, updateProcess, addTimeline, isLoading } = useProcessStore();
	const { clients, fetchClients } = useClientStore();
	
	// Estados para Dialog de Novo Processo
	const [openNewProcess, setOpenNewProcess] = useState(false);
	const [newProcessForm, setNewProcessForm] = useState({
		clientId: "",
		processNumber: "",
		title: "",
		description: "",
		status: "Em andamento",
	});

	// Estados para Dialog de Gerenciar Processo
	const [openManageProcess, setOpenManageProcess] = useState(false);
	const [selectedProcess, setSelectedProcess] = useState(null);
	const [manageMode, setManageMode] = useState("edit"); // "edit" ou "timeline"
	const [editForm, setEditForm] = useState({
		title: "",
		description: "",
		status: "",
		processNumber: "",
	});
	const [timelineForm, setTimelineForm] = useState({
		title: "",
		text: "",
		createdBy: "Administrador",
	});

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/login");
		} else if (!isAdmin()) {
			router.push("/dashboard");
		} else {
			fetchAllProcesses();
			fetchClients();
		}
	}, [isAuthenticated, isAdmin]);

	// Handlers para Novo Processo
	const handleNewProcessSubmit = async (e) => {
		e.preventDefault();
		
		const client = clients.find((c) => c.id === parseInt(newProcessForm.clientId));
		if (!client) {
			alert("Selecione um cliente válido");
			return;
		}

		const result = await createProcess({
			...newProcessForm,
			clientId: parseInt(newProcessForm.clientId),
			clientName: client.name,
		});

		if (result.success) {
			setOpenNewProcess(false);
			setNewProcessForm({
				clientId: "",
				processNumber: "",
				title: "",
				description: "",
				status: "Em andamento",
			});
			await fetchAllProcesses();
		}
	};

	// Handlers para Gerenciar Processo
	const handleOpenManage = (process) => {
		setSelectedProcess(process);
		setEditForm({
			title: process.title,
			description: process.description,
			status: process.status,
			processNumber: process.processNumber,
		});
		setTimelineForm({
			title: "",
			text: "",
			createdBy: "Administrador",
		});
		setManageMode("edit");
		setOpenManageProcess(true);
	};

	const handleUpdateProcess = async (e) => {
		e.preventDefault();
		if (!selectedProcess) return;

		const result = await updateProcess(selectedProcess.id, editForm);
		if (result.success) {
			setOpenManageProcess(false);
			await fetchAllProcesses();
		}
	};

	const handleAddTimeline = async (e) => {
		e.preventDefault();
		if (!selectedProcess) return;

		const result = await addTimeline(selectedProcess.id, timelineForm);
		if (result.success) {
			setTimelineForm({
				title: "",
				text: "",
				createdBy: "Administrador",
			});
			// Atualizar o processo selecionado com o novo timeline
			const updatedProcess = processes.find((p) => p.id === selectedProcess.id);
			if (updatedProcess) {
				setSelectedProcess(updatedProcess);
			}
		}
	};

	if (isLoading && processes.length === 0) {
		return (
			<div className="flex items-center justify-center h-96">
				<p className="text-muted-foreground">Carregando...</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between border-b pb-4">
				<div>
					<h1 className="text-2xl font-bold">Processos</h1>
					<p className="text-sm text-muted-foreground">
						Gerencie todos os processos do sistema
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
					<DialogContent className="max-w-2xl">
						<DialogHeader>
							<DialogTitle>Cadastrar Novo Processo</DialogTitle>
							<DialogDescription>
								Preencha as informações do processo para cadastrá-lo no sistema
							</DialogDescription>
						</DialogHeader>
						<form onSubmit={handleNewProcessSubmit}>
							<div className="grid gap-4 py-4">
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
											{clients.map((client) => (
												<SelectItem key={client.id} value={client.id.toString()}>
													{client.name} - {client.cpf}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

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

								<div className="grid gap-2">
									<Label htmlFor="title">Título do Processo *</Label>
									<Input
										id="title"
										placeholder="Ex: Ação de Indenização por Danos Morais"
										value={newProcessForm.title}
										onChange={(e) =>
											setNewProcessForm({ ...newProcessForm, title: e.target.value })
										}
										required
									/>
								</div>

								<div className="grid gap-2">
									<Label htmlFor="description">Descrição *</Label>
									<Textarea
										id="description"
										placeholder="Descreva brevemente o processo..."
										value={newProcessForm.description}
										onChange={(e) =>
											setNewProcessForm({
												...newProcessForm,
												description: e.target.value,
											})
										}
										rows={3}
										required
									/>
								</div>

								<div className="grid gap-2">
									<Label htmlFor="status">Status</Label>
									<Select
										value={newProcessForm.status}
										onValueChange={(value) =>
											setNewProcessForm({ ...newProcessForm, status: value })
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Em andamento">Em andamento</SelectItem>
											<SelectItem value="Aguardando documentação">Aguardando documentação</SelectItem>
											<SelectItem value="Em fase de recurso">Em fase de recurso</SelectItem>
											<SelectItem value="Concluído">Concluído</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<DialogFooter>
								<Button
									type="button"
									variant="outline"
									onClick={() => setOpenNewProcess(false)}
								>
									Cancelar
								</Button>
								<Button type="submit" disabled={isLoading}>
									{isLoading ? "Salvando..." : "Cadastrar Processo"}
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid gap-4">
				{processes.map((process) => (
					<Card key={process.id} className="hover:shadow-md transition-shadow">
						<CardHeader>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<CardTitle className="text-lg mb-2">{process.title}</CardTitle>
									<CardDescription className="mb-3">{process.description}</CardDescription>
									<div className="flex flex-wrap gap-4 text-sm">
										<div className="flex items-center gap-2 text-muted-foreground">
											<FileText className="h-4 w-4" />
											<span>{process.processNumber}</span>
										</div>
										<div className="flex items-center gap-2 text-muted-foreground">
											<User className="h-4 w-4" />
											<span>{process.clientName}</span>
										</div>
										<div className="flex items-center gap-2 text-muted-foreground">
											<Calendar className="h-4 w-4" />
											<span>Atualizado: {new Date(process.lastUpdate).toLocaleDateString("pt-BR")}</span>
										</div>
										<div className="flex items-center gap-2 text-muted-foreground">
											<Clock className="h-4 w-4" />
											<span>{process.timeline?.length || 0} andamentos</span>
										</div>
									</div>
								</div>
								<div className="flex flex-col items-end gap-2">
									<span className={`text-xs px-2 py-1 rounded-full ${
										process.status === "Concluído" 
											? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
											: process.status === "Em andamento"
											? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
											: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
									}`}>
										{process.status}
									</span>
									<Button
										size="sm"
										variant="outline"
										onClick={() => handleOpenManage(process)}
									>
										<Edit className="h-4 w-4 mr-1" />
										Gerenciar
									</Button>
								</div>
							</div>
						</CardHeader>
					</Card>
				))}
			</div>

			{/* Dialog de Gerenciar Processo */}
			<Dialog open={openManageProcess} onOpenChange={setOpenManageProcess}>
				<DialogContent className="max-w-3xl max-h-[90vh]">
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
									<div className="grid gap-2">
										<Label htmlFor="edit-processNumber">Número do Processo</Label>
										<Input
											id="edit-processNumber"
											value={editForm.processNumber}
											onChange={(e) =>
												setEditForm({ ...editForm, processNumber: e.target.value })
											}
											required
										/>
									</div>

									<div className="grid gap-2">
										<Label htmlFor="edit-title">Título</Label>
										<Input
											id="edit-title"
											value={editForm.title}
											onChange={(e) =>
												setEditForm({ ...editForm, title: e.target.value })
											}
											required
										/>
									</div>

									<div className="grid gap-2">
										<Label htmlFor="edit-description">Descrição</Label>
										<Textarea
											id="edit-description"
											value={editForm.description}
											onChange={(e) =>
												setEditForm({ ...editForm, description: e.target.value })
											}
											rows={3}
											required
										/>
									</div>

									<div className="grid gap-2">
										<Label htmlFor="edit-status">Status</Label>
										<Select
											value={editForm.status}
											onValueChange={(value) =>
												setEditForm({ ...editForm, status: value })
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Em andamento">Em andamento</SelectItem>
												<SelectItem value="Aguardando documentação">
													Aguardando documentação
												</SelectItem>
												<SelectItem value="Em fase de recurso">
													Em fase de recurso
												</SelectItem>
												<SelectItem value="Concluído">Concluído</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<DialogFooter>
									<Button
										type="button"
										variant="outline"
										onClick={() => setOpenManageProcess(false)}
									>
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

									<div className="grid gap-2">
										<Label htmlFor="timeline-text">Descrição do Andamento *</Label>
										<Textarea
											id="timeline-text"
											placeholder="Descreva o que aconteceu neste andamento..."
											value={timelineForm.text}
											onChange={(e) =>
												setTimelineForm({ ...timelineForm, text: e.target.value })
											}
											rows={4}
											required
										/>
									</div>

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

									{/* Mostrar timeline existente */}
									{selectedProcess?.timeline && selectedProcess.timeline.length > 0 && (
										<div className="border-t pt-4">
											<Label className="mb-3 block">Andamentos Anteriores</Label>
											<div className="space-y-3 max-h-60 overflow-y-auto">
												{[...selectedProcess.timeline].reverse().map((item, index) => (
													<div
														key={item.id}
														className="border-l-2 border-primary pl-4 pb-3"
													>
														<div className="flex items-start justify-between">
															<div>
																<p className="font-medium text-sm">{item.title}</p>
																<p className="text-xs text-muted-foreground mt-1">
																	{new Date(item.date).toLocaleDateString("pt-BR")} - {item.createdBy}
																</p>
															</div>
														</div>
														<p className="text-sm text-muted-foreground mt-2">
															{item.text}
														</p>
													</div>
												))}
											</div>
										</div>
									)}
								</div>
								<DialogFooter>
									<Button
										type="button"
										variant="outline"
										onClick={() => setOpenManageProcess(false)}
									>
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
		</div>
	);
};

export default ProcessosPage;
