import { entity, type Entity } from "simpler-state";
import produce from "immer";

interface Modals {
  loginModal: boolean;
  apiRecommendationModal: boolean;
  bookmarksModal: boolean;
  aiSearchModal: boolean;
  quickFindPopover: boolean;
}

export const modals: Entity<Modals> = entity({
  loginModal: false,
  apiRecommendationModal: false,
  bookmarksModal: false,
  aiSearchModal: false,
  quickFindPopover: false,
} as Modals);

export const toggleModal = (modal: keyof Modals, value: boolean) => {
  modals.set(
    produce((modalsProxy) => {
      modalsProxy[modal] = value;
    })
  );
};
