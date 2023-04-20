import useSWR from "swr";

import { entity, type Entity } from "simpler-state";
import produce from "immer";

import { supabaseClient } from "@/utils/services/supabase/client";

export const apiReviews: Entity<{ [key: string]: string }[]> = entity(
  [] as { [key: string]: string }[]
);

export const avgReviewRating: Entity<number> = entity(0);

export const setApiReviews = (value: { [key: string]: string }[]) => {
  apiReviews.set(value);
};

export const setApiAverageRating = (value: number) => {
  avgReviewRating.set(value);
};

export const getApiReviews = async (apiServiceId: string) => {
  const { data, error } = await supabaseClient
    .from("api_reviews")
    .select("*")
    .eq("api_service_id", apiServiceId);

  if (error) {
    setApiReviews([]);
  }

  if (data) {
    setApiReviews(data as { [key: string]: string }[]);
  }

  await fetchAverageReviewStars(
    data as { [key: string]: string }[],
    apiServiceId
  );
};

export const fetchAverageReviewStars = async (
  data: { [key: string]: any }[],
  apiServiceId: string
) => {
  // const { data, error } = await supabaseClient
  //   .from("reviews")
  //   .select("service_id, avg(review_stars)")
  //   .eq("api_service_id", apiServiceId);

  // if (error) {
  //   console.error(error);
  //   return;
  // }

  // console.log("Average rating data: ", data);

  if (data) {
    if (!data.length) return avgReviewRating.set(0);

    let totalReviewRatings = 0;

    for (let review of data) {
      if (review.review_stars) {
        totalReviewRatings = totalReviewRatings + review.review_stars;
      }
    }

    const avgRating: number = totalReviewRatings / data.length;

    avgReviewRating.set(avgRating);
  }
};
