"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Calendar,
	User,
	FileText,
	Download,
	MessageSquare,
	Scale,
	Trash2,
	Edit,
	AlertCircle
} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

const ProcessTimeline = ({ timeline, onDelete, onEdit, isAdmin = false }) => {
	const [deleteDialog, setDeleteDialog] = useState({ open: false, item: null });

	const getTimelineIcon = (type) => {
		if (type === "comment") {
			return <MessageSquare className="h-5 w-5" />;
		}
		return <Scale className="h-5 w-5" />;
	};

	const getTimelineColor = (type) => {
		if (type === "comment") {
			return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950";
		}
		return "text-primary bg-primary/10";
	};

	const handleDeleteConfirm = () => {
		if (deleteDialog.item && onDelete) {
			onDelete(deleteDialog.item.id);
		}
		setDeleteDialog({ open: false, item: null });
	};

	return (
		<>
			<div className="relative border-l-2 border-border ml-4 pl-8 space-y-8">
				{timeline.map((item, index) => (
					<div key={item.id} className="relative">
						{/* Ícone na linha do tempo */}
						<div 
							className={`absolute -left-[43px] top-2 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center ${getTimelineColor(item.type)}`}
						>
							{getTimelineIcon(item.type)}
						</div>

						<Card>
							<CardHeader>
								<div className="flex items-start justify-between gap-4">
									<div className="flex-1 space-y-3">
										{/* Data e Badge de Tipo */}
										<div className="flex items-center gap-3 flex-wrap">
											<div className="flex items-center gap-2 text-muted-foreground">
												<Calendar className="h-4 w-4" />
												<span className="text-sm font-medium">
													{new Date(item.date).toLocaleDateString("pt-BR", {
														day: "2-digit",
														month: "long",
														year: "numeric"
													})}
												</span>
											</div>
											<Badge 
												variant={item.type === "comment" ? "secondary" : "default"}
												className="text-xs"
											>
												{item.type === "comment" ? (
													<>
														<MessageSquare className="h-3 w-3 mr-1" />
														Comentário do Advogado
													</>
												) : (
													<>
														<Scale className="h-3 w-3 mr-1" />
														Andamento Oficial
													</>
												)}
											</Badge>
										</div>

										{/* Título */}
										<CardTitle className="text-lg">
											{item.title}
										</CardTitle>

										{/* Descrição */}
										<CardDescription className="text-base whitespace-pre-line leading-relaxed">
											{item.text}
										</CardDescription>
									</div>

									{/* Botões de Ação (apenas para admin) */}
									{isAdmin && (
										<div className="flex gap-2">
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8"
												onClick={() => setDeleteDialog({ open: true, item })}
											>
												<Trash2 className="h-4 w-4 text-destructive" />
											</Button>
										</div>
									)}
								</div>
							</CardHeader>

							{/* Anexos e Informações de Autor */}
							{(item.attachments?.length > 0 || item.createdBy) && (
								<CardContent className="pt-0">
									<div className="flex flex-col gap-3 pt-3 border-t">
										{/* Anexos */}
										{item.attachments?.length > 0 && (
											<div className="space-y-2">
												<p className="text-sm font-medium flex items-center gap-2">
													<FileText className="h-4 w-4" />
													Anexos ({item.attachments.length})
												</p>
												<div className="grid gap-2">
													{item.attachments.map((attachment) => (
														<Button
															key={attachment.id}
															variant="outline"
															size="sm"
															className="w-full justify-start hover:bg-accent"
															onClick={() => {
																// No futuro: fazer download do arquivo
																alert(`Download de: ${attachment.name}`);
															}}
														>
															<FileText className="h-4 w-4 mr-2" />
															<span className="flex-1 text-left truncate">
																{attachment.name}
															</span>
															<Download className="h-4 w-4 ml-2 flex-shrink-0" />
														</Button>
													))}
												</div>
											</div>
										)}

										{/* Informações de criação */}
										{item.createdBy && (
											<div className="flex items-center gap-2 text-xs text-muted-foreground">
												<User className="h-3 w-3" />
												<span>
													Atualizado por <span className="font-medium">{item.createdBy}</span> em{" "}
													{new Date(item.createdAt).toLocaleString("pt-BR")}
												</span>
											</div>
										)}
									</div>
								</CardContent>
							)}
						</Card>
					</div>
				))}
			</div>

			{/* Dialog de Confirmação de Exclusão */}
			<Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, item: null })}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirmar Exclusão</DialogTitle>
						<DialogDescription>
							Tem certeza que deseja excluir este andamento?
						</DialogDescription>
					</DialogHeader>
					{deleteDialog.item && (
						<div className="py-4">
							<Card className="bg-muted/50">
								<CardHeader>
									<CardTitle className="text-base">{deleteDialog.item.title}</CardTitle>
									<CardDescription className="text-sm">
										{new Date(deleteDialog.item.date).toLocaleDateString("pt-BR")}
									</CardDescription>
								</CardHeader>
							</Card>
							<div className="flex items-start gap-2 mt-4 p-3 bg-destructive/10 rounded-md border border-destructive/20">
								<AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
								<p className="text-sm text-destructive">
									Esta ação não pode ser desfeita. O andamento será permanentemente removido do processo.
								</p>
							</div>
						</div>
					)}
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setDeleteDialog({ open: false, item: null })}
						>
							Cancelar
						</Button>
						<Button
							variant="destructive"
							onClick={handleDeleteConfirm}
						>
							<Trash2 className="h-4 w-4 mr-2" />
							Excluir Andamento
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ProcessTimeline;

