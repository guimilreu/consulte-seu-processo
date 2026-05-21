"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner2 } from "@/components/ui/spinner";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

const SetupPasswordForm = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { user, loadUser } = useAuthStore();
	const token = searchParams.get("token");

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (user) {
			if (user.role === "admin" || user.role === "lawyer") {
				router.push("/admin/dashboard");
			} else {
				router.push("/dashboard");
			}
		}
	}, [router, user]);

	useEffect(() => {
		if (!token) {
			setError("Link inválido. Solicite um novo link ao administrador.");
		}
	}, [token]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		if (!token) return;

		if (password.length < 8) {
			setError("A senha deve ter pelo menos 8 caracteres.");
			return;
		}

		if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
			setError("A senha deve conter letras e números.");
			return;
		}

		if (password !== confirmPassword) {
			setError("As senhas não coincidem.");
			return;
		}

		setIsLoading(true);

		try {
			await api.post("/auth/setup-password", { token, password });
			await loadUser();

			const currentUser = useAuthStore.getState().user;
			if (currentUser?.role === "admin" || currentUser?.role === "lawyer") {
				router.push("/admin/dashboard");
			} else {
				router.push("/dashboard");
			}
		} catch (err) {
			setError(err.message || "Erro ao definir senha. O link pode ter expirado.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-md flex flex-col gap-4">
				<img src="/logo-1.svg" alt="Consulte seu Processo" className="h-16 mx-auto mb-2" />

				<Card>
					<CardHeader>
						<CardTitle className="text-xl font-bold">Definir Senha</CardTitle>
						<CardDescription>Crie sua senha para acessar o sistema</CardDescription>
					</CardHeader>

					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="password">Nova senha</Label>
								<Input
									id="password"
									type="password"
									placeholder="Mínimo 8 caracteres"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									disabled={isLoading || !token}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="confirmPassword">Confirmar senha</Label>
								<Input
									id="confirmPassword"
									type="password"
									placeholder="Repita a senha"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									disabled={isLoading || !token}
								/>
							</div>

							{error && <p className="text-sm text-destructive">{error}</p>}
						</CardContent>

						<CardFooter>
							<Button type="submit" className="w-full font-bold mt-6" disabled={isLoading || !token}>
								{isLoading && <Spinner2 />}
								Definir Senha e Entrar
							</Button>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	);
};

const SetupPasswordPage = () => (
	<Suspense fallback={
		<div className="min-h-screen flex items-center justify-center">
			<p className="text-muted-foreground">Carregando...</p>
		</div>
	}>
		<SetupPasswordForm />
	</Suspense>
);

export default SetupPasswordPage;
