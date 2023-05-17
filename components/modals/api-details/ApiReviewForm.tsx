/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";

import cardClasses from "@/styles/api-card.module.css";

import BaseButton from "@/components/common/base/BaseButton";
import RatingStars from "@/components/common/util/RatingStars";
import FeaturedTag from "@/components/common/util/FeaturedTag";
import SupportedSDKs from "@/components/common/util/SupportedSDKLangs";
import BaseInput from "@/components/common/base/BaseInput";

import { supabaseClient } from "@/utils/services/supabase/client";

import { getApiReviews } from "@/store/api-reviews";
import type { ApiReview, ApiService } from "@/types/api-service.type";
import { useUser } from "@supabase/auth-helpers-react";

const ApiReviewForm = ({
  currentReview = null,
  service,
  onSave = () => {},
  onClose,
}: {
  currentReview?: ApiReview | null;
  service: ApiService;
  onSave?: () => void;
  onClose: () => void;
}) => {
  const user = useUser();

  const [rating, setApiRating] = useState<number>(0);

  const [reviewFormValues, setReviewFormValue] = useState({
    reviewer_name: "",
    reviewer_company: "",
    review_message: "",
  });

  const [isFetchingReview, setIsFetchingReview] = useState<boolean>(false);
  const [hasExistingReview, setHasExistingReview] = useState<boolean>(false);
  const [existingReviewId, setExistingReviewId] = useState<string | null>(null);

  const [isSavingReview, setIsSavingReview] = useState<boolean>(false);

  function handleFormUpdate(value: string, prop: string) {
    setReviewFormValue({ ...reviewFormValues, [prop]: value });
  }

  async function saveUserReview() {
    setIsSavingReview(true);

    const { data, error } = hasExistingReview
      ? await supabaseClient
          .from("api_reviews")
          .update({
            ...reviewFormValues,
            review_stars: rating,
            updated_at: new Date(),
          })
          .eq("id", existingReviewId)
      : await supabaseClient.from("api_reviews").insert({
          ...reviewFormValues,
          review_stars: rating,
          api_service_id: service.service_id,
          reviewer_id: user?.id || "",
        });

    if (error) {
      toast.error(error.message);

      return setIsSavingReview(false);
    }

    onSave();

    toast.success(
      `Awesome! Your review has been ${
        hasExistingReview ? "updated" : "added"
      } for ${service.service_name}'s API 🌟`,
      {
        duration: 4000,
      }
    );

    // await getApiReviews(service.service_id);

    setIsSavingReview(false);
    document.body.classList.remove("overflow-y-hidden");
    onClose();
  }

  function applyExistingReviewData(review: ApiReview) {
    setReviewFormValue({
      reviewer_name: review.reviewer_name || "",
      reviewer_company: review.reviewer_company || "",
      review_message: review.review_message || "",
    });

    setApiRating(review.review_stars || 0);
    setHasExistingReview(true);
    setExistingReviewId(review.id);
  }

  useEffect(() => {
    if (currentReview) {
      setHasExistingReview(true);
      return applyExistingReviewData(currentReview);
    }

    async function fetchExistingReview() {
      setIsFetchingReview(true);

      const { data, error } = await supabaseClient
        .from("api_reviews")
        .select()
        .eq("reviewer_id", "895ccb66-5bd3-41cf-912f-ead1490ca4d1")
        .eq("api_service_id", service.service_id)
        .single();

      if (error) {
        // toast.error(error.message);
        setHasExistingReview(false);

        return setIsFetchingReview(false);
      }

      if (data) {
        console.log("This is data: ", data);
        applyExistingReviewData(data);
      }

      setIsFetchingReview(false);
    }

    fetchExistingReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className="relative w-full p-6 centered-col bg-body">
      <h1 className="w-full text-lg font-medium text-light">Write A Review</h1>

      <div
        className={clsx(
          "relative w-full mt-6 p-5 pb-3 border border-dark rounded-2xl",
          cardClasses["detail-header__bg"],
          isFetchingReview && "disabled"
        )}
      >
        <div className="items-center row-btwn">
          <div className="p-4 border rounded-2xl w-fit service-logo bg-body border-dark centered_col">
            <img
              className={clsx("w-10 h-10")}
              src={service.logo || ""}
              alt={`${service.service_name} Logo`}
            />
          </div>

          <div className="align-col">
            <span className="ml-auto text-2xl">
              <RatingStars
                rate={rating}
                type="fill"
                action="mark"
                onClick={(star) => setApiRating(star)}
              />
            </span>
            <span className="mt-1 ml-auto text-xs font-light text-right text-grey-lighter">
              Rate Your Experience
            </span>
          </div>
        </div>

        <div className="items-center mt-6 align-row">
          <h1 className="mr-3 text-2xl font-bold text-light">
            {service.service_name}
          </h1>
          {service.is_featured && <FeaturedTag />}
        </div>

        <div className="flex-wrap items-center mt-4 text-sm align-row">
          <div className="p-1 px-3 mb-2 mr-2 capitalize rounded-full bg-accent">
            #{service.business_sector_name}
          </div>

          <SupportedSDKs
            langs={service.supported_languages}
            limit={5}
            styles="mb-2"
          />
        </div>
      </div>

      <div className="grid w-full grid-flow-row grid-cols-2 mt-5 gap-x-4">
        <BaseInput
          id="reviewer-name"
          label="Display Name"
          labelStyle="text-grey-lighter"
          inputStyle="rounded-lg"
          placeholder="e.g John Doe"
          value={reviewFormValues["reviewer_name"]}
          onChange={(value) => {
            handleFormUpdate(value, "reviewer_name");
          }}
        />

        <BaseInput
          id="reviewer-company"
          label="Company"
          labelStyle="text-grey-lighter"
          inputStyle="rounded-lg"
          placeholder="enter if you're reppin' a company"
          required={false}
          value={reviewFormValues["reviewer_company"]}
          onChange={(value) => {
            handleFormUpdate(value, "reviewer_company");
          }}
        />
      </div>

      <div className="w-full mt-4">
        <BaseInput
          id="review-message"
          label="Write Your Review"
          labelStyle="text-grey-lighter"
          inputStyle="rounded-lg"
          placeholder="How have you enjoyed using this API service? Rant out your mind! 😮‍💨"
          type="textarea"
          maxLength={250}
          row={4}
          value={reviewFormValues["review_message"]}
          onChange={(value) => {
            handleFormUpdate(value, "review_message");
          }}
        />
      </div>

      <BaseButton
        text={
          isSavingReview
            ? "Saving Review"
            : hasExistingReview
            ? "Update Review"
            : "Rant Your Review"
        }
        type="primary"
        styles="my-6 font-light mx-auto px-6"
        loading={isSavingReview}
        disabled={
          !(
            reviewFormValues["reviewer_name"] &&
            reviewFormValues["review_message"] &&
            rating
          )
        }
        loaderStyle="mr-2.5 w-4 h-4"
        onClick={saveUserReview}
      />
    </form>
  );
};

export default ApiReviewForm;
