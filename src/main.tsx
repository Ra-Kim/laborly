import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { StrictMode } from "react";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer limit={2}/>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
