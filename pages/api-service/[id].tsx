/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { isTablet } from "react-device-detect";

import cardClasses from "@/styles/api-card.module.css";

import { Tooltip } from "antd";
import AppIcon from "@/components/common/icons";
import MainLayout from "@/components/layout/MainLayout";
import FeaturedTag from "@/components/common/util/FeaturedTag";
import BaseButton from "@/components/common/base/BaseButton";
import ReviewCard from "@/components/common/util/ReviewCard";
import RatingStars from "@/components/common/util/RatingStars";
import Explore from "@/components/landing-page/ExploreSection";
import NewsletterSub from "@/components/landing-page/NewsletterSub";
import BaseModal from "@/components/common/base/BaseModal";
import ApiBlogPosts from "@/components/modals/api-details/ApiBlogPosts";
import ApiReviewForm from "@/components/modals/api-details/ApiReviewForm";
import SupportedSDKs from "@/components/common/util/SupportedSDKLangs";

import {
  apiReviews,
  avgReviewRating,
  getApiReviews,
} from "@/store/api-reviews";
import {
  currentAPI,
  relatedApiServices,
  getRelatedAPIServicesBySector,
} from "@/store/api-services";

import type { ApiService } from "@/types/api-service.type";

import { supabaseClient } from "@/utils/services/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";
import { Database } from "@/types/supabase";

import LinkPreviewFrame from "@/components/modals/LinkPreviewFrame";

import api from "@/utils/services/axios";
import toast from "react-hot-toast";
import { userApiBookmarks, getUserApiBookmarks } from "@/store/bookmarks";

