import AppIcon from "@/components/common/icons";
import RatingStars from "@/components/common/util/RatingStars";
import { Button, Input } from "antd";
import clsx from "clsx";
import { useState } from "react";

const Reviews = () => {
  const reviewList = [1, 2, 3].map((review) => (
    <div
      key={review}
      className={clsx(
        "align-col w-full text-grey text-sm py-3 px-5 cursor-default",
        "hover:bg-grey hover:bg-opacity-20 hover:text-gray-400"
      )}
    >
      <div className="row-btwn">
        <div className="centered-row">
          <div className="w-10 h-10 flex center border-2 light-border rounded-full mr-3">
            <AppIcon name="reviewer" icon="UserPrimary" />
          </div>

          <div className="align-col font-light">
            <span className="text-white text-base">Emmanuel Adams</span>
            <span className="">Company&apos;s Name</span>
          </div>
        </div>

        <div className="centered-row h-fit">
          <RatingStars rate={3} onClick={() => {}} />
        </div>
      </div>

      <div className="w-full mt-2.5 text-justify">
        <p>
          Lorem ipsum dolor sit amet consectetur. Faucibus in ullamcorper augue
          ultricies amet platea facilisis tortor. Sed placerat donec pretium
          mauris tristique. Non nunc tristique congue ultrices diam aliquet quam
          a. Arcu eget quam molestie sapien mattis eu massa. Neque sit odio ut
          quis ante sagittis neque. Quisque volutpat vitae venenatis at morbi
          metus semper amet lacus.
        </p>
      </div>
    </div>
  ));

  const [reviewerCompany] = useState("");

  return (
    <>
      <div className="align-col w-full h-auto">
        {/* <div className="w-full h-fit align-col">{reviewList}</div> */}

        <form className="p-5 align-col text-white">
          <div className="align-col">
            <label
              htmlFor="reviewer-company font-light"
              className="font-light w-fit"
            >
              Company (Optional)
            </label>
            <Input
              id="reviewer-company"
              className={clsx(
                "bg-transparent border light-border mt-2 rounded-3xl p-2 px-4 text-white text-lg",
                "placeholder:text-grey placeholder:font-light focus:outline-none focus:border-grey hover:border-grey"
              )}
              placeholder="Enter your company's name"
            />
          </div>

          <div className="align-col mt-4">
            <label htmlFor="reviewer-review" className="font-light w-fit">
              Review
            </label>
            <Input.TextArea
              id="reviewer-review"
              className={clsx(
                "bg-transparent border light-border mt-2 rounded-3xl p-4 py-2 text-white text-lg",
                "placeholder:text-grey placeholder:font-light focus:outline-none focus:border-grey hover:border-grey"
              )}
              placeholder="Share your experience using this API"
              maxLength={1000}
              rows={8}
            />
            <p className="w-full p-1.5 text-right text-grey font-light text-xs -mt-8 -ml-3">
              0/1000 words
            </p>
          </div>

          <Button
            className={clsx(
              "bg-primary text-dark border-none h-12 w-52 text-lg press mt-6 ml-auto",
              ""
            )}
            shape="round"
            type="ghost"
            icon=""
          >
            Submit Your Review
          </Button>
        </form>
      </div>
    </>
  );
};

export default Reviews;
