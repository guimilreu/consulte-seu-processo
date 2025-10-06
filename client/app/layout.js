import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
	subsets: ["latin"],
	weight: ["400", "700"], // Example: Regular and Bold weights
	display: "swap", // Recommended for font loading optimization
});

export const metadata = {
	title: "Consulte seu Processo",
	description: "Consulte seu Processo - Candido Pereira Sociedade de Advocacia",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${lato.className} antialiased`}>{children}</body>
		</html>
	);
}
