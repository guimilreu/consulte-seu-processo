"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function Home() {
	const router = useRouter();
	const { user, isAdmin } = useAuthStore();

	useEffect(() => {
		if (user) {
			if (isAdmin()) {
				router.push("/admin/dashboard");
			} else {
				router.push("/dashboard");
			}
		} else {
			router.push("/login");
		}
	}, [router, user, isAdmin]);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<p className="text-muted-foreground">Redirecionando...</p>
		</div>
	);
}
