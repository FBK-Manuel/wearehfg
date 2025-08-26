import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthProvider.tsx";
// import { CurrencyProvider } from "./context/CurrencyContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {/* <CurrencyProvider> */}
          <App />
          {/* </CurrencyProvider> */}
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
