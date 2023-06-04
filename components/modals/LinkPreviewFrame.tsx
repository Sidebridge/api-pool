import { Tooltip } from "antd";
import clsx from "clsx";
import Link from "next/link";

import AppIcon from "../common/icons";

type PreviewFrameProps = {
  children: React.ReactNode;
  isOpen: boolean;
  styles?: string;
  innerWidth?: string;
  srcLink: string;
  onClose: () => void;
};

const LinkPreviewFrame = ({
  children,
  styles,
  isOpen = true,
  innerWidth = "90%",
  srcLink,
  onClose,
}: PreviewFrameProps) => {
  if (!isOpen) return null;

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
              "inner-modal z-30 absolute top-5 left-0 right-0 mx-auto align-row",
              innerWidth
            )}
            style={{ height: "100%", width: `${innerWidth}` }}
          >
            <div
              className={clsx(
                "w-full rounded-lg  bg-light  overflow-y-scroll scrollbar-hide",
                styles
              )}
              style={{ height: "95vh" }}
            >
              {children}
            </div>

            <div className="ml-4 action-btns align-col">
              <Tooltip title="Close Preview" placement="left">
                <AppIcon
                  icon="RoundCloseWhite"
                  name="close-btn"
                  styles="w-10 h-10 press rounded-full hover:border-2 hover:border-red-400"
                  onClick={onClose}
                />
              </Tooltip>

              <Tooltip title="Expand Link" placement="bottomRight">
                <Link href={srcLink} target="_blank">
                  <AppIcon
                    icon="ExpandRoundWhite"
                    name="close-btn"
                    styles="w-8 h-8 press mt-3 ml-1"
                  />
                </Link>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LinkPreviewFrame;
