import React, { useState, useCallback } from "react";

interface ModalProps {
  children: React.ReactNode;
}

const overlayStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 10000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px"
};

const modalStyles: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0)",
  borderRadius: "10px",
  zIndex: 10001,
  maxWidth: "500px",
};

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const Modal: React.FC<ModalProps> = ({ children }) => {
    if (!isOpen) return null;

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLDivElement).className === "modal-overlay") {
        closeModal();
      }
    };

    return (
      <div
        className="modal-overlay"
        style={overlayStyles}
        onClick={handleClickOutside}
      >
        <div className="modal-content" style={modalStyles}>
          {children}
        </div>
      </div>
    );
  };

  return {
    openModal,
    closeModal,
    Modal,
  };
};

export { useModal };
