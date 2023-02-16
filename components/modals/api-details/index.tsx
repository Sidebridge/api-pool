import AppIcon from "@/components/common/icons";
import RatingStars from "@/components/common/util/RatingStars";
import clsx from "clsx";
import { useState } from "react";
import Brief from "./Brief";
import Reviews from "./Reviews";

const ApiDetails = () => {
  const [rate, setRate] = useState(0);

  function handleStarRating(star: number) {
    setRate(star);
  }

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
          {/* <div
            className={clsx(
              "press align-row items-center rounded-full text-white",
              "border-2 light-border  bg-grey-light leading-relaxed p-1.5 px-5",
              " hover:bg-dark"
            )}
          >
            <span>Write Review</span>
          </div> */}

          <div className="align-col">
            <span className="ml-auto text-2xl">
              <RatingStars
                rate={rate}
                type="fill"
                action="mark"
                onClick={(star) => handleStarRating(star)}
              />
            </span>
            <span className="text-xs text-white font-light text-right ml-auto">
              Rate your Experience
            </span>
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
