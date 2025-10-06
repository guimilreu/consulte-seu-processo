"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useProcessStore } from "@/store/process-store";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ChevronRight } from "lucide-react";

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

			{processes.length === 0 ? (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<FileText className="h-12 w-12 text-muted-foreground mb-4" />
						<p className="text-muted-foreground">Nenhum processo encontrado</p>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-4">
					{processes.map((process) => (
						<Card key={process.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleProcessClick(process.id)}>
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
												<Calendar className="h-4 w-4" />
												<span>Última atualização: {new Date(process.lastUpdate).toLocaleDateString("pt-BR")}</span>
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
										<ChevronRight className="h-5 w-5 text-muted-foreground" />
									</div>
								</div>
							</CardHeader>
						</Card>
					))}
				</div>
			)}
		</div>
	);
};

export default Dashboard;
