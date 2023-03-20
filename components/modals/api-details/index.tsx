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
    <div className="w-full text-white align-col bg-dark-matte">
      <div className="w-full p-5 border-b detail-title row-btwn light-border">
        <div className="content-start title-left align-row">
          <AppIcon icon="ArrowLeftGreen" name="arrow" styles="press -mt-4" />

          <div className="ml-4 align-col">
            <h3 className="text-xl">Sendwave</h3>
            {/* <p className="text-sm font-light">
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
            <span className="ml-auto text-xs font-light text-right text-white">
              Rate your Experience
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-grow w-full overflow-y-scroll detail-body">
        {/* <Brief /> */}
        <Reviews />
      </div>
    </div>
  );
};

export default ApiDetails;
