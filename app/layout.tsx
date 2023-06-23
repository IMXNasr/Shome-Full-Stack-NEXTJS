import "./globals.css";

export const metadata = {
	title: "Shome",
	description: "Shome | A Movie Web App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="bg-bgDark text-white">{children}</body>
		</html>
	);
}
