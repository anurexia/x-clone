"use client";
import { ModalProvider } from "@/context/ModalContext";
import { SessionProvider } from "next-auth/react";

const SessionWrapper = ({ children }) => {
  return (
    <SessionProvider>
      <ModalProvider>{children}</ModalProvider>
    </SessionProvider>
  );
};

export default SessionWrapper;
