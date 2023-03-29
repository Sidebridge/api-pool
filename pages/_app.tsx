import { useEffect, useState } from "react";
import type { AppProps } from "next/app";

import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";

import ApiDetails from "@/components/modals/api-details";
import LoginUI from "@/components/auth/LoginUI";
import ApiRequestForm from "@/components/modals/ApiRequestForm";
import BaseModal from "@/components/common/base/BaseModal";

import { modals, toggleModal } from "@/store/modal";

import AuthProvider from "@/store/context/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  const { loginModal, apiBriefModal, apiRecommendationModal } = modals.use();

  return (
    <AuthProvider>
      <Component {...pageProps} />

      <Toaster />

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

      {apiRecommendationModal && (
        <BaseModal
          styles="border-t-2 border-primary"
          isOpen={apiRecommendationModal}
          onClose={() => toggleModal("apiRecommendationModal", false)}
        >
          <ApiRequestForm
            onSubmitted={() => toggleModal("apiRecommendationModal", false)}
          />
        </BaseModal>
      )}
    </AuthProvider>
  );
}
