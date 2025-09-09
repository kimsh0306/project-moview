// contexts/modal/ConfirmModalContext.jsx
import React, { createContext, useContext, useState } from "react";
import BSConfirmModal from "components/lib/BSConfirmModal/BSConfirmModal";

const ConfirmModalContext = createContext();

export const ConfirmModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    show: false,
    onClick: null,
    onHide: null,
    title: "",
    message: "",
    confirmText: "확인",
    confirmVariant: "primary",
  });

  const showConfirm = ({
    title = "",
    message = "",
    confirmText = "확인",
    confirmVariant = "primary",
    ...additionalProps
  }) => {
    return new Promise((resolve) => {
      setModalState({
        show: true,
        title,
        message,
        confirmText,
        confirmVariant,
        onClick: () => {
          resolve(true);
          closeModal();
        },
        onHide: () => {
          resolve(false);
          closeModal();
        },
        ...additionalProps,
      });
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({
      ...prev,
      show: false,
    }));
  };

  return (
    <ConfirmModalContext.Provider value={{ showConfirm }}>
      {children}
      <BSConfirmModal {...modalState} />
    </ConfirmModalContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmModalContext);
  if (!context) {
    throw new Error("useConfirm must be used within ConfirmModalProvider");
  }
  return context;
};
