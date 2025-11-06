"use client";

import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit } from "lucide-react";

const ProcessViewDialog = ({ open, onOpenChange, process, onEdit }) => {
	if (!process) return null;

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

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="!max-w-4xl max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>Visualizar Processo</DialogTitle>
					<DialogDescription>
						{process.processNumber} - {process.clientName}
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className="max-h-[70vh] pr-4">
					<div className="space-y-6 py-4">
						{/* Cabeçalho */}
						<div className="border-b pb-4">
							<div className="flex items-start justify-between gap-4 mb-4">
								<div className="flex-1">
									<h3 className="text-xl font-bold mb-2">{process.actionType}</h3>
									<div className="flex flex-wrap items-center gap-2">
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
									</div>
								</div>
							</div>
						</div>

						{/* Informações do Processo */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<Label className="text-xs text-muted-foreground uppercase">Número do Processo</Label>
								<p className="text-sm font-medium mt-1 font-mono">{process.processNumber}</p>
							</div>
							<div>
								<Label className="text-xs text-muted-foreground uppercase">Cliente</Label>
								<p className="text-sm font-medium mt-1">{process.clientName}</p>
							</div>
							<div>
								<Label className="text-xs text-muted-foreground uppercase">Juízo/Foro</Label>
								<p className="text-sm font-medium mt-1">{process.court}</p>
							</div>
							<div>
								<Label className="text-xs text-muted-foreground uppercase">Autor</Label>
								<p className="text-sm font-medium mt-1">{process.plaintiff}</p>
							</div>
							<div>
								<Label className="text-xs text-muted-foreground uppercase">Réu</Label>
								<p className="text-sm font-medium mt-1">{process.defendant}</p>
							</div>
							<div>
								<Label className="text-xs text-muted-foreground uppercase">Data do Ajuizamento</Label>
								<p className="text-sm font-medium mt-1">
									{new Date(process.filingDate).toLocaleDateString("pt-BR")}
								</p>
							</div>
							<div>
								<Label className="text-xs text-muted-foreground uppercase">Valor da Causa</Label>
								<p className="text-sm font-medium mt-1">{process.caseValue}</p>
							</div>
							<div>
								<Label className="text-xs text-muted-foreground uppercase">Última Atualização</Label>
								<p className="text-sm font-medium mt-1">
									{new Date(process.lastUpdate).toLocaleDateString("pt-BR")}
								</p>
							</div>
						</div>

						{/* Assunto e Descrição */}
						<div className="space-y-3 border-t pt-4">
							<div>
								<Label className="text-xs text-muted-foreground uppercase">Assunto Principal</Label>
								<p className="text-sm font-medium mt-1">{process.subject}</p>
							</div>
							{process.description && (
								<div>
									<Label className="text-xs text-muted-foreground uppercase">Descrição</Label>
									<p className="text-sm text-muted-foreground mt-1 leading-relaxed whitespace-pre-line">
										{process.description}
									</p>
								</div>
							)}
						</div>

						{/* Timeline */}
						{process.timeline && process.timeline.length > 0 && (
							<div className="border-t pt-4">
								<Label className="text-xs text-muted-foreground uppercase mb-3 block">
									Andamentos ({process.timeline.length})
								</Label>
								<div className="space-y-3 max-h-60 overflow-y-auto">
									{[...process.timeline].reverse().map((item) => (
										<div key={item.id} className="border-l-2 border-primary pl-4 pb-3">
											<div className="flex items-start justify-between">
												<div className="flex-1">
													<p className="font-medium text-sm">{item.title}</p>
													<p className="text-xs text-muted-foreground mt-1">
														{new Date(item.date).toLocaleDateString("pt-BR")} - {item.createdBy}
													</p>
													<p className="text-sm text-muted-foreground mt-2 line-clamp-2">
														{item.text}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</ScrollArea>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Fechar
					</Button>
					{onEdit && (
						<Button onClick={onEdit}>
							<Edit className="h-4 w-4 mr-2" />
							Editar Dados
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ProcessViewDialog;

