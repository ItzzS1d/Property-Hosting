import { useModal } from "../../contexts/ModelsContext";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Modal = () => {
  const { modal } = useModal();
  return (
    <>
      {modal === "login" && <LoginModal />}
      {modal === "register" && <RegisterModal />}
    </>
  );
};

export default Modal;
