"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function AdminPage() {
	const router = useRouter();
	const { isAdmin, user } = useAuthStore();

	useEffect(() => {
		if (user) {
			if (!isAdmin()) {
				router.push("/dashboard");
			} else {
				router.push("/admin/dashboard");
			}
		}
	}, [router, isAdmin, user]);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<p className="text-muted-foreground">Redirecionando...</p>
		</div>
	);
}

