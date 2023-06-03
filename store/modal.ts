import { entity, type Entity } from "simpler-state";
import produce from "immer";

interface Modal {
  loginModal: boolean;
  apiRecommendationModal: boolean;
  bookmarksModal: boolean;
  aiSearchModal: boolean;
  quickFindPopover: boolean;
}

export const modals: Entity<Modal> = entity({
  loginModal: false,
  apiRecommendationModal: false,
  bookmarksModal: false,
  aiSearchModal: false,
  quickFindPopover: false,
} as Modal);

export const toggleModal = (modal: string, value: boolean) => {
  modals.set(
    produce((draft) => {
      draft[modal] = value;
    })
  );
};
