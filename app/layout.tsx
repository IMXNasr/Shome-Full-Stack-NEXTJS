import "./globals.css";
import { Providers } from "@/components";

export const metadata = {
	title: "Shome",
	description: "Shome: Movie Web App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="bg-bgDark text-white">
				<Providers>
					{/* <Navbar /> */}
					{children}
				</Providers>
			</body>
		</html>
	);
}
