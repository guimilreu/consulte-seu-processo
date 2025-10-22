"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, ChevronDown, Home, FileText, Users, Settings, User, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const Navbar = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { user, logout, isAdmin, isClient } = useAuthStore();

	// Navegação baseada no role
	const adminNavItems = [
		{ href: "/admin/dashboard", label: "Dashboard", icon: Home },
		{ href: "/admin/dashboard/processos", label: "Processos", icon: FileText },
		{ href: "/admin/dashboard/clientes", label: "Clientes", icon: Users },
		{ href: "/admin/dashboard/busca", label: "Busca", icon: Search },
	];

	const clientNavItems = [
		{ href: "/dashboard", label: "Meus Processos", icon: FileText },
	];

	const navItems = isAdmin() ? adminNavItems : clientNavItems;
	const homeLink = isAdmin() ? "/admin/dashboard" : "/dashboard";

	const handleLogout = () => {
		logout();
		router.push("/login");
	};

	if (!user) return null;

	// Função para obter as iniciais do nome
	const getInitials = (name) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	const userInitials = getInitials(user.name);

	// Formatação do role para exibição
	const getRoleLabel = () => {
		if (user.role === "admin") return "Administrador";
		if (user.role === "team") return "Equipe";
		return user.email;
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex h-16 items-center px-6">
				{/* Logo */}
				<div className="mr-8 flex items-center">
					<Link href={homeLink} className="flex items-center space-x-2">
						<span className="text-xl font-bold tracking-tight">LOGO</span>
					</Link>
				</div>

				{/* Navigation Links - Apenas para admins */}
				{isAdmin() && (
					<nav className="flex items-center gap-1 flex-1">
						{navItems.map((item) => {
							const Icon = item.icon;
							const isActive = pathname === item.href;

							return (
								<Button
									key={item.href}
									variant="ghost"
									size="sm"
									className={cn(
										"gap-2",
										isActive && "bg-accent text-accent-foreground"
									)}
									asChild
								>
									<Link href={item.href}>
										<Icon className="h-4 w-4" />
										{item.label}
									</Link>
								</Button>
							);
						})}
					</nav>
				)}

				{/* Spacer para clientes */}
				{isClient() && <div className="flex-1" />}

				{/* User Menu */}
				<div className="flex items-center gap-4">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="gap-2 pl-2 h-12">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
									{userInitials}
								</div>
								<div className="flex flex-col items-start text-left">
									<span className="text-sm font-medium">{user.name}</span>
									<span className="text-xs text-muted-foreground">{getRoleLabel()}</span>
								</div>
								<ChevronDown className="h-4 w-4 text-muted-foreground" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							{/* <DropdownMenuItem>
								<User className="mr-2 h-4 w-4" />
								<span>Perfil</span>
							</DropdownMenuItem> */}
							{/* <DropdownMenuSeparator /> */}
							<DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
								<LogOut className="h-4 w-4 text-destructive" />
								<span>Sair</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
};

export default Navbar;