import { modals, toggleModal } from "@/store/modal";

import BaseModal from "@/components/common/base/BaseModal";
import LoginUI from "@/components/auth/LoginUI";
import ApiRequestForm from "@/components/modals/ApiRequestForm";
import BookmarksList from "@/components/modals/BookmarksList";
import AiSearchModal from "@/components/modals/AiSearchModal";

export const GlobalModals = () => {
  const { loginModal, apiRecommendationModal, bookmarksModal, aiSearchModal } =
    modals.use();

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
    </>
  );
};

export default GlobalModals;
