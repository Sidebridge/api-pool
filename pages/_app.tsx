import { useState } from "react";
import type { AppProps } from "next/app";

import BaseModal from "@/components/common/base/BaseModal";
import "@/styles/globals.css";

import ApiDetails from "@/components/modals/api-details";
import LoginOptions from "@/components/modals/LoginOptions";

export default function App({ Component, pageProps }: AppProps) {
  const [isModalOpen, setModalState] = useState(true);

  function toggleModal(state: boolean) {
    setModalState(state);
  }

  return (
    <>
      <Component {...pageProps} />

      <BaseModal
        styles="border-2 border-grey border-opacity-50"
        isOpen={false}
        onClose={() => toggleModal(false)}
      >
        <ApiDetails />
      </BaseModal>

      <BaseModal
        styles="border-t-2 border-primary"
        isOpen={isModalOpen}
        onClose={() => toggleModal(false)}
      >
        <LoginOptions />
      </BaseModal>
    </>
  );
}
