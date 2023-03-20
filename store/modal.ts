import { entity, type Entity } from "simpler-state";
import produce from "immer";

interface Modal {
  loginModal: boolean;
  apiBriefModal: boolean;
}

export const modals: Entity<Modal> = entity({
  loginModal: false,
  apiBriefModal: false,
} as Modal);

export const toggleModal = (modal: string, value: boolean) => {
  modals.set(
    produce((draft) => {
      draft[modal] = value;
    })
  );
};
