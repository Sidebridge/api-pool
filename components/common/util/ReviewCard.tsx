import { ApiReview } from "@/types/api-service.type";
import TimeAgo from "react-timeago";

import AppIcon from "../icons";
import RatingStars from "./RatingStars";

const ReviewCard = ({ review }: { review: ApiReview }) => {
  return (
    <div className="box-border flex flex-grow w-full px-5 py-5 overflow-y-hidden border cursor-default align-col card-inner__bg border-dark rounded-2xl text-light">
      <div className="items-center align-row">
        <div
          className="items-center p-4 mr-4 rounded-md border-dark align-col"
          style={{ border: "0.8px solid #151515" }}
        >
          <AppIcon icon="UserPrimary" name="user" />
        </div>

        <div className="align-col">
          <span className="reviewer-name text-grey-lighter">
            {review.reviewer_name}
          </span>
          <span className="text-xs font-light text-primary">
            {review.reviewer_company || "Individual"}
          </span>
        </div>
      </div>
      <p className="mt-4 mb-10 text-sm text-grey-lighter">
        {review.review_message}
      </p>

      <div className="items-center mt-auto align-row">
        <span className="mr-2.5 text-grey-lighter">
          {review.review_stars?.toFixed(1)}
        </span>
        <RatingStars rate={review.review_stars || 0} type="fill" />
        <span className="ml-auto text-xs italic font-light capitalize text-grey-lighter">
          {review.updated_at ? "Updated " : "Added "}
          <TimeAgo date={review.updated_at || review.created_at} />
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
