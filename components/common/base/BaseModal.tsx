import clsx from "clsx";
import { useEffect } from "react";
import AppIcon from "../icons";

type BaseModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  styles?: string;
  innerWidth?: string;
  onClose: () => void;
};

const BaseModal = ({
  children,
  styles,
  isOpen = true,
  innerWidth = "45%",
  onClose,
}: BaseModalProps) => {
  function handleClose() {
    document.body.classList.remove("overflow-y-hidden");
    onClose();
  }

  useEffect(() => {
    document.body.classList.add("overflow-y-hidden");
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen modal"
          style={{ zIndex: 99 }}
        >
          <div className="absolute z-20 w-full h-full backdrop bg-dark bg-opacity-80 backdrop-blur"></div>

          <div
            className={clsx(
              "inner-modal z-30 absolute top-10 left-0 right-0 mx-auto",
              innerWidth
            )}
            style={{ maxHeight: "90%", width: `${innerWidth}` }}
          >
            <AppIcon
              icon="RoundCloseWhite"
              name="close-btn"
              styles="w-7 h-7 press ml-auto"
              onClick={handleClose}
            />

            <div
              className={clsx(
                "mt-4 w-full rounded-3xl  bg-dark-matte  overflow-y-scroll scrollbar-hide overflow-x-hidden",
                styles
              )}
              style={{ maxHeight: "85vh" }}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BaseModal;
