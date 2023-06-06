import clsx from "clsx";
import AppIcon from "../common/icons";

const QuickFindPopover = ({ onClose }: { onClose: () => void }) => {
  const styles = {
    border: "border border-grey-border border-opacity-75",
  };

  const Tag = ({ text }: { text: string }) => (
    <span
      className={clsx(
        "mx-1 px-2 py-0.5 pb-1 text-center leading-relaxed rounded",
        styles.border
      )}
    >
      {text}
    </span>
  );

  return (
    <div className="">
      <div
        className={clsx(
          "w-full h-16  search-wrapper bg-body",
          "rounded-xl",
          styles.border
        )}
      ></div>

      <div
        className={clsx(
          "w-full text-light rounded-xl mt-2.5 p-6  search-wrapper bg-body",
          styles.border
        )}
      >
        <span className="items-center align-row">
          <AppIcon icon={"TipsGreen"} styles="mr-5" />
          <span className="font-light uppercase">Search Tips</span>
        </span>

        <p className="mt-5 text-sm font-light">
          Press <Tag text="esc" /> key to close
        </p>

        <div
          className={clsx("w-full my-5 border-[0.3px]", styles.border)}
        ></div>

        <p className="mt-5 text-sm font-light">
          Find APIs by <Tag text="Name" />
          {", "}
          <Tag text="Sector" />
          {", "}
          <Tag text="Description" />
          {", "}
          or <Tag text="Go to" /> certain pages
        </p>
      </div>
    </div>
  );
};

export default QuickFindPopover;
