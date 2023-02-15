import AppIcon from "@/components/common/icons";
import RatingStars from "@/components/common/util/RatingStars";
import { Input } from "antd";
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
          <RatingStars rate={3} />
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
      <div className="align-col w-full h-fit">
        <div className="w-full h-fit align-col">{reviewList}</div>

        {/* <form className="p-5 align-col text-white">
          <div className="align-col">
            <label htmlFor="reviewer-company">Company (Optional)</label>
            <Input placeholder="Enter your company's name" value={company} />
          </div>
        </form> */}
      </div>
    </>
  );
};

export default Reviews;
