import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ModalProvider from "./contexts/ModelsContext.tsx";
import AuthContextProvider from "./contexts/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ModalProvider>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </ModalProvider>
);
