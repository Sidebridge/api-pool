/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import Link from "next/link";
import TimeAgo from "react-timeago";

import AppIcon from "../icons";
import RatingStars from "./RatingStars";

const ActionableReviewCard = ({
  review,
  disabled,
  onEdit,
  onDelete,
}: {
  review: { [key: string]: any };
  disabled: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const styles = {
    actionBtn:
      "flex flex-grow h-full cursor-pointer hover:bg-dark p-3 hover:bg-opacity-40 centered-row opacity-40 hover:opacity-100",
  };

  return (
    <div className="box-border flex flex-grow w-full pt-5 overflow-y-hidden border cursor-default align-col card-inner__bg border-dark rounded-2xl text-light press">
      <div className="items-center mx-5 align-row">
        <div className="p-2 mr-6 border rounded-lg service-logo bg-body border-dark centered_col press">
          <Link href={`/api-service/${review.api_services.service_id}`}>
            {review.api_services.logo ? (
              <img
                className={clsx("w-6 h-6")}
                src={review.api_services.logo}
                alt={`${review.api_services.service_name} Logo`}
              />
            ) : (
              <AppIcon icon={"LogoPlaceholder"} name="service logo" />
            )}
          </Link>
        </div>

        <div className="align-col ">
          <Link href={`/api-service/${review.api_services.service_id}`}>
            <span className="cursor-pointer service-name text-grey-lighter hover:text-primary">
              {review.api_services.service_name}
            </span>
          </Link>

          <span className="text-xs font-light text-accent">
            {review.updated_at ? "Updated " : "Added "}
            <TimeAgo date={review.updated_at || review.created_at} />
          </span>
        </div>
      </div>
      <p className="mx-5 mt-4 mb-5 text-sm font-light text-grey-lighter">
        {review.review_message}
      </p>

      <div
        className={clsx(
          "items-center w-full border-t border-dark align-row",
          disabled && "disabled"
        )}
      >
        <div className={clsx(styles.actionBtn)} onClick={onEdit}>
          <AppIcon icon={"EditGreen"} styles="mr-2 w-5 h-5" />
          <span className="text-md text-primary">Edit Review</span>
        </div>
        <div className="border h-[70%] border-dark w-[2px]"></div>
        <div className={clsx(styles.actionBtn)} onClick={onDelete}>
          <AppIcon icon={"TrashRed"} styles="mr-2 w-5 h-5" />
          <span className="text-red-400 text-md">Delete</span>
        </div>
      </div>
    </div>
  );
};

export default ActionableReviewCard;
