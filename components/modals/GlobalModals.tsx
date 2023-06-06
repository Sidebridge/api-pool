import { modals, toggleModal } from "@/store/modal";

import BaseModal from "@/components/common/base/BaseModal";
import LoginUI from "@/components/auth/LoginUI";
import ApiRequestForm from "@/components/modals/ApiRequestForm";
import BookmarksList from "@/components/modals/BookmarksList";
import AiSearchModal from "@/components/modals/AiSearchModal";
import QuickFindPopover from "@/components/modals/QuickFindPopover";

export const GlobalModals = () => {
  const {
    loginModal,
    apiRecommendationModal,
    bookmarksModal,
    aiSearchModal,
    quickFindPopover,
  } = modals.use();

  return (
    <>
      <BaseModal
        styles="border-t-2 border-primary"
        isOpen={loginModal}
        onClose={() => toggleModal("loginModal", false)}
      >
        <LoginUI />
      </BaseModal>

      <BaseModal
        innerWidth="50%"
        isOpen={apiRecommendationModal}
        onClose={() => toggleModal("apiRecommendationModal", false)}
      >
        <ApiRequestForm
          onSubmitted={() => toggleModal("apiRecommendationModal", false)}
        />
      </BaseModal>

      <BaseModal
        innerWidth="60%"
        isOpen={bookmarksModal}
        onClose={() => toggleModal("bookmarksModal", false)}
      >
        <BookmarksList onClose={() => toggleModal("bookmarksModal", false)} />
      </BaseModal>

      <BaseModal
        innerWidth="60%"
        isOpen={aiSearchModal}
        onClose={() => toggleModal("aiSearchModal", false)}
      >
        <AiSearchModal onClose={() => toggleModal("aiSearchModal", false)} />
      </BaseModal>

      <BaseModal
        innerWidth="60%"
        isOpen={quickFindPopover}
        showCloseBtn={false}
        styles="mt-20 bg-transparent rounded-none"
        onClose={() => toggleModal("quickFindPopover", false)}
        onOutClick={() => toggleModal("quickFindPopover", false)}
      >
        <QuickFindPopover
          onClose={() => toggleModal("quickFindPopover", false)}
        />
      </BaseModal>
    </>
  );
};

export default GlobalModals;
