import { entity, type Entity } from "simpler-state";
import produce from "immer";

interface Modal {
  loginModal: boolean;
}

export const modals: Entity<Modal> = entity({
  loginModal: false,
} as Modal);

export const toggleModal = (modal: string, value: boolean) => {
  modals.set(
    produce((draft) => {
      draft[modal] = value;
    })
  );
};
