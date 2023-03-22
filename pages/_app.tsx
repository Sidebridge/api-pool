import { useEffect, useState } from "react";
import type { AppProps } from "next/app";

import BaseModal from "@/components/common/base/BaseModal";
import "@/styles/globals.css";

import ApiDetails from "@/components/modals/api-details";
import LoginUI from "@/components/auth/LoginUI";

import { modals, toggleModal } from "@/store/modal";

import AuthProvider from "@/store/context/AuthProvider";
import ApiRequestForm from "@/components/modals/ApiRequestForm";

export default function App({ Component, pageProps }: AppProps) {
  const { loginModal, apiBriefModal, apiListingModal } = modals.use();

  return (
    <AuthProvider>
      <Component {...pageProps} />

      {apiBriefModal && (
        <BaseModal
          styles="border-2 border-grey border-opacity-50"
          isOpen={apiBriefModal}
          onClose={() => toggleModal("apiBriefModal", false)}
        >
          <ApiDetails />
        </BaseModal>
      )}

      {loginModal && (
        <BaseModal
          styles="border-t-2 border-primary"
          isOpen={loginModal}
          onClose={() => toggleModal("loginModal", false)}
        >
          <LoginUI />
        </BaseModal>
      )}

      {apiListingModal && (
        <BaseModal
          styles="border-t-2 border-primary"
          isOpen={apiListingModal}
          onClose={() => toggleModal("apiListingModal", false)}
        >
          <ApiRequestForm />
        </BaseModal>
      )}
    </AuthProvider>
  );
}
