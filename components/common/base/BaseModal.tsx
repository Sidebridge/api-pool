import AppIcon from "../icons";

type BaseModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const BaseModal = ({ children, isOpen = true, onClose }: BaseModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="w-screen h-screen fixed top-0 left-0 modal border border-green-600 z-50">
          <div
            className="backdrop w-full h-full absolute bg-dark bg-opacity-80 backdrop-blur z-20"
            onClick={onClose}
          ></div>

          <div
            className="inner-modal z-30 absolute top-10 h-fit left-0 right-0 mx-auto  w-5/12"
            style={{ maxHeight: "90%" }}
          >
            <AppIcon
              icon="RoundCloseWhite"
              name="close-btn"
              styles="w-7 h-7 press ml-auto"
              onClick={onClose}
            />

            <div
              className="mt-4 w-full rounded-3xl h-fit bg-dark-matte border-2 border-grey border-opacity-50 overflow-y-scroll"
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
