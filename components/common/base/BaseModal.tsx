import clsx from "clsx";
import AppIcon from "../icons";

type BaseModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  styles?: string;
  onClose: () => void;
};

const BaseModal = ({
  children,
  styles,
  isOpen = true,
  onClose,
}: BaseModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="w-screen h-screen fixed top-0 left-0 modal  z-50">
          <div
            className="backdrop w-full h-full absolute bg-dark bg-opacity-80 backdrop-blur z-20"
            onClick={onClose}
          ></div>

          <div
            className={clsx(
              "inner-modal z-30 absolute top-10 h-fit left-0 right-0 mx-auto w-5/12"
            )}
            style={{ maxHeight: "90%" }}
          >
            <AppIcon
              icon="RoundCloseWhite"
              name="close-btn"
              styles="w-7 h-7 press ml-auto"
              onClick={onClose}
            />

            <div
              className={clsx(
                "mt-4 w-full rounded-3xl h-fit bg-dark-matte  overflow-y-scroll",
                styles
              )}
              style={{ maxHeight: "95%" }}
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
