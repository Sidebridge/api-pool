import AppIcon from "@/components/common/icons";
import clsx from "clsx";
import Brief from "./Brief";
import Reviews from "./Reviews";

const ApiDetails = () => {
  return (
    <div className="align-col w-full bg-dark-matte text-white">
      <div className="detail-title w-full row-btwn border-b light-border p-5">
        <div className="title-left align-row content-start">
          <AppIcon icon="ArrowLeftGreen" name="arrow" styles="press -mt-4" />

          <div className="align-col ml-4">
            <h3 className="text-xl">Sendwave</h3>
            {/* <p className="font-light text-sm">
              Ratings & Reviews <span className="text-grey">(3 Reviews)</span>
            </p> */}
          </div>
        </div>

        <div className="title-right">
          <div
            className={clsx(
              "press align-row items-center rounded-full text-white",
              "border-2 light-border  bg-grey-light leading-relaxed p-1.5 px-5",
              " hover:bg-dark"
            )}
          >
            <span>Write Review</span>
          </div>
        </div>
      </div>

      <div className="detail-body w-full flex flex-grow overflow-y-scroll">
        {/* <Brief /> */}
        <Reviews />
      </div>
    </div>
  );
};

export default ApiDetails;
