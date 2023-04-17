/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import cardClasses from "@/styles/api-card.module.css";
import classes from "@/styles/api-detail.module.css";

import AppIcon from "@/components/common/icons";
import MainLayout from "@/components/layout/MainLayout";
import clsx from "clsx";
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

import { APIServices as services } from "@/public/constants/data-mock";
import type { ApiService } from "@/types/api-service.interface";

const ApiDetails = () => {
  const router = useRouter();

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  function cardHoverHandler(card: string | null) {
    setHoveredCard(card);
  }

  const [isShowingRelatedArticles, setArticlesModalState] =
    useState<boolean>(false);

  const [isShowingReviewForm, setReviewFormState] = useState<boolean>(false);

  const [isFetchingReviews, setIsFetchingReviews] = useState<boolean>();

  const allApiReviews = apiReviews.use();
  const relatedApis = relatedApiServices.use();
  const totalRating = avgReviewRating.use();
  const currentApiDetail = currentAPI.use() as ApiService;

  async function fetchReviews() {
    setIsFetchingReviews(true);

    await getApiReviews(currentApiDetail.service_id);

    setIsFetchingReviews(false);
  }

  useEffect(() => {
    fetchReviews();

    getRelatedAPIServicesBySector(
      currentApiDetail.service_id,
      currentApiDetail.business_sector_id
    );
  }, [router]);

  return (
    <MainLayout>
      <div className="w-full py-10 align-col">
        <section className="w-full px-24 align-col">
          <div
            className="items-center align-row press"
            onClick={() => router.back()}
          >
            <AppIcon icon={"ArrowLeftGreen"} styles="mr-2" />
            <span className="font-light text-light">Go Back</span>
          </div>

          <section
            className={clsx(
              "relative w-full my-6  mb-5 mt-24 p-6 border border-dark border-lg rounded-b-2xl",
              cardClasses["detail-header__bg"]
            )}
          >
            <div className="absolute p-5 border -top-10 rounded-2xl w-fit service-logo bg-body border-dark centered_col">
              <img
                className={clsx("w-12 h-12")}
                src={currentApiDetail.logo}
                alt={`${currentApiDetail.service_name} Logo`}
              />
            </div>

            <div className="items-center mt-10 align-row">
              <h1 className="mr-3 text-2xl font-bold text-light">
                {currentApiDetail.service_name}
              </h1>
              {currentApiDetail.is_featured && <FeaturedTag />}
            </div>

            <div className="w-full mt-4 row-btwn">
              <div className="items-center text-sm align-row">
                <div className="p-1 px-3 mr-2 capitalize rounded-full bg-accent">
                  #{currentApiDetail.business_sector_name}
                </div>

                <SupportedSDKs
                  langs={currentApiDetail.supported_languages}
                  limit={5}
                />
              </div>

              <div className="items-center align-row">
                <a href={currentApiDetail.source_url} target="_blank">
                  <BaseButton
                    icon="WebGlobe"
                    type="primary"
                    styles="mr-2.5 py-2.5 px-3"
                    iconStyles="w-5 h-5"
                    tooltip="See documentation"
                  />
                </a>

                <BaseButton
                  icon="BookmarkWhite"
                  type="secondary"
                  styles="py-2.5 px-3"
                  iconStyles="w-5 h-5"
                  tooltip="Bookmark API"
                />

                <BaseButton
                  text="Compare"
                  type="default"
                  icon="CompareWhite"
                  iconStyles="w-5 h-5"
                  styles="ml-2.5 text-light px-8 py-2 bg-body border border-grey-border hover:border-primary hover:border-opacity-40"
                />
              </div>
            </div>
          </section>

          <section className="w-full overflow-hidden border align-col rounded-2xl more-details border-dark bg-body">
            <div className="w-full border-b align-row border-dark">
              <div className="w-8/12 border-r border-dark">
                <div className={clsx(classes["section-header-tab"])}>
                  <p className={clsx(classes["section-header-title"])}>
                    Service Description
                  </p>
                </div>

                <div className="w-full px-6 py-5">
                  <div
                    className={clsx(
                      "snapshot w-full relative rounded-lg bg-white",
                      "h-52"
                    )}
                    style={{
                      backgroundImage: `url(${currentApiDetail.snapshot_image})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      // backgroundAttachment: "fixed",
                    }}
                  ></div>

                  <p className="mt-5 text-base font-light service-description text-grey-lighter">
                    {currentApiDetail.service_description}{" "}
                    {currentApiDetail.service_description}
                  </p>

                  <span className="items-center mt-3 mb-2 font-light align-row press w-fit">
                    <span className=" text-primary">Visit Website</span>
                    <AppIcon
                      icon="ArrowLeftGreen"
                      styles="ml-1.5 mt-0.5 rotate-180"
                    />
                  </span>

                  {!isFetchingReviews && (
                    <p
                      className={clsx(
                        "mt-10 -ml-6 -mb-5",
                        classes["section-header-title"]
                      )}
                    >
                      Recent Reviews
                    </p>
                  )}
                </div>
              </div>

              <div className="w-4/12">
                <div className={clsx(classes["section-header-tab"])}>
                  <p
                    className={clsx("mx-auto", classes["section-header-title"])}
                  >
                    Reviews
                  </p>
                </div>

                <div className="px-5 py-6 mt-3 centered-col text-light">
                  <span className="text-6xl font-normal">
                    {totalRating.toFixed(1)}
                  </span>
                  <div className="mt-3">
                    <RatingStars
                      type="fill"
                      styles="text-lg"
                      rate={totalRating}
                      onClick={() => {}}
                    />
                  </div>
                  <span className="mt-4 font-light text-grey-lighter">
                    Ratings & Reviews ({allApiReviews.length} Review
                    {allApiReviews.length === 1 ? "" : "s"})
                  </span>

                  <div className="items-center mt-8 align-col actions">
                    <BaseButton
                      id="write-review"
                      text="Write a review"
                      type="secondary"
                      styles="hover:text-body w-fit px-8"
                      onClick={() => {
                        setReviewFormState(true);
                      }}
                    />

                    <BaseButton
                      text="See related articles"
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
                  <div className="box-border grid w-full grid-flow-row grid-cols-3 px-6 my-6 featured-list gap-x-6 gap-y-6">
                    {allApiReviews?.map((review) => (
                      <div
                        className="h-fit press"
                        // style={{ width: "25rem" }}
                        key={review.id}
                        onMouseEnter={() =>
                          cardHoverHandler(currentApiDetail.service_id)
                        }
                        onMouseLeave={() => cardHoverHandler(null)}
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
                        onClick={() => setReviewFormState(true)}
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

      {isShowingRelatedArticles && (
        <BaseModal
          styles="border border-grey-border"
          isOpen={isShowingRelatedArticles}
          innerWidth="50%"
          onClose={() => {
            setArticlesModalState(false);
          }}
        >
          <ApiBlogPosts />
        </BaseModal>
      )}

      {isShowingReviewForm && (
        <BaseModal
          styles="border border-grey-border"
          isOpen={isShowingReviewForm}
          innerWidth="50%"
          onClose={() => {
            setReviewFormState(false);
          }}
        >
          <ApiReviewForm
            service={currentApiDetail}
            onClose={() => setReviewFormState(false)}
          />
        </BaseModal>
      )}
    </MainLayout>
  );
};

export default ApiDetails;
