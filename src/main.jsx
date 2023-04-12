import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { i18n } from "@/services";
import "./index.css";

// React query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { I18nextProvider } from "react-i18next";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
			retry: 2
		}
	}
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<I18nextProvider i18n={i18n}>
			<QueryClientProvider client={queryClient}>
				<App />
				<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
			</QueryClientProvider>
		</I18nextProvider>
	</>
);
