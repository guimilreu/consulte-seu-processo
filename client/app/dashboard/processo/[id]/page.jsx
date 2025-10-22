"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useProcessStore } from "@/store/process-store";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import ProcessHeader from "@/components/process/ProcessHeader";
import ProcessTimeline from "@/components/process/ProcessTimeline";

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
			{/* Botão Voltar e Exportar */}
			<div className="flex items-center justify-between">
				<Button variant="ghost" onClick={() => router.push("/dashboard")} className="-ml-4">
					<ArrowLeft className="h-4 w-4 mr-2" />
					Voltar para Meus Processos
				</Button>
				<Button onClick={handleExportPdf}>
					<Download className="h-4 w-4 mr-2" />
					Exportar Relatório PDF
				</Button>
			</div>

			{/* Cabeçalho do Processo */}
			<ProcessHeader process={selectedProcess} />

			{/* Timeline */}
			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Andamentos do Processo</h2>
				<ProcessTimeline 
					timeline={[...selectedProcess.timeline].reverse()} 
					isAdmin={false}
				/>
			</div>
		</div>
	);
};

export default ProcessoDetalhes;

