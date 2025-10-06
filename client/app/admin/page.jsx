"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function AdminPage() {
	const router = useRouter();
	const { isAuthenticated, isAdmin } = useAuthStore();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/login");
		} else if (!isAdmin()) {
			router.push("/dashboard");
		} else {
			router.push("/admin/dashboard");
		}
	}, [isAuthenticated, isAdmin, router]);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<p className="text-muted-foreground">Redirecionando...</p>
		</div>
	);
}

