"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function AuthProvider({ children }) {
	const pathname = usePathname();
	const { loadUser, user } = useAuthStore();
	const hasLoaded = useRef(false);

	useEffect(() => {
		const publicRoutes = ['/login', '/'];
		if (!publicRoutes.includes(pathname) && !user && !hasLoaded.current) {
			hasLoaded.current = true;
			loadUser();
		}
	}, [pathname, loadUser, user]);

	return <>{children}</>;
}

