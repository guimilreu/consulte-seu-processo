"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner2 } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/auth-store";

const LoginPage = () => {
	const router = useRouter();
	const { login, isLoading, error } = useAuthStore();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const result = await login(email, password);
		
		if (result.success) {
			// Redireciona baseado no role
			if (result.user.role === "admin" || result.user.role === "team") {
				router.push("/admin/dashboard");
			} else {
				router.push("/dashboard");
			}
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<h1 className="text-3xl font-bold tracking-tight">LOGO</h1>
					<p className="text-sm text-muted-foreground mt-2">Consulte seu Processo</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className="text-xl font-bold">Entrar</CardTitle>
						<CardDescription>Digite seu email e senha para acessar</CardDescription>
					</CardHeader>

					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="seu@email.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									disabled={isLoading}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="password">Senha</Label>
								<Input
									id="password"
									type="password"
									placeholder="••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									disabled={isLoading}
								/>
							</div>
							
							{error && <p className="text-sm text-destructive">{error}</p>}
						</CardContent>

						<CardFooter>
							<Button type="submit" className="w-full font-bold mt-6" disabled={isLoading}>
								{isLoading && <Spinner2 />}
								Entrar
							</Button>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default LoginPage;
