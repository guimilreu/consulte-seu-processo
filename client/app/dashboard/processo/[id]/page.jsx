"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useProcessStore } from "@/store/process-store";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, Calendar, User } from "lucide-react";

const ProcessoDetalhes = () => {
	const router = useRouter();
	const params = useParams();
	const { selectedProcess, fetchProcess, exportToPdf, isLoading } = useProcessStore();

	useEffect(() => {
		if (params.id) {
			fetchProcess(params.id);
		}
	}, [params.id]);

	const handleExportPdf = () => {
		exportToPdf(selectedProcess.id);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-96">
				<p className="text-muted-foreground">Carregando...</p>
			</div>
		);
	}

	if (!selectedProcess) {
		return (
			<div className="flex items-center justify-center h-96">
				<div className="text-center">
					<p className="text-muted-foreground mb-4">Processo não encontrado</p>
					<Button onClick={() => router.push("/dashboard")}>
						<ArrowLeft className="h-4 w-4" />
						Voltar
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="flex items-start justify-between border-b pb-4">
				<div className="flex-1">
					<Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-4 -ml-4">
						<ArrowLeft className="h-4 w-4" />
						Voltar para Meus Processos
					</Button>
					<h1 className="text-2xl font-bold mb-2">{selectedProcess.title}</h1>
					<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
						<div className="flex items-center gap-2">
							<FileText className="h-4 w-4" />
							<span>{selectedProcess.processNumber}</span>
						</div>
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4" />
							<span>Criado em: {new Date(selectedProcess.createdAt).toLocaleDateString("pt-BR")}</span>
						</div>
						<span className={`px-2 py-1 rounded-full text-xs ${
							selectedProcess.status === "Concluído" 
								? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
								: selectedProcess.status === "Em andamento"
								? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
								: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
						}`}>
							{selectedProcess.status}
						</span>
					</div>
				</div>
				<Button onClick={handleExportPdf}>
					<Download className="h-4 w-4" />
					Exportar PDF
				</Button>
			</div>

			{/* Timeline */}
			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Linha do Tempo</h2>
				
				<div className="relative border-l-2 border-border ml-4 pl-8 space-y-8">
					{selectedProcess.timeline.map((item, index) => (
						<div key={item.id} className="relative">
							{/* Bolinha na linha */}
							<div className="absolute -left-[33px] top-2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
							
							<Card>
								<CardHeader>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-2">
												<Calendar className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm text-muted-foreground">
													{new Date(item.date).toLocaleDateString("pt-BR", {
														day: "2-digit",
														month: "long",
														year: "numeric"
													})}
												</span>
											</div>
											<CardTitle className="text-lg mb-2">{item.title}</CardTitle>
											<CardDescription className="text-base whitespace-pre-line">
												{item.text}
											</CardDescription>
										</div>
									</div>
								</CardHeader>
								
								{(item.attachments?.length > 0 || item.createdBy) && (
									<CardContent className="pt-0">
										<div className="flex flex-col gap-3 pt-3 border-t">
											{item.attachments?.length > 0 && (
												<div className="space-y-2">
													<p className="text-sm font-medium">Anexos:</p>
													{item.attachments.map((attachment) => (
														<Button
															key={attachment.id}
															variant="outline"
															size="sm"
															className="w-full justify-start"
														>
															<FileText className="h-4 w-4" />
															{attachment.name}
														</Button>
													))}
												</div>
											)}
											
											{item.createdBy && (
												<div className="flex items-center gap-2 text-xs text-muted-foreground">
													<User className="h-3 w-3" />
													<span>
														Atualizado por {item.createdBy} em{" "}
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
			</div>
		</div>
	);
};

export default ProcessoDetalhes;

