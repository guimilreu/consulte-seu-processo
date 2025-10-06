"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function Home() {
	const router = useRouter();
	const { isAuthenticated, user, isAdmin } = useAuthStore();

	useEffect(() => {
		if (isAuthenticated && user) {
			if (isAdmin()) {
				router.push("/admin/dashboard");
			} else {
				router.push("/dashboard");
			}
		} else {
			router.push("/login");
		}
	}, [isAuthenticated, user, isAdmin, router]);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<p className="text-muted-foreground">Redirecionando...</p>
		</div>
	);
}
