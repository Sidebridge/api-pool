import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  NextPage,
  PreviewData,
} from "next";
import { useRouter } from "next/router";
import clsx from "clsx";
import { User, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ParsedUrlQuery } from "querystring";

import MainLayout from "@/components/layout/MainLayout";
import AppIcon from "@/components/common/icons";
import NewsletterSub from "@/components/landing-page/NewsletterSub";

import { supabaseClient } from "@/utils/services/supabase/client";
import { ApiReview } from "@/types/api-service.type";
import toast from "react-hot-toast";
import ActionableReviewCard from "@/components/common/util/ActionableReviewCard";
import BaseModal from "@/components/common/base/BaseModal";
import ApiReviewForm from "@/components/modals/api-details/ApiReviewForm";

type UserReviewsPageProps = { user: User };

const AddedReviews: NextPage<UserReviewsPageProps> = ({ user }) => {
  const router = useRouter();

  const [isLoadingReviews, setReviewsLoading] = useState<boolean>(false);

  const [addedReviews, setAllAddedReviews] = useState<ApiReview[]>([]);

  const [isProcessingReview, setReviewProcessState] = useState<boolean>(false);

  const [isShowingReviewForm, setReviewFormState] = useState<boolean>(false);

  const [reviewToEdit, setReviewToEdit] = useState<{
    [key: string]: any;
  } | null>(null);

  async function deleteReview(reviewId: string) {
    const deleteConfirmed = confirm(
      "Are you sure you want to delete this review?"
    );

    if (deleteConfirmed) {
      setReviewProcessState(true);

      const { error } = await supabaseClient
        .from("api_reviews")
        .delete()
        .match({
          id: reviewId,
          reviewer_id: user.id,
        });

      if (error) {
        setReviewProcessState(false);
        return toast.error(
          "Unable to delete this review. Let's try that one more time 💪🏼",
          {
            duration: 4000,
          }
        );
      }

      const reviewIndex = addedReviews.findIndex(
        (review) => review.id === reviewId
      );

      setAllAddedReviews([
        ...addedReviews.slice(0, reviewIndex),
        ...addedReviews.slice(reviewIndex + 1),
      ]);

      setReviewProcessState(false);
    }
  }

  async function fetchUserReviews() {
    setReviewsLoading(true);

    const { data, error } = await supabaseClient
      .from("api_reviews")
      .select(
        `
            *,
            api_services (
                service_id,
                logo,
                service_name,
                business_sector_name
            )
        `
      )
      .eq("reviewer_id", user.id);

    if (error) {
      setAllAddedReviews([]);

      setReviewsLoading(false);

      return toast.error(
        `Could not fetch your written reviews. Please try refreshing page `,
        { duration: 5000 }
      );
    }

    if (data) {
      setAllAddedReviews(data);
    }

    setReviewsLoading(false);
  }

  useEffect(() => {
    fetchUserReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return (
    <MainLayout>
      <main className="">
        <div className="h-full mx-10 mt-10 lg:mx-24">
          <div className="items-center font-light align-row text-grey-lighter">
            <div
              className="items-center align-row press hover:text-primary"
              onClick={() => router.back()}
            >
              <AppIcon icon={"ArrowLeftGreen"} styles="mr-2 mt-0.5" />
              <span>Back</span>
            </div>

            <span className="mx-4 text-xl mb-1.5 text-dark">|</span>
            <span> Manage All Your Written Reviews</span>
          </div>

          <div className="w-full mt-10 overflow-hidden border rounded-lg border-dark">
            <div className="border-b review-header border-dark">
              <p className={clsx("mt-5", "section-header-title")}>
                All Reviews
              </p>
            </div>

            <div className="review-list w-full h-[75vh] max-h-[75vh] overflow-y-scroll p-6">
              {isLoadingReviews && (
                <AppIcon icon={"LoaderGif"} styles="mx-auto my-10 w-5 h-5" />
              )}

              {!isLoadingReviews && addedReviews.length && (
                <div className="grid w-full grid-flow-row grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
                  {addedReviews.map((review) => (
                    <ActionableReviewCard
                      key={review.id}
                      review={review}
                      disabled={isProcessingReview}
                      onEdit={() => {
                        setReviewToEdit(review);
                        setReviewFormState(true);
                      }}
                      onDelete={() => deleteReview(review.id)}
                    />
                  ))}
                </div>
              )}

              {!isLoadingReviews && !addedReviews.length && (
                <div className="my-24 centered-col">
                  <AppIcon
                    icon="RatingStarOrange"
                    styles="animate-spin3d delay-1000"
                  />
                  <span className="mt-5 font-light text-grey-lighter">
                    No Reviews Yet.{" "}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <NewsletterSub />
      </main>

      <BaseModal
        isOpen={isShowingReviewForm}
        styles="border border-grey-border"
        onClose={() => {
          setReviewFormState(false);
        }}
      >
        <ApiReviewForm
          currentReview={reviewToEdit as ApiReview}
          service={reviewToEdit?.api_services}
          onSave={fetchUserReviews}
          onClose={() => setReviewFormState(false)}
        />
      </BaseModal>
    </MainLayout>
  );
};

export default AddedReviews;

export const getServerSideProps = async (
  ctx:
    | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    | { req: NextApiRequest; res: NextApiResponse<any> }
) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/explore",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
