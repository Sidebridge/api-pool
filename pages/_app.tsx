import { useState } from "react";
import type { AppProps } from "next/app";

import BaseModal from "@/components/common/base/BaseModal";
import "@/styles/globals.css";

import MainLayout from "../components/layout/MainLayout";
import ApiDetails from "@/components/modals/api-details";

export default function App({ Component, pageProps }: AppProps) {
  const [isModalOpen, setModalState] = useState(true);

  function toggleModal(state: boolean) {
    setModalState(state);
  }

  return (
    <>
      <Component {...pageProps} />

      <BaseModal isOpen={isModalOpen} onClose={() => toggleModal(false)}>
        <ApiDetails />
      </BaseModal>
    </>
  );
}
