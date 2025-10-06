"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useProcessStore } from "@/store/process-store";
import { useClientStore } from "@/store/client-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, FileText, CheckCircle, Clock } from "lucide-react";

const AdminDashboard = () => {
	const router = useRouter();
	const { isAuthenticated, isAdmin } = useAuthStore();
	const { processes, fetchAllProcesses, getStats } = useProcessStore();
	const { getStats: getClientStats } = useClientStore();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/login");
		} else if (!isAdmin()) {
			router.push("/dashboard");
		} else {
			fetchAllProcesses();
		}
	}, [isAuthenticated, isAdmin]);

	const processStats = getStats();
	const clientStats = getClientStats();

	const statsCards = [
		{
			title: "Total de Clientes",
			value: clientStats.totalClients,
			icon: Users,
			color: "text-blue-600",
			bgColor: "bg-blue-100 dark:bg-blue-900",
		},
		{
			title: "Total de Processos",
			value: processStats.totalProcesses,
			icon: FileText,
			color: "text-purple-600",
			bgColor: "bg-purple-100 dark:bg-purple-900",
		},
		{
			title: "Processos Ativos",
			value: processStats.activeProcesses,
			icon: Clock,
			color: "text-yellow-600",
			bgColor: "bg-yellow-100 dark:bg-yellow-900",
		},
		{
			title: "Processos Concluídos",
			value: processStats.completedProcesses,
			icon: CheckCircle,
			color: "text-green-600",
			bgColor: "bg-green-100 dark:bg-green-900",
		},
	];

	const recentProcesses = processes.slice(0, 5);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col border-b pb-4">
				<h1 className="text-2xl font-bold">Dashboard</h1>
				<p className="text-sm text-muted-foreground">
					Visão geral do sistema Consulte seu Processo
				</p>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{statsCards.map((stat) => {
					const Icon = stat.icon;
					return (
						<Card key={stat.title}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									{stat.title}
								</CardTitle>
								<div className={`p-2 rounded-full ${stat.bgColor}`}>
									<Icon className={`h-4 w-4 ${stat.color}`} />
								</div>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{stat.value}</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Recent Processes */}
			<Card>
				<CardHeader>
					<CardTitle>Processos Recentes</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{recentProcesses.length === 0 ? (
							<p className="text-sm text-muted-foreground text-center py-4">
								Nenhum processo cadastrado
							</p>
						) : (
							recentProcesses.map((process) => (
								<div
									key={process.id}
									className="flex items-center justify-between border-b pb-3 last:border-0"
								>
									<div className="flex-1">
										<p className="font-medium">{process.title}</p>
										<div className="flex gap-4 mt-1">
											<p className="text-sm text-muted-foreground">
												{process.processNumber}
											</p>
											<p className="text-sm text-muted-foreground">
												Cliente: {process.clientName}
											</p>
										</div>
									</div>
									<span className={`text-xs px-2 py-1 rounded-full ${
										process.status === "Concluído" 
											? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
											: process.status === "Em andamento"
											? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
											: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
									}`}>
										{process.status}
									</span>
								</div>
							))
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminDashboard;
