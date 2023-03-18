import { useEffect, useState } from "react";
import type { AppProps } from "next/app";

import BaseModal from "@/components/common/base/BaseModal";
import "@/styles/globals.css";

import ApiDetails from "@/components/modals/api-details";
import LoginUI from "@/components/auth/LoginUI";
import SupabaseAuthUI from "@/components/auth/SupabaseAuthUI";

import { modals, toggleModal } from "@/store/modal";
import { auth, setUser } from "@/store/auth";

import { useRouter } from "next/router";
import useSuperbase from "@/hooks/use-superbase";

import AuthProvider from "@/store/context/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  const { loginModal } = modals.use();

  const router = useRouter();

  console.log("Router params: ", router.query);

  const { supabaseClient } = useSuperbase();

  const user = supabaseClient.auth
    .getUser()
    .then((data) => data.data.user)
    .catch((err) => console.log(err));

  setUser(user);

  return (
    <AuthProvider>
      <Component {...pageProps} />

      {/* <BaseModal
        styles="border-2 border-grey border-opacity-50"
        isOpen={false}
        onClose={() => toggleModal(false)}
      >
        <ApiDetails />
      </BaseModal> */}

      {loginModal && (
        <BaseModal
          styles="border-t-2 border-primary"
          isOpen={loginModal}
          onClose={() => toggleModal("loginModal", false)}
        >
          <LoginUI />

          {/* <SupabaseAuthUI /> */}
        </BaseModal>
      )}
    </AuthProvider>
  );
}
