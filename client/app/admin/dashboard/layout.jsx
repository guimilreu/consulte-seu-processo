"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import Navbar from "@/components/layout/Navbar";

const AdminDashboardLayout = ({ children }) => {
	const router = useRouter();
	const { isAdmin, user } = useAuthStore();

	useEffect(() => {
		if (user && !isAdmin()) {
			router.push("/dashboard");
		}
	}, [router, isAdmin, user]);

	if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-muted-foreground">Carregando...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			<Navbar />
			<div className="container mx-auto px-6 pt-8 max-w-7xl pb-12">
				{children}
			</div>
		</div>
	);
};

export default AdminDashboardLayout;
