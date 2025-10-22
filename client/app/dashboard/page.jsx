"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useProcessStore } from "@/store/process-store";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ChevronRight, Scale, Building2, FolderOpen, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
	const router = useRouter();
	const { user, isAuthenticated } = useAuthStore();
	const { processes, fetchMyProcesses, fetchProcess, isLoading } = useProcessStore();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/login");
		} else if (user) {
			fetchMyProcesses(user.id);
		}
	}, [isAuthenticated, user]);

	const handleProcessClick = async (processId) => {
		await fetchProcess(processId);
		router.push(`/dashboard/processo/${processId}`);
	};

	// Estatísticas para o cliente
	const stats = {
		total: processes.length,
		ativos: processes.filter(p => p.status !== "Concluído" && p.status !== "Arquivado").length,
		concluidos: processes.filter(p => p.status === "Concluído" || p.status === "Arquivado").length,
	};

	// Processos com atualizações recentes (últimos 7 dias)
	const getNewUpdatesCount = (process) => {
		if (!process.timeline) return 0;
		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
		return process.timeline.filter(t => new Date(t.date) > sevenDaysAgo).length;
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-96">
				<div className="text-center">
					<p className="text-muted-foreground">Carregando...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col border-b pb-4">
				<h1 className="text-2xl font-bold">Meus Processos</h1>
				<p className="text-sm text-muted-foreground">
					Olá, {user?.name}! Aqui estão todos os seus processos
				</p>
			</div>

			{/* Cards de Resumo */}
			{processes.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card className="hover:shadow-md transition-shadow">
						<CardContent>
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground">Total de Processos</p>
									<p className="text-3xl font-bold mt-1">{stats.total}</p>
								</div>
								<div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
									<FolderOpen className="h-6 w-6 text-blue-600" />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="hover:shadow-md transition-shadow">
						<CardContent>
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground">Processos Ativos</p>
									<p className="text-3xl font-bold mt-1">{stats.ativos}</p>
								</div>
								<div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full">
									<Clock className="h-6 w-6 text-yellow-600" />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="hover:shadow-md transition-shadow">
						<CardContent>
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground">Processos Concluídos</p>
									<p className="text-3xl font-bold mt-1">{stats.concluidos}</p>
								</div>
								<div className="bg-green-100 dark:bg-green-900 p-4 rounded-full">
									<CheckCircle className="h-6 w-6 text-green-600" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			)}

			{processes.length === 0 ? (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<FileText className="h-12 w-12 text-muted-foreground mb-4" />
						<p className="text-muted-foreground">Nenhum processo encontrado</p>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-4">
					{processes.map((process) => {
						const newUpdates = getNewUpdatesCount(process);
						return (
							<Card 
								key={process.id} 
								className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50 relative" 
								onClick={() => handleProcessClick(process.id)}
							>
								{/* Badge de Novidade */}
								{newUpdates > 0 && (
									<div className="absolute -top-2 -right-2 z-10">
										<Badge className="bg-red-500 text-white animate-pulse">
											{newUpdates} NOVO{newUpdates > 1 ? 'S' : ''}
										</Badge>
									</div>
								)}
							<CardHeader className="pb-4">
								<div className="flex items-start justify-between gap-4 mb-3">
									<div className="flex items-center gap-2">
										<Scale className="h-5 w-5 text-primary" />
										<CardTitle className="text-lg">{process.actionType}</CardTitle>
									</div>
									<Badge 
										variant="outline"
										className={`whitespace-nowrap ${
											process.status === "Concluído" || process.status === "Arquivado"
												? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300"
												: process.status === "Sentença proferida" || process.status === "Concluso para sentença"
												? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 border-indigo-300"
												: process.status === "Em fase de recurso" || process.status === "Aguardando trânsito em julgado"
												? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300"
												: process.status === "Aguardando documentação"
												? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-300"
												: process.status === "Audiência designada"
												? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-300"
												: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300"
										} text-xs font-semibold border-2`}
									>
										{process.status}
									</Badge>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
									<div className="flex items-start gap-2">
										<FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
										<div className="flex-1 min-w-0">
											<span className="text-xs text-muted-foreground block">Nº do Processo</span>
											<span className="font-mono font-medium break-all">{process.processNumber}</span>
										</div>
									</div>

									<div className="flex items-start gap-2">
										<Building2 className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
										<div className="flex-1 min-w-0">
											<span className="text-xs text-muted-foreground block">Juízo/Foro</span>
											<span className="font-medium line-clamp-1">{process.court}</span>
										</div>
									</div>
								</div>

								<CardDescription className="line-clamp-2 mb-3">
									<span className="font-semibold">Assunto:</span> {process.subject}
								</CardDescription>

								<div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
									<div className="flex items-center gap-2">
										<Calendar className="h-3.5 w-3.5" />
										<span>Atualizado em {new Date(process.lastUpdate).toLocaleDateString("pt-BR")}</span>
									</div>
									<div className="flex items-center gap-1 text-primary font-medium">
										<span>Ver detalhes</span>
										<ChevronRight className="h-4 w-4" />
									</div>
								</div>
							</CardHeader>
							</Card>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Dashboard;
