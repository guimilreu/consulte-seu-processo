import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers/AuthProvider";

const lato = Lato({
	subsets: ["latin"],
	weight: ["400", "700"],
	display: "swap",
});

export const metadata = {
	title: "Consulte seu Processo",
	description: "Consulte seu Processo - Candido Pereira Sociedade de Advocacia",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${lato.className} antialiased`}>
				<AuthProvider>
					{children}
				</AuthProvider>
				<Toaster richColors position="top-right" />
			</body>
		</html>
	);
}
