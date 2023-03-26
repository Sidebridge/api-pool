import { entity, type Entity } from "simpler-state";
import produce from "immer";

interface Modal {
  loginModal: boolean;
  apiBriefModal: boolean;
  apiRecommendationModal: boolean;
}

export const modals: Entity<Modal> = entity({
  loginModal: false,
  apiBriefModal: false,
  apiRecommendationModal: false,
} as Modal);

export const toggleModal = (modal: string, value: boolean) => {
  modals.set(
    produce((draft) => {
      draft[modal] = value;
    })
  );
};
