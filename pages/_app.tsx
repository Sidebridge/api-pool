import { Offline } from "react-detect-offline";

import { KeyboardEvent, useEffect, useState } from "react";
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

import LoginUI from "@/components/auth/LoginUI";
import ApiRequestForm from "@/components/modals/ApiRequestForm";
import BaseModal from "@/components/common/base/BaseModal";
import BookmarksList from "@/components/modals/BookmarksList";

import { modals, toggleModal } from "@/store/modal";
import { userApiBookmarks, getUserApiBookmarks } from "@/store/bookmarks";

import { Database } from "@/types/supabase";
import AiSearchModal from "@/components/modals/AiSearchModal";
import MobilePlaceholder from "@/components/common/util/MobilePlaceholder";

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

  const { loginModal, apiRecommendationModal, bookmarksModal, aiSearchModal } =
    modals.use();
  const allApiBookmarks = userApiBookmarks.use();

  useEffect(() => {
    if (user) {
      if (!allApiBookmarks || allApiBookmarks.length === 0) {
        getUserApiBookmarks(user?.id || "");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = (event: Event) => {
    const keyboardEvent = event as unknown as KeyboardEvent;
    if (
      (keyboardEvent.ctrlKey || keyboardEvent.metaKey) &&
      keyboardEvent.key === "k"
    ) {
      toggleModal("aiSearchModal", true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />

      <Toaster />

      <Offline>
        <div className="z-[110] fixed bottom-0 w-full p-4 notice-banner bg-red-300 centered-col">
          <p className="text-center">
            Network lost ⁉️. Please connect back to the internet to ensure the
            app continues to run smoothly.{" "}
          </p>
        </div>
      </Offline>

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

      {aiSearchModal && (
        <BaseModal
          innerWidth="60%"
          isOpen={aiSearchModal}
          onClose={() => toggleModal("aiSearchModal", false)}
        >
          <AiSearchModal onClose={() => toggleModal("aiSearchModal", false)} />
        </BaseModal>
      )}

      <MobilePlaceholder />

      {/* <Analytics /> */}
    </SessionContextProvider>
  );
}
