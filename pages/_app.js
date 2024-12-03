import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme, ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { ClerkProvider } from "@clerk/nextjs";
export default function App({ Component, pageProps }) {

	useEffect(() => {
		// Dynamically import Bootstrap JS only on the client side
		if (typeof document !== "undefined") {
			require("bootstrap/dist/js/bootstrap.bundle.min.js");
		}
	}, []);


	return (
		<ThemeProvider>
			<ThemeWrapper>
				<ClerkProvider>
					<Navbar />
					<Component {...pageProps} />
				</ClerkProvider>

			</ThemeWrapper>
		</ThemeProvider>
	);
}

function ThemeWrapper({ children }) {
	const { theme } = useTheme();

	useEffect(() => {
		// Dynamically update the body class based on the theme
		document.body.className = theme;
	}, [theme]);

	return <>{children}</>;
}

