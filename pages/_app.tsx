import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  useUser,
  SessionContextProvider,
  Session,
} from "@supabase/auth-helpers-react";

// import { Analytics } from "@vercel/analytics/react";

import { Toaster } from "react-hot-toast";

import "@/styles/global.css";
import "@/styles/animation.css";
import "@/styles/loader.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ApiDetails from "@/components/modals/api-details";
import LoginUI from "@/components/auth/LoginUI";
import ApiRequestForm from "@/components/modals/ApiRequestForm";
import BaseModal from "@/components/common/base/BaseModal";
import BookmarksList from "@/components/modals/BookmarksList";

import { modals, toggleModal } from "@/store/modal";
import { userApiBookmarks, getUserApiBookmarks } from "@/store/bookmarks";

import { Database } from "@/types/supabase";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

  const user = useUser();

  const { loginModal, apiBriefModal, apiRecommendationModal, bookmarksModal } =
    modals.use();
  const allApiBookmarks = userApiBookmarks.use();

  useEffect(() => {
    if (user) {
      if (!allApiBookmarks || allApiBookmarks.length === 0) {
        getUserApiBookmarks(user?.id || "");
      }
    }
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
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
          innerWidth="50%"
          isOpen={apiRecommendationModal}
          onClose={() => toggleModal("apiRecommendationModal", false)}
        >
          <ApiRequestForm
            onSubmitted={() => toggleModal("apiRecommendationModal", false)}
          />
        </BaseModal>
      )}

      {bookmarksModal && (
        <BaseModal
          innerWidth="60%"
          isOpen={bookmarksModal}
          onClose={() => toggleModal("bookmarksModal", false)}
        >
          <BookmarksList onClose={() => toggleModal("bookmarksModal", false)} />
        </BaseModal>
      )}

      {/* <Analytics /> */}
    </SessionContextProvider>
  );
}
