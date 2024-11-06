"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("Modal Context was used outside of ModalProvider");
  return context;
};

export { ModalProvider, useModal };
