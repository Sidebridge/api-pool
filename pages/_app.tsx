// import { Offline } from "react-detect-offline";

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

import { isMobile } from "react-device-detect";

import GlobalModal from "@/components/modals/GlobalModals";
import MobilePlaceholder from "@/components/common/util/MobilePlaceholder";

import { modals, toggleModal } from "@/store/modal";
import { userApiBookmarks, getUserApiBookmarks } from "@/store/bookmarks";

import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const router = useRouter();

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
      keyboardEvent.key.toLowerCase() === "k"
    ) {
      toggleModal("aiSearchModal", true);
    }

    if (
      (keyboardEvent.ctrlKey || keyboardEvent.metaKey) &&
      keyboardEvent.key.toLowerCase() === "f"
    ) {
      toggleModal("quickFindPopover", true);
    }
  };

  useEffect(() => {
    if (isMobile) router.push("/mobile");

    // document.addEventListener("keydown", handleKeyDown);

    // return () => {
    //   document.removeEventListener("keydown", handleKeyDown);
    // };
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />

      <Toaster />

      {/* <Offline>
        <div className="z-[110] fixed bottom-0 w-full p-4 notice-banner centered-col">
          <p className="text-center">
            Network lost ⁉️. Please connect back to the internet to ensure the
            app continues to run smoothly.{" "}
          </p>
        </div>
      </Offline> */}

      <MobilePlaceholder />

      <GlobalModal />

      {/* <Analytics /> */}
    </SessionContextProvider>
  );
}
