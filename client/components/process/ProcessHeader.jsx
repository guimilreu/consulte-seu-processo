"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
	Scale, 
	Building2, 
	Users, 
	Calendar, 
	DollarSign, 
	FileText,
	Clock
} from "lucide-react";

const ProcessHeader = ({ process }) => {
	const getStatusColor = (status) => {
		// Status finalizados
		if (status === "Concluído" || status === "Arquivado") {
			return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300";
		}
		// Status de decisão/sentença
		if (status === "Sentença proferida" || status === "Concluso para sentença") {
			return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 border-indigo-300";
		}
		// Status de recurso
		if (status === "Em fase de recurso" || status === "Aguardando trânsito em julgado") {
			return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300";
		}
		// Status de atenção (precisa ação)
		if (status === "Aguardando documentação") {
			return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-300";
		}
		// Status de audiência
		if (status === "Audiência designada") {
			return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-300";
		}
		// Status em andamento (padrão)
		return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300";
	};

	return (
		<Card className="border-2 shadow-md">
			<CardContent className="p-6">
				{/* Cabeçalho principal com Tipo de Ação e Status */}
				<div className="flex items-start justify-between mb-6">
					<div className="flex-1">
						<div className="flex items-center gap-3 mb-2">
							<Scale className="h-6 w-6 text-primary" />
							<h1 className="text-2xl font-bold text-foreground">
								{process.actionType}
							</h1>
						</div>
					</div>
					<Badge 
						variant="outline" 
						className={`${getStatusColor(process.status)} px-4 py-2 text-sm font-semibold border-2 whitespace-nowrap`}
					>
						{process.status}
					</Badge>
				</div>

				{/* Grid com dados principais do processo */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
					{/* Número do Processo */}
					<div className="flex items-start gap-3">
						<div className="mt-0.5">
							<FileText className="h-5 w-5 text-primary" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
								Nº do Processo
							</p>
							<p className="text-sm font-mono font-medium text-foreground break-all">
								{process.processNumber}
							</p>
						</div>
					</div>

					{/* Juízo/Foro */}
					<div className="flex items-start gap-3">
						<div className="mt-0.5">
							<Building2 className="h-5 w-5 text-primary" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
								Juízo/Foro
							</p>
							<p className="text-sm font-medium text-foreground">
								{process.court}
							</p>
						</div>
					</div>

					{/* Autor */}
					<div className="flex items-start gap-3">
						<div className="mt-0.5">
							<Users className="h-5 w-5 text-primary" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
								Autor
							</p>
							<p className="text-sm font-medium text-foreground">
								{process.plaintiff}
							</p>
						</div>
					</div>

					{/* Réu */}
					<div className="flex items-start gap-3">
						<div className="mt-0.5">
							<Users className="h-5 w-5 text-primary" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
								Réu (Parte Contrária)
							</p>
							<p className="text-sm font-medium text-foreground">
								{process.defendant}
							</p>
						</div>
					</div>

					{/* Data do Ajuizamento */}
					<div className="flex items-start gap-3">
						<div className="mt-0.5">
							<Calendar className="h-5 w-5 text-primary" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
								Data do Ajuizamento
							</p>
							<p className="text-sm font-medium text-foreground">
								{new Date(process.filingDate).toLocaleDateString("pt-BR", {
									day: "2-digit",
									month: "2-digit",
									year: "numeric"
								})}
							</p>
						</div>
					</div>

					{/* Valor da Causa */}
					<div className="flex items-start gap-3">
						<div className="mt-0.5">
							<DollarSign className="h-5 w-5 text-primary" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
								Valor da Causa
							</p>
							<p className="text-sm font-medium text-foreground">
								{process.caseValue}
							</p>
						</div>
					</div>
				</div>

				{/* Assunto e Descrição */}
				<div className="border-t pt-4 space-y-3">
					<div>
						<p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
							Assunto Principal do Processo
						</p>
						<p className="text-sm font-medium text-foreground">
							{process.subject}
						</p>
					</div>
					
					{process.description && (
						<div>
							<p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
								Descrição
							</p>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{process.description}
							</p>
						</div>
					)}
				</div>

				{/* Rodapé com informações de última atualização */}
				<div className="border-t mt-4 pt-4">
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<Clock className="h-3.5 w-3.5" />
						<span>
							Última atualização: {new Date(process.lastUpdate).toLocaleDateString("pt-BR", {
								day: "2-digit",
								month: "long",
								year: "numeric"
							})}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProcessHeader;