const ApiDetails = ({ currentApiDetail }: { currentApiDetail: ApiService }) => {
  const router = useRouter();
  const user = useUser();

  const allUserBookmarks = userApiBookmarks.use();

  const existsInBookmarks = !!allUserBookmarks.find(
    (bookmark) =>
      bookmark.api_services.service_id === currentApiDetail.service_id
  );

  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    true && existsInBookmarks
  );

  const [isShowingRelatedArticles, setArticlesModalState] =
    useState<boolean>(false);

  const [isShowingReviewForm, setReviewFormState] = useState<boolean>(false);

  const [isFetchingReviews, setIsFetchingReviews] = useState<boolean>(false);

  const [isShowingDocPreview, setDocPreviewState] = useState<boolean>(false);

  const allApiReviews = apiReviews.use();
  const relatedApis = relatedApiServices.use();
  const totalRating = avgReviewRating.use();

  async function fetchReviews() {
    setIsFetchingReviews(true);

    await getApiReviews(currentApiDetail.service_id);

    setIsFetchingReviews(false);
  }

  async function updateBookmarkState(action: string) {
    if (!user)
      return toast.error("Please login to perform bookmark action", {
        duration: 4000,
      });

    if (action === "add") {
      setIsBookmarked(true);
      const { error } = await supabaseClient.from("user_api_bookmarks").insert({
        user_id: user?.id,
        api_service_id: currentApiDetail.service_id,
      });

      if (error) {
        toast.error("Something went wrong. Retry bookmark action.", {
          duration: 4000,
        });

        setIsBookmarked(false);
      } else {
        toast.success(
          `${currentApiDetail.service_name} has been added to your API Bookmarks`,
          {
            duration: 4000,
          }
        );
        getUserApiBookmarks(user?.id || "");
      }
    }

    if (action === "remove") {
      setIsBookmarked(false);
      const { error } = await supabaseClient
        .from("user_api_bookmarks")
        .delete()
        .match({
          api_service_id: currentApiDetail.service_id,
          user_id: user?.id,
        });

      if (error) {
        toast.error("Something went wrong. Retry bookmark action.", {
          duration: 4000,
        });

        setIsBookmarked(true);
      } else {
        toast.success(
          `${currentApiDetail.service_name} has been removed from your API Bookmarks`,
          {
            duration: 4000,
          }
        );
        getUserApiBookmarks(user?.id || "");
      }
    }
  }

  function reviewActionHandler() {
    if (!user)
      return toast.error("Please login to add your review", {
        duration: 4000,
      });

    setReviewFormState(true);
  }

  useEffect(() => {
    fetchReviews();

    getRelatedAPIServicesBySector(
      currentApiDetail.service_id,
      currentApiDetail.business_sector_id
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <MainLayout>
      <div className="w-full py-10 align-col">
        <section className="w-full px-10 lg:px-24 align-col">
          <div
            className="items-center w-fit align-row press"
            onClick={() =>
              router.push("/explore", undefined, {
                shallow: true,
                scroll: false,
              })
            }
          >
            <AppIcon icon={"ArrowLeftGreen"} styles="mr-2" />
            <span className="font-light text-light">Go Back</span>
          </div>

          <section
            className={clsx(
              "relative w-full my-6  mb-5 lg:mt-24 mt-16 p-6 border border-dark border-lg rounded-b-2xl",
              cardClasses["detail-header__bg"]
            )}
          >
            <div className="absolute p-5 border -top-10 rounded-2xl w-fit service-logo bg-body border-dark centered_col">
              {currentApiDetail.logo ? (
                <img
                  className={clsx("w-12 h-12")}
                  src={currentApiDetail.logo}
                  alt={`${currentApiDetail.service_name} Logo`}
                />
              ) : (
                <AppIcon
                  icon={"LogoPlaceholder"}
                  styles={clsx("w-12 h-12")}
                  name={`${currentApiDetail.service_name} Logo`}
                />
              )}
            </div>

            <div className="items-center mt-10 align-row">
              <h1 className="mr-3 text-2xl font-bold text-light">
                {currentApiDetail.service_name}
              </h1>
              {currentApiDetail.is_featured && <FeaturedTag />}
            </div>

            <div className="flex flex-col-reverse justify-between w-full mt-4 transition-all lg:items-center lg:flex-row">
              <div className="items-center text-sm transition-all align-row">
                <div className="p-1 px-3 mr-2 capitalize rounded-full bg-accent">
                  #{currentApiDetail.business_sector_name}
                </div>

                <SupportedSDKs
                  langs={currentApiDetail.supported_languages}
                  limit={5}
                />
              </div>

              <div className="items-center mb-4 ml-auto transition-all -mt-14 lg:mb-0 lg:mt-0 align-row lg:ml-0">
                <BaseButton
                  icon="WebGlobe"
                  type="primary"
                  styles="mr-2.5 py-2.5 px-3"
                  iconStyles="w-5 h-5"
                  tooltip="See documentation"
                  onClick={() => setDocPreviewState(true)}
                />

                <BaseButton
                  icon={isBookmarked ? "BookmarkFillWhite" : "BookmarkWhite"}
                  type="default"
                  styles={clsx(
                    "py-2.5 px-3 border border-grey-border",

                    isBookmarked
                      ? "bg-accent hover:bg-transparent hover:border-accent"
                      : "hover:bg-accent"
                  )}
                  iconStyles={isBookmarked ? "w-4 h-4" : "w-5 h-5"}
                  tooltip={
                    isBookmarked ? "Remove from Bookmarks" : "Bookmark API"
                  }
                  onClick={() =>
                    updateBookmarkState(isBookmarked ? "remove" : "add")
                  }
                />

                <BaseButton
                  text="Compare"
                  type="default"
                  icon="CompareWhite"
                  iconStyles="w-5 h-5"
                  tooltip="Coming soon 🙏🏻"
                  styles="ml-2.5 text-light px-8 py-2 bg-body border border-grey-border hover:border-primary hover:border-opacity-40"
                />
              </div>
            </div>
          </section>

          <section className="w-full overflow-hidden border align-col rounded-2xl more-details border-dark bg-body">
            <div className="w-full border-b align-row border-dark">
              <div className="w-8/12 border-r border-dark">
                <div className={clsx("section-header-tab")}>
                  <p className={clsx("section-header-title")}>
                    Service Description
                  </p>
                </div>

                <div className="w-full px-6 py-5">
                  <div
                    className={clsx(
                      "snapshot w-full relative rounded-lg bg-white",
                      "h-52 centered-col"
                    )}
                    style={{
                      backgroundImage: `url(${currentApiDetail.snapshot_image})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      // backgroundAttachment: "fixed",
                    }}
                  >
                    {!currentApiDetail.snapshot_image && (
                      <span>Can&apos;t load snapshot</span>
                    )}
                  </div>

                  <p className="mt-5 text-base font-light service-description text-grey-lighter">
                    {currentApiDetail.service_description}{" "}
                    {currentApiDetail.service_description}
                  </p>

                  <Link
                    href={currentApiDetail.source_url || ""}
                    target="_blank"
                    className="items-center mt-3 mb-2 font-light align-row press w-fit"
                  >
                    <span className=" text-primary">Visit Website</span>
                    <AppIcon
                      icon="ArrowLeftGreen"
                      styles="ml-1.5 mt-0.5 rotate-180"
                    />
                  </Link>

                  {!isFetchingReviews && (
                    <p
                      className={clsx(
                        "mt-10 -ml-6 -mb-5",
                        "section-header-title"
                      )}
                    >
                      Recent Reviews
                    </p>
                  )}
                </div>
              </div>

              <div className="w-4/12">
                <div className={clsx("section-header-tab")}>
                  <p className={clsx("mx-auto", "section-header-title")}>
                    Reviews
                  </p>
                </div>

                <div className="px-5 py-6 mt-3 centered-col text-light">
                  <span className="text-6xl font-normal">
                    {totalRating.toFixed(1)}
                  </span>
                  <div className="mt-3">
                    <RatingStars
                      id={`details-rating`}
                      type="fill"
                      styles="text-lg"
                      rate={totalRating}
                      onClick={() => {}}
                    />
                  </div>
                  <span className="mt-4 font-light text-center text-grey-lighter">
                    Ratings & Reviews <br className="flex lg:hidden" />(
                    {allApiReviews.length} Review
                    {allApiReviews.length === 1 ? "" : "s"})
                  </span>

                  <div className="items-center mt-12 lg:mt-8 align-col actions">
                    <BaseButton
                      id="write-review"
                      text="Write a review"
                      type="secondary"
                      styles="hover:text-body w-fit px-8"
                      onClick={reviewActionHandler}
                    />

                    <BaseButton
                      text={isTablet ? "See related articles" : "See articles"}
                      type="secondary"
                      styles="hover:text-body mt-3 px-8"
                      onClick={() => {
                        setArticlesModalState(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {!isFetchingReviews && (
              <div className="w-full overflow-y-scroll h-96 ">
                {allApiReviews && allApiReviews.length ? (
                  <div className="box-border grid w-full grid-flow-row grid-cols-2 px-6 my-6 lg:grid-cols-3 gap-x-6 gap-y-6">
                    {allApiReviews.map((review) => (
                      <div
                        className="h-fit press"
                        // style={{ width: "25rem" }}
                        key={review.id}
                      >
                        <ReviewCard review={review} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-20 centered-col">
                    <AppIcon
                      icon="RatingStarOrange"
                      styles="animate-spin3d delay-1000"
                    />
                    <span className="mt-5 font-light text-grey-lighter">
                      No Reviews Yet.{" "}
                      <span
                        className="text-primary press"
                        onClick={reviewActionHandler}
                      >
                        Add New Review
                      </span>
                    </span>
                  </div>
                )}
              </div>
            )}
          </section>
        </section>

        <section className="w-full mt-20 more-related">
          <Explore
            title="More Related APIs"
            subtitle="Simplify Your Development Workflow with these featured API’s - The Game-Changing Solution for All Your Integration Needs"
            cardSize="25rem"
            services={relatedApis}
          />
        </section>

        <section className="w-full news-letter">
          <NewsletterSub />
        </section>
      </div>

      <BaseModal
        isOpen={isShowingRelatedArticles}
        styles="border border-grey-border"
        onClose={() => {
          setArticlesModalState(false);
        }}
      >
        <ApiBlogPosts apiService={currentApiDetail} />
      </BaseModal>

      <BaseModal
        isOpen={isShowingReviewForm}
        styles="border border-grey-border"
        onClose={() => {
          setReviewFormState(false);
        }}
      >
        <ApiReviewForm
          service={currentApiDetail}
          onSave={async () => await getApiReviews(currentApiDetail.service_id)}
          onClose={() => setReviewFormState(false)}
        />
      </BaseModal>

      <LinkPreviewFrame
        srcLink={currentApiDetail.source_url || ""}
        isOpen={isShowingDocPreview}
        onClose={() => setDocPreviewState(false)}
      >
        <iframe
          src={currentApiDetail.source_url || ""}
          frameBorder="0"
          className="w-full h-full"
        ></iframe>
      </LinkPreviewFrame>
    </MainLayout>
  );
};

export async function getServerSideProps(context: { params: any }) {
  const { params } = context;
  const { id } = params;

  const { data, error } = await supabaseClient
    .from("api_services")
    .select("*")
    .eq("service_id", id)
    .single();

  if (!data) {
    return {
      redirect: {
        destination: "/explore",
        permanent: false,
      },
    };
  }

  return {
    props: {
      currentApiDetail: data,
    },
  };
}

export default ApiDetails;
