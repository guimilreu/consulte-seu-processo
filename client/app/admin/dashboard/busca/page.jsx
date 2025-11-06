"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useProcessStore } from "@/store/process-store";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, FileText, Calendar, User } from "lucide-react";

const BuscaPage = () => {
	const router = useRouter();
	const { isAdmin, user } = useAuthStore();
	const { search, searchResults, clearSearch, isLoading } = useProcessStore();
	const [localSearch, setLocalSearch] = useState("");

	useEffect(() => {
		if (user && !isAdmin()) {
			router.push("/dashboard");
		}
	}, [router, isAdmin, user]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (localSearch) {
				search(localSearch);
			} else {
				clearSearch();
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [localSearch]);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col border-b pb-4">
				<h1 className="text-2xl font-bold">Busca de Processos</h1>
				<p className="text-sm text-muted-foreground">
					Busque por número do processo, cliente ou palavra-chave
				</p>
			</div>

			<div className="relative">
				<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="Digite o número do processo, nome do cliente ou palavra-chave..."
					className="pl-10"
					value={localSearch}
					onChange={(e) => setLocalSearch(e.target.value)}
				/>
			</div>

			{isLoading ? (
				<div className="flex items-center justify-center h-48">
					<p className="text-muted-foreground">Buscando...</p>
				</div>
			) : searchResults.length > 0 ? (
				<div className="space-y-2">
					<p className="text-sm text-muted-foreground">
						{searchResults.length} resultado{searchResults.length > 1 ? "s" : ""} encontrado{searchResults.length > 1 ? "s" : ""}
					</p>
					<div className="grid gap-4">
						{searchResults.map((process) => (
							<Card key={process.id} className="hover:shadow-md transition-shadow cursor-pointer">
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
													<User className="h-4 w-4" />
													<span>{process.clientName}</span>
												</div>
												<div className="flex items-center gap-2 text-muted-foreground">
													<Calendar className="h-4 w-4" />
													<span>Atualizado: {new Date(process.lastUpdate).toLocaleDateString("pt-BR")}</span>
												</div>
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
								</CardHeader>
							</Card>
						))}
					</div>
				</div>
			) : localSearch ? (
				<div className="flex flex-col items-center justify-center h-48 text-center">
					<Search className="h-12 w-12 text-muted-foreground mb-4" />
					<p className="text-muted-foreground">Nenhum resultado encontrado para "{localSearch}"</p>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center h-48 text-center">
					<Search className="h-12 w-12 text-muted-foreground mb-4" />
					<p className="text-muted-foreground">Digite algo para buscar processos</p>
				</div>
			)}
		</div>
	);
};

export default BuscaPage;
