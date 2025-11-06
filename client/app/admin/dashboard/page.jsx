"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useProcessStore } from "@/store/process-store";
import { useClientStore } from "@/store/client-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, FileText, CheckCircle, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import ProcessViewDialog from "@/components/process/ProcessViewDialog";
import {
	BarChart,
	Bar,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
	const router = useRouter();
	const { isAdmin, user } = useAuthStore();
	const { processes, fetchAllProcesses, getStats, fetchProcess } = useProcessStore();
	const { getStats: getClientStats } = useClientStore();
	const [openViewDialog, setOpenViewDialog] = useState(false);
	const [selectedProcess, setSelectedProcess] = useState(null);

	useEffect(() => {
		if (user && isAdmin()) {
			fetchAllProcesses();
		}
	}, [user, isAdmin, fetchAllProcesses]);

	const [processStats, setProcessStats] = useState({ 
		totalProcesses: 0, 
		activeProcesses: 0, 
		completedProcesses: 0,
		processesThisMonth: 0,
		processesLastMonth: 0,
		completionRate: 0,
		monthlyData: [],
	});
	const [clientStats, setClientStats] = useState({
		totalClients: 0,
		clientsThisMonth: 0,
		clientsLastMonth: 0,
	});

	useEffect(() => {
		const loadStats = async () => {
			const stats = await getStats();
			setProcessStats(stats);
		};
		if (user && isAdmin()) {
			loadStats();
		}
	}, [user, isAdmin, getStats]);

	useEffect(() => {
		const loadClientStats = async () => {
			const stats = await getClientStats();
			setClientStats(stats);
		};
		if (user && isAdmin()) {
			loadClientStats();
		}
	}, [user, isAdmin, getClientStats]);

	// Dados para gráficos
	// Agrupar todos os status dos processos
	const statusCounts = processes.reduce((acc, process) => {
		const status = process.status || "Sem status";
		acc[status] = (acc[status] || 0) + 1;
		return acc;
	}, {});

	// Criar dados para o gráfico de status (top 6 status mais comuns)
	const statusData = Object.entries(statusCounts)
		.map(([status, count]) => {
			// Mapear cores para status comuns
			const colorMap = {
				"Concluído": "#22c55e",
				"Arquivado": "#6b7280",
				"Em fase de recurso": "#a855f7",
				"Aguardando documentação": "#eab308",
				"Em fase de instrução": "#3b82f6",
				"Distribuído": "#3b82f6",
				"Aguardando análise inicial": "#3b82f6",
			};
			return {
				status: status.length > 15 ? status.substring(0, 15) + "..." : status,
				count,
				fill: colorMap[status] || "#8b5cf6",
			};
		})
		.sort((a, b) => b.count - a.count)
		.slice(0, 6);

	// Usar dados mensais do backend ou fallback para dados locais
	const monthlyData = processStats.monthlyData && processStats.monthlyData.length > 0
		? processStats.monthlyData
		: [];

	const typeData = processes.reduce((acc, process) => {
		const type = process.tags?.[0] || "Outros";
		const existing = acc.find(item => item.name === type);
		if (existing) {
			existing.value += 1;
		} else {
			acc.push({ name: type, value: 1 });
		}
		return acc;
	}, []).slice(0, 5);

	const COLORS = ['#3b82f6', '#22c55e', '#eab308', '#a855f7', '#f97316'];

	// Calcular trends dinamicamente
	const clientTrend = clientStats.clientsLastMonth > 0
		? clientStats.clientsThisMonth - clientStats.clientsLastMonth
		: clientStats.clientsThisMonth;
	const clientTrendText = clientTrend > 0 
		? `+${clientTrend} este mês` 
		: clientTrend < 0 
		? `${clientTrend} este mês` 
		: clientStats.clientsThisMonth > 0 
		? `${clientStats.clientsThisMonth} este mês` 
		: "Sem novos clientes";

	const processTrend = processStats.processesLastMonth > 0
		? processStats.processesThisMonth - processStats.processesLastMonth
		: processStats.processesThisMonth;
	const processTrendText = processTrend > 0 
		? `+${processTrend} este mês` 
		: processTrend < 0 
		? `${processTrend} este mês` 
		: processStats.processesThisMonth > 0 
		? `${processStats.processesThisMonth} este mês` 
		: "Sem novos processos";

	const statsCards = [
		{
			title: "Total de Clientes",
			value: clientStats.totalClients || 0,
			icon: Users,
			color: "text-blue-600",
			bgColor: "bg-blue-100 dark:bg-blue-900",
			trend: clientTrendText,
			trendUp: clientTrend > 0,
		},
		{
			title: "Total de Processos",
			value: processStats.totalProcesses || 0,
			icon: FileText,
			color: "text-purple-600",
			bgColor: "bg-purple-100 dark:bg-purple-900",
			trend: processTrendText,
			trendUp: processTrend > 0,
		},
		{
			title: "Processos Ativos",
			value: processStats.activeProcesses || 0,
			icon: Clock,
			color: "text-yellow-600",
			bgColor: "bg-yellow-100 dark:bg-yellow-900",
			trend: `${processStats.activeProcesses || 0} em andamento`,
			trendUp: null,
		},
		{
			title: "Processos Concluídos",
			value: processStats.completedProcesses || 0,
			icon: CheckCircle,
			color: "text-green-600",
			bgColor: "bg-green-100 dark:bg-green-900",
			trend: `${processStats.completionRate || 0}% de conclusão`,
			trendUp: processStats.completionRate > 0,
		},
	];

	// Processos que precisam atenção (sem atualização há 30+ dias)
	const processesNeedAttention = processes.filter(p => {
		const daysSinceUpdate = Math.floor((new Date() - new Date(p.lastUpdate)) / (1000 * 60 * 60 * 24));
		return daysSinceUpdate > 30 && p.status !== "Concluído" && p.status !== "Arquivado";
	});

	const handleProcessClick = (processId) => {
		if (!processId) return;
		
		const process = processes.find(p => {
			const pId = p._id || p.id;
			const searchId = processId._id || processId.id || processId;
			return pId?.toString() === searchId?.toString() || pId === searchId;
		});
		
		if (process) {
			setSelectedProcess(process);
			setOpenViewDialog(true);
		}
	};

	const handleCloseViewDialog = (open) => {
		setOpenViewDialog(open);
		if (!open) {
			setSelectedProcess(null);
		}
	};

	const handleEditFromView = () => {
		if (selectedProcess) {
			const processId = selectedProcess._id || selectedProcess.id;
			setOpenViewDialog(false);
			// Redireciona para a página de processos com o processId para abrir o dialog de gerenciar
			router.push(`/admin/dashboard/processos?edit=${processId}`);
		}
	};

	// Atividade recente (últimos andamentos)
	const recentActivity = processes.flatMap(p => 
		p.timeline?.map(t => ({
			...t,
			processId: p.id,
			processNumber: p.processNumber,
			actionType: p.actionType,
		})) || []
	).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col border-b pb-4">
				<h1 className="text-2xl font-bold">Dashboard</h1>
				<p className="text-sm text-muted-foreground">
					Visão geral do sistema Consulte seu Processo
				</p>
			</div>

			{/* Cards de Estatísticas com Animação */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{statsCards.map((stat, index) => (
					<Card key={index} className="hover:shadow-lg transition-shadow">
						<CardContent>
							<div className="flex items-start justify-between mb-4">
								<div className="flex-1">
									<p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
									<p className="text-3xl font-bold">{stat.value}</p>
								</div>
								<div className={`${stat.bgColor} p-3 rounded-full`}>
									<stat.icon className={`h-6 w-6 ${stat.color}`} />
								</div>
							</div>
							{stat.trend && (
								<div className="flex items-center gap-1 text-sm">
									{stat.trendUp !== null && (
										<TrendingUp className={`h-3 w-3 ${stat.trendUp ? 'text-green-600' : 'text-gray-600'}`} />
									)}
									<span className={stat.trendUp ? 'text-green-600 font-medium' : 'text-muted-foreground'}>
										{stat.trend}
									</span>
								</div>
							)}
						</CardContent>
					</Card>
				))}
			</div>

			{/* Processos Precisando Atenção */}
			{processesNeedAttention.length > 0 && (
				<Card className="border-orange-200 dark:border-orange-800">
					<CardHeader className="bg-orange-50 dark:bg-orange-950/20 mx-6 py-3 px-4 rounded-xl">
						<div className="flex items-center gap-2">
							<AlertTriangle className="h-5 w-5 text-orange-600" />
							<CardTitle className="text-orange-900 dark:text-orange-100">Atenção Necessária</CardTitle>
						</div>
						<p className="text-sm text-orange-700 dark:text-orange-300">
							Processos sem atualização há mais de 30 dias
						</p>
					</CardHeader>
					<CardContent className="pt-0">
						<div className="space-y-3">
							{processesNeedAttention.map((process) => {
								const daysSinceUpdate = Math.floor((new Date() - new Date(process.lastUpdate)) / (1000 * 60 * 60 * 24));
								return (
									<div
										key={process.id || process._id}
										className="flex items-center justify-between p-3 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/10 transition-colors cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											handleProcessClick(process.id || process._id);
										}}
									>
										<div className="flex-1">
											<p className="font-medium">{process.actionType}</p>
											<p className="text-sm text-muted-foreground">
												{process.processNumber} - {process.clientName}
											</p>
										</div>
										<div className="text-right">
											<span className="text-sm font-semibold text-orange-600">
												Há {daysSinceUpdate} dias sem atualização
											</span>
										</div>
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Gráficos */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Gráfico de Barras - Status dos Processos */}
				<Card>
					<CardHeader>
						<CardTitle>Processos por Status</CardTitle>
						<p className="text-sm text-muted-foreground">Distribuição atual por status</p>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={statusData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="status" angle={-15} textAnchor="end" height={80} />
								<YAxis />
								<Tooltip />
								<Bar dataKey="count" fill="#8884d8">
									{statusData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.fill} />
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Gráfico de Linha - Evolução Mensal */}
				<Card>
					<CardHeader>
						<CardTitle>Evolução Mensal</CardTitle>
						<p className="text-sm text-muted-foreground">Processos novos nos últimos 6 meses</p>
					</CardHeader>
					<CardContent>
						{monthlyData.length > 0 ? (
							<ResponsiveContainer width="100%" height={300}>
								<LineChart data={monthlyData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="month" />
									<YAxis />
									<Tooltip />
									<Line type="monotone" dataKey="processos" stroke="#8b5cf6" strokeWidth={2} />
								</LineChart>
							</ResponsiveContainer>
						) : (
							<div className="flex items-center justify-center h-[300px] text-muted-foreground">
								<p>Nenhum dado disponível</p>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Gráfico de Pizza - Distribuição por Tipo */}
				{typeData.length > 0 && (
					<Card>
						<CardHeader>
							<CardTitle>Distribuição por Área</CardTitle>
							<p className="text-sm text-muted-foreground">Top 5 áreas mais comuns</p>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={300}>
								<PieChart>
									<Pie
										data={typeData}
										cx="50%"
										cy="50%"
										labelLine={false}
										label={(entry) => `${entry.name}: ${entry.value}`}
										outerRadius={100}
										fill="#8884d8"
										dataKey="value"
									>
										{typeData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
										))}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				)}

				{/* Atividade Recente */}
				<Card>
					<CardHeader>
						<CardTitle>Atividade Recente</CardTitle>
						<p className="text-sm text-muted-foreground">Últimos andamentos registrados</p>
					</CardHeader>
					<CardContent>
						<div className="space-y-4 max-h-[300px] overflow-y-auto">
							{recentActivity.length === 0 ? (
								<p className="text-muted-foreground text-center py-8">
									Nenhum andamento registrado
								</p>
							) : (
								recentActivity.map((activity, idx) => (
									<div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-0">
										<div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
										<div className="flex-1 min-w-0">
											<p className="font-medium text-sm truncate">{activity.title}</p>
											<p className="text-xs text-muted-foreground truncate">
												{activity.actionType} - {activity.processNumber}
											</p>
											<p className="text-xs text-muted-foreground mt-1">
												{new Date(activity.date).toLocaleDateString("pt-BR")} - {activity.createdBy}
											</p>
										</div>
									</div>
								))
							)}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Dialog de Visualização */}
			{selectedProcess && (
				<ProcessViewDialog
					open={openViewDialog}
					onOpenChange={handleCloseViewDialog}
					process={selectedProcess}
					onEdit={handleEditFromView}
				/>
			)}
		</div>
	);
};

export default AdminDashboard;
