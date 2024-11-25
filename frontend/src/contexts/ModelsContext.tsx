import { useState, useContext, createContext, type ReactNode } from "react";

interface ModalTyes {
  modal: "login" | "register" | null;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  closeModal: () => void;
}

const modalContext = createContext<ModalTyes | null>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<"login" | "register" | null>(null);

  const openLoginModal = () => setModal("login");
  const openRegisterModal = () => setModal("register");
  const closeModal = () => setModal(null);

  return (
    <modalContext.Provider
      value={{ openLoginModal, openRegisterModal, modal, closeModal }}
    >
      {children}
    </modalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(modalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};

export default ModalProvider;
