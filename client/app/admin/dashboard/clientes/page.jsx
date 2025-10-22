"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { useClientStore } from "@/store/client-store";
import { useProcessStore } from "@/store/process-store";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Phone, User, FileText, Calendar, Eye, Edit } from "lucide-react";

const ClientesPage = () => {
	const router = useRouter();
	const { isAuthenticated, isAdmin } = useAuthStore();
	const { clients, fetchClients, addClient, updateClient, isLoading } = useClientStore();
	const { getProcessesByClient } = useProcessStore();
	
	// Estados para Dialog de Novo Cliente
	const [openNewClient, setOpenNewClient] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		cpf: "",
		phone: "",
	});

	// Estados para Dialog de Ver Processos
	const [openViewProcesses, setOpenViewProcesses] = useState(false);
	const [selectedClient, setSelectedClient] = useState(null);
	const [clientProcesses, setClientProcesses] = useState([]);

	// Estados para Dialog de Edição
	const [openEditClient, setOpenEditClient] = useState(false);
	const [editFormData, setEditFormData] = useState({
		name: "",
		email: "",
		cpf: "",
		phone: "",
	});

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/login");
		} else if (!isAdmin()) {
			router.push("/dashboard");
		} else {
			fetchClients();
		}
	}, [isAuthenticated, isAdmin]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		toast.loading("Cadastrando cliente...");
		const result = await addClient(formData);
		toast.dismiss();

		if (result.success) {
			toast.success("Cliente cadastrado com sucesso!");
			setFormData({ name: "", email: "", cpf: "", phone: "" });
			setOpenNewClient(false);
			await fetchClients();
		} else {
			toast.error("Erro ao cadastrar cliente. Tente novamente.");
		}
	};

	const handleViewProcesses = (client) => {
		setSelectedClient(client);
		const processes = getProcessesByClient(client.id);
		setClientProcesses(processes);
		setOpenViewProcesses(true);
	};

	const handleEditClient = (client) => {
		setSelectedClient(client);
		setEditFormData({
			name: client.name,
			email: client.email,
			cpf: client.cpf,
			phone: client.phone,
		});
		setOpenEditClient(true);
	};

	const handleUpdateSubmit = async (e) => {
		e.preventDefault();
		toast.loading("Salvando alterações...");
		const result = await updateClient(selectedClient.id, editFormData);
		toast.dismiss();

		if (result.success) {
			toast.success("Cliente atualizado com sucesso!");
			setOpenEditClient(false);
			await fetchClients();
		} else {
			toast.error("Erro ao atualizar cliente. Tente novamente.");
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between border-b pb-4">
				<div>
					<h1 className="text-2xl font-bold">Clientes</h1>
					<p className="text-sm text-muted-foreground">
						Gerencie todos os clientes cadastrados
					</p>
				</div>
				
				{/* Dialog de Novo Cliente */}
				<Dialog open={openNewClient} onOpenChange={setOpenNewClient}>
					<DialogTrigger asChild>
						<Button>
							<Plus className="h-4 w-4" />
							Novo Cliente
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl">
						<DialogHeader>
							<DialogTitle>Cadastrar Novo Cliente</DialogTitle>
							<DialogDescription>
								Preencha as informações do cliente para cadastrá-lo no sistema
							</DialogDescription>
						</DialogHeader>
						<form onSubmit={handleSubmit}>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="grid gap-2">
										<Label htmlFor="name">Nome Completo *</Label>
										<Input
											id="name"
											placeholder="Nome completo do cliente"
											value={formData.name}
											onChange={(e) =>
												setFormData({ ...formData, name: e.target.value })
											}
											required
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="email">Email *</Label>
										<Input
											id="email"
											type="email"
											placeholder="email@exemplo.com"
											value={formData.email}
											onChange={(e) =>
												setFormData({ ...formData, email: e.target.value })
											}
											required
										/>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="grid gap-2">
										<Label htmlFor="cpf">CPF *</Label>
										<Input
											id="cpf"
											value={formData.cpf}
											onChange={(e) =>
												setFormData({ ...formData, cpf: e.target.value })
											}
											placeholder="000.000.000-00"
											required
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="phone">Telefone *</Label>
										<Input
											id="phone"
											value={formData.phone}
											onChange={(e) =>
												setFormData({ ...formData, phone: e.target.value })
											}
											placeholder="(00) 00000-0000"
											required
										/>
									</div>
								</div>
							</div>
							<DialogFooter>
								<Button
									type="button"
									variant="outline"
									onClick={() => setOpenNewClient(false)}
								>
									Cancelar
								</Button>
								<Button type="submit" disabled={isLoading}>
									{isLoading ? "Salvando..." : "Cadastrar Cliente"}
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid gap-4">
				{clients.map((client) => (
					<Card key={client.id} className="hover:shadow-md transition-shadow">
						<CardHeader>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<CardTitle className="text-lg mb-3">{client.name}</CardTitle>
									<div className="grid grid-cols-2 gap-3 text-sm">
										<div className="flex items-center gap-2 text-muted-foreground">
											<Mail className="h-4 w-4" />
											<span>{client.email}</span>
										</div>
										<div className="flex items-center gap-2 text-muted-foreground">
											<Phone className="h-4 w-4" />
											<span>{client.phone}</span>
										</div>
										<div className="flex items-center gap-2 text-muted-foreground">
											<User className="h-4 w-4" />
											<span>{client.cpf}</span>
										</div>
										<div className="flex items-center gap-2 text-muted-foreground">
											<FileText className="h-4 w-4" />
											<span>
												{getProcessesByClient(client.id).length} processo
												{getProcessesByClient(client.id).length !== 1 ? "s" : ""}
											</span>
										</div>
									</div>
								</div>
								<div className="flex gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEditClient(client)}
									>
										<Edit className="h-4 w-4 mr-1" />
										Editar
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleViewProcesses(client)}
									>
										<Eye className="h-4 w-4 mr-1" />
										Ver Processos
									</Button>
								</div>
							</div>
						</CardHeader>
					</Card>
				))}
			</div>

			{/* Dialog de Edição de Cliente */}
			<Dialog open={openEditClient} onOpenChange={setOpenEditClient}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Editar Cliente</DialogTitle>
						<DialogDescription>
							Atualize as informações do cliente
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleUpdateSubmit}>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="edit-name">Nome Completo *</Label>
									<Input
										id="edit-name"
										placeholder="Nome completo do cliente"
										value={editFormData.name}
										onChange={(e) =>
											setEditFormData({ ...editFormData, name: e.target.value })
										}
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="edit-email">Email *</Label>
									<Input
										id="edit-email"
										type="email"
										placeholder="email@exemplo.com"
										value={editFormData.email}
										onChange={(e) =>
											setEditFormData({ ...editFormData, email: e.target.value })
										}
										required
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="edit-cpf">CPF *</Label>
									<Input
										id="edit-cpf"
										value={editFormData.cpf}
										onChange={(e) =>
											setEditFormData({ ...editFormData, cpf: e.target.value })
										}
										placeholder="000.000.000-00"
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="edit-phone">Telefone *</Label>
									<Input
										id="edit-phone"
										value={editFormData.phone}
										onChange={(e) =>
											setEditFormData({ ...editFormData, phone: e.target.value })
										}
										placeholder="(00) 00000-0000"
										required
									/>
								</div>
							</div>
						</div>
						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpenEditClient(false)}
							>
								Cancelar
							</Button>
							<Button type="submit" disabled={isLoading}>
								{isLoading ? "Salvando..." : "Salvar Alterações"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* Dialog de Ver Processos */}
			<Dialog open={openViewProcesses} onOpenChange={setOpenViewProcesses}>
				<DialogContent className="max-w-4xl max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Processos do Cliente</DialogTitle>
						<DialogDescription>
							{selectedClient?.name} - {selectedClient?.cpf}
						</DialogDescription>
					</DialogHeader>

					<ScrollArea className="max-h-[70vh] pr-4">
						{clientProcesses.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-12 text-center">
								<FileText className="h-16 w-16 text-muted-foreground mb-4" />
								<p className="text-lg font-medium mb-2">
									Nenhum processo encontrado
								</p>
								<p className="text-sm text-muted-foreground">
									Este cliente ainda não possui processos cadastrados no sistema.
								</p>
							</div>
						) : (
							<div className="space-y-4 py-4">
								{clientProcesses.map((process) => (
									<Card key={process.id} className="hover:shadow-md transition-shadow">
										<CardHeader>
											<div className="flex items-start justify-between gap-4">
												<div className="flex-1 space-y-3">
													<div>
														<CardTitle className="text-base mb-1">
															{process.title}
														</CardTitle>
														<CardDescription className="text-sm">
															{process.description}
														</CardDescription>
													</div>

													<div className="flex flex-wrap gap-4 text-sm">
														<div className="flex items-center gap-2 text-muted-foreground">
															<FileText className="h-4 w-4" />
															<span>{process.processNumber}</span>
														</div>
														<div className="flex items-center gap-2 text-muted-foreground">
															<Calendar className="h-4 w-4" />
															<span>
																Atualizado:{" "}
																{new Date(
																	process.lastUpdate
																).toLocaleDateString("pt-BR")}
															</span>
														</div>
													</div>

													{/* Timeline Preview */}
													{process.timeline && process.timeline.length > 0 && (
														<div className="border-l-2 border-primary pl-4 space-y-2">
															<p className="text-xs font-medium text-muted-foreground">
																Último Andamento:
															</p>
															<div>
																<p className="text-sm font-medium">
																	{
																		process.timeline[process.timeline.length - 1]
																			.title
																	}
																</p>
																<p className="text-xs text-muted-foreground mt-1">
																	{new Date(
																		process.timeline[process.timeline.length - 1].date
																	).toLocaleDateString("pt-BR")}{" "}
																	-{" "}
																	{
																		process.timeline[process.timeline.length - 1]
																			.createdBy
																	}
																</p>
															</div>
														</div>
													)}
												</div>

												<div className="flex flex-col items-end gap-2">
													<Badge
														variant={
															process.status === "Concluído"
																? "default"
																: process.status === "Em andamento"
																? "secondary"
																: "outline"
														}
													>
														{process.status}
													</Badge>
													<p className="text-xs text-muted-foreground">
														{process.timeline?.length || 0} andamentos
													</p>
												</div>
											</div>
										</CardHeader>
									</Card>
								))}
							</div>
						)}
					</ScrollArea>

					<DialogFooter>
						<Button variant="outline" onClick={() => setOpenViewProcesses(false)}>
							Fechar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ClientesPage;
