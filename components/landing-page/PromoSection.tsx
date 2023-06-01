import { formatMoney } from "@/utils/helper/formatter";
import { validateEmail } from "@/utils/helper/validator";
import { supabaseClient } from "@/utils/services/supabase/client";
import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";
import BaseButton from "../common/base/BaseButton";
import BaseInput from "../common/base/BaseInput";
import BaseModal from "../common/base/BaseModal";
import AppIcon from "../common/icons";

import type { IconType } from "../common/icons/iconMap";

const promotionBenefits = [
  "Get in front of Millions of Developers worldwide by featuring on our homepage and above other listings in the explore feed",
  "More than 10,000 API Doc visits per month",
  "Sponsored helper articles to facilitate the ease of use of your API product",
  `Standout from thousands of listed API products with our prominent & fancy "Featured" tag`,
  "Sponsored newsletters delivered to 10,000+ and growing email subscribers",
];

const promoPlans = [
  {
    title: "Basic",
    icon: "BasicTag",
    benefits: [
      "Get limited spot feature on our homepage",
      `Standout out with our exclusive "Featured Tag" among a sea of API products in explore results`,
      "All benefits for the duration of 2 weeks",
      "More detailed product profile",
    ],
    amount: 299,
    recommended: false,
  },
  {
    title: "Pro",
    icon: "ProTrophy",
    benefits: [
      "* Everything in the Basic Plan (for 3 weeks)",
      "Minimum of 2 tweets spotlighting your products as a sponsor",
      "2 promoted newsletter issue",
      "1 sponsored blog article about the API product usage",
    ],
    amount: 799,
    recommended: true,
  },
  {
    title: "Ultimate",
    icon: "UltimateCrown",
    benefits: [
      "* Everything in the Basic Plan (for 5 weeks) ",
      "Minimum of 3 tweets spotlighting your products as a sponsor",
      "3 promoted newsletter issues",
      "2 sponsored blog article about the API product usage",
      "Collected and ranked unbiased (+ve) reviews",
    ],
    amount: 1199,
    recommended: false,
  },
];

const initializePromoDetails = {
  clientName: "",
  clientEmail: "",
  productName: "",
  companyName: "",
  productUrl: "",
};

const PromoSection = () => {
  const [isShowPromoPlans, setShowPromoPlans] = useState<boolean>(false);

  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(0);

  const [formStep, setFormStep] = useState<number>(0);

  const [promotionDetails, setPromotionDetails] = useState<{
    [key: string]: string;
  }>(initializePromoDetails);

  const [isSavingPromoRequest, setIsSavingPromo] = useState<boolean>(false);

  function resetModal() {
    setShowPromoPlans(false);
    setFormStep(0);
    setSelectedPlanIndex(0);
    setPromotionDetails(initializePromoDetails);
  }

  function handleButtonClick() {
    return formStep === 0 ? setFormStep(1) : savePromotionRequest();
  }

  async function savePromotionRequest() {
    // handles promotion request form submission
    const { clientName, clientEmail, productName, companyName, productUrl } =
      promotionDetails;

    if ([clientName, productName, productUrl].includes("")) {
      return toast.error("Please fill up required empty fields");
    }

    if (!validateEmail(clientEmail))
      return toast.error(
        "Please enter a valid email address for your email field"
      );

    setIsSavingPromo(true);

    const { data, error } = await supabaseClient
      .from("promotion_requests")
      .insert({
        promo_plan: promoPlans[selectedPlanIndex].title,
        promo_amount: promoPlans[selectedPlanIndex].amount,
        client_name: clientName,
        client_email: clientEmail,
        product_name: productName,
        company_name: companyName,
        product_url: productUrl,
      });

    setIsSavingPromo(false);
    if (error) {
      toast.error(
        "Sorry! Promotion request couldn't be submitted. Please try again."
      );
    }

    setPromotionDetails(initializePromoDetails);
    setFormStep(2);
  }

  function handleFormUpdate(property: string, val: string) {
    const formData: { [key: string]: string } = { ...promotionDetails };

    formData[property] = val;

    setPromotionDetails(formData);
  }

  return (
    <>
      <section
        id="promote-api"
        className="w-full bg-[#333333] bg-opacity-20 mt-20 p-24 py-16 row-btwn items-center"
      >
        <div className="w-5/12 align-col">
          <h1 className="text-3xl text-transparent accent-text-stroke">
            Get Your API Product Featured
          </h1>
          <p className="font-light text-grey-lighter">
            Helping developers easily discover and integrate the right API
          </p>

          <div className="mt-10 promotion-benefits align-col text-grey">
            {promotionBenefits.map((benefit, benefitIndex) => (
              <div
                key={`benefit-${benefitIndex}`}
                className="items-start mb-2 align-row"
              >
                <AppIcon icon={"FeaturedBadgeAccent"} styles="mr-3 mt-1.5" />
                <span className="">{benefit}</span>
              </div>
            ))}
            <p className="ml-6 ">
              and more to help you get to your target users and drive sales...
            </p>
          </div>

          <BaseButton
            text="Get Featured From $299"
            type="default"
            styles={clsx(
              "text-accent rounded-full text-lg border border-accent mt-12 w-fit px-6",
              "hover:text-dark hover:bg-accent"
            )}
            onClick={() => {
              setShowPromoPlans(true);
            }}
          />
          <p className="mt-2 text-sm font-light text-grey-lighter">
            Any doubt or special requirements?{" "}
            <a
              href="mailto:partnerships@useapipool.com?subject=APIPOOL PARTNERSHIP REQUEST"
              target={"_blank"}
              className="text-primary"
            >
              Contact us
            </a>
          </p>
        </div>

        <AppIcon icon={"PromoLogo"} styles="opacity-50" />
      </section>

      {isShowPromoPlans && (
        <BaseModal isOpen={isShowPromoPlans} onClose={resetModal}>
          {[0, 1].includes(formStep) && (
            <div className="relative w-full h-[85vh] overflow-hidden bg-primary">
              <div className="z-0 w-[100rem] h-[100rem] rounded-full absolute left-1/2 transform -translate-x-1/2 top-24 pb-[100%] bg-body"></div>
              <div className="items-center w-full align-col">
                <div className="z-10 w-20 h-20 rounded-md light-primary-shadow mt-14 centered-col bg-body">
                  <AppIcon icon={"LogoPlaceholder"} styles="w-10 h-10" />
                </div>
                <section className="z-10 items-center w-full mt-10 text-center heading align-col">
                  <h1 className="text-3xl text-light">
                    Promotion {formStep === 0 ? "Plans" : "Request"}
                  </h1>
                  <p className="mt-1 text-sm font-light text-grey-lighter">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <br />
                    Etiam eu turpis molestie, dictum est a, mattis tellus.
                  </p>
                </section>
                {formStep === 0 && (
                  <>
                    <div className="z-10 grid w-11/12 grid-flow-row grid-cols-3 mt-12 gap-x-3 promo-plans">
                      {promoPlans.map((plan, planIndex) => (
                        <div
                          key={plan.title}
                          className={clsx(
                            "border relative press rounded-2xl p-3 px-3.5 align-col",
                            "hover:bg-dark hover:bg-opacity-40",
                            selectedPlanIndex === planIndex
                              ? "border-primary"
                              : "border-dark"
                          )}
                          onClick={() => setSelectedPlanIndex(planIndex)}
                        >
                          {plan.recommended && (
                            <span
                              className={clsx(
                                "absolute -top-4 left-1/2 transform -translate-x-1/2 text-xs p-1 px-3 rounded-full",
                                selectedPlanIndex === planIndex
                                  ? "bg-primary"
                                  : "bg-[#22CB58]"
                              )}
                            >
                              Recommended
                            </span>
                          )}
                          <div className="w-full row-btwn">
                            <div
                              className={clsx(
                                "p-2 border rounded-xl border-dark",
                                selectedPlanIndex === planIndex && "bg-accent"
                              )}
                            >
                              <AppIcon
                                icon={
                                  `${plan.icon}${
                                    selectedPlanIndex === planIndex
                                      ? "Black"
                                      : "Grey"
                                  }` as IconType
                                }
                              />
                            </div>

                            <div
                              className={clsx(
                                "mt-1.5 w-5 h-5 rounded-full border-[5px]",
                                selectedPlanIndex === planIndex
                                  ? "border-primary"
                                  : "border-[#201F1F]"
                              )}
                            ></div>
                          </div>

                          <span className="mt-4 text-sm font-light plan-title text-grey-lighter">
                            {plan.title} Plan
                          </span>
                          <span className="mt-1 text-xl text-light">
                            {formatMoney(plan.amount, "USD")}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="z-10 w-11/12 p-6 mt-10 border border-dark align-col text-grey-lighter rounded-2xl">
                      <p className="text-xl">
                        {promoPlans[selectedPlanIndex].title} Plan
                      </p>
                      <div className="w-full h-[1px] my-5 border border-dark"></div>
                      {promoPlans[selectedPlanIndex].benefits.map(
                        (benefit, benefitIndex) => (
                          <div
                            key={`benefit-${benefitIndex}`}
                            className="items-start mb-2 align-row"
                          >
                            <AppIcon
                              icon={"FeaturedBadgeAccent"}
                              styles="mr-3 mt-1.5"
                            />
                            <span className="">{benefit}</span>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}

                <section
                  className={clsx("z-50 w-11/12 mt-10 align-col")}
                  style={{ display: formStep === 1 ? "flex" : "none" }}
                >
                  <div
                    className="z-50 items-center mr-auto align-row press"
                    onClick={() => setFormStep((prevStep) => prevStep - 1)}
                  >
                    <AppIcon icon={"ArrowLeftGreen"} styles="mr-2" />
                    <span className="text-sm font-light hover:text-primary text-light">
                      Go Back
                    </span>
                  </div>
                  <form className="z-50 w-full p-5 py-4 mt-4 border rounded-lg border-grey-border text-grey-lighter">
                    <h2 className="mb-3 text-xl">Personal Information</h2>
                    <div className="grid w-full grid-flow-row grid-cols-2 mt-1 gap-x-4">
                      <BaseInput
                        id="promoter-name"
                        name="promoterName"
                        label="Your Name"
                        labelStyle="text-grey-lighter font-light"
                        inputStyle="rounded-xl border-grey-border"
                        placeholder="What's your full name?"
                        onChange={(value) => {
                          handleFormUpdate("clientName", value);
                        }}
                      />

                      <BaseInput
                        id="promoter-email"
                        name="promoterEmail"
                        label="Email Address"
                        labelStyle="text-grey-lighter font-light "
                        inputStyle="rounded-xl border-grey-border"
                        placeholder="e.g. amazing-person@you.com"
                        onChange={(value) => {
                          handleFormUpdate("clientEmail", value);
                        }}
                      />
                    </div>

                    <div className="w-full h-[1px] my-6 mt-3 border border-dark"></div>

                    <h2 className="text-xl ,b-3">Product Information</h2>
                    <div className="grid w-full grid-flow-row grid-cols-2 mt-1 gap-x-4">
                      <BaseInput
                        id="product-name"
                        name="productName"
                        label="Product Name"
                        labelStyle="text-grey-lighter font-light"
                        inputStyle="rounded-xl border-grey-border"
                        placeholder="e.g. Apipool API"
                        onChange={(value) => {
                          handleFormUpdate("productName", value);
                        }}
                      />

                      <BaseInput
                        id="company-name"
                        name="companyName"
                        label="Company's Name"
                        labelStyle="text-grey-lighter font-light"
                        inputStyle="rounded-xl border-grey-border"
                        placeholder="e.g. Awesome company"
                        required={false}
                        onChange={(value) => {
                          handleFormUpdate("companyName", value);
                        }}
                      />
                    </div>

                    <BaseInput
                      id="product-link"
                      name="productLink"
                      label="Product Link/Url"
                      labelStyle="text-grey-lighter font-light"
                      inputStyle="rounded-xl border-grey-border"
                      placeholder="e.g. https://product-page.show"
                      onChange={(value) => {
                        handleFormUpdate("productUrl", value);
                      }}
                    />
                  </form>
                </section>
              </div>

              <div className="fixed z-50 w-full py-4 text-center transform -translate-x-1/2 bottom-2 left-1/2 centered-col">
                <BaseButton
                  text={
                    !isSavingPromoRequest
                      ? formStep === 0
                        ? "Continue"
                        : `Submit Request`
                      : "Submitting"
                  }
                  loading={isSavingPromoRequest}
                  styles="text-lg px-8"
                  onClick={handleButtonClick}
                />
                <span className="z-10 mt-3 text-sm font-light text-grey-lighter">
                  Terms & Conditions Apply
                </span>
              </div>
            </div>
          )}

          {formStep === 2 && (
            <div className="relative  p-8 box-border w-full h-[85vh] overflow-hidden bg-body border-[0.5px] border-grey-border align-col">
              <div className="absolute opacity-60 -top-52 -left-16">
                <AppIcon icon={"SpotlightRayGrey"} />
              </div>
              <div className="w-full overflow-hidden code-pattern-bg h-96 centered-col rounded-xl">
                <div className="p-16 square-pattern-bg">
                  <AppIcon icon={"SuccessCheckOrange"} styles="w-40 h-40" />
                </div>
              </div>

              <div className="w-full mt-6 text-center centered-col">
                <h2 className="text-3xl header-text__bg">
                  Product Promotion Request
                  <br />
                  Submitted Successfully
                </h2>
                <p className="w-9/12 mt-4 font-light text-grey-lighter">
                  We've received the promotion intent request for your API
                  product and we'll be reaching out. In the meantime, you can
                  proceed to finalise by making payment for the selected plan
                  using the button below.
                </p>
              </div>

              <a
                href="https://sidebridge.lemonsqueezy.com/checkout/buy/6b637bf6-25ae-4d8b-aee5-2ad17596aaec"
                target="_blank"
                className="mx-auto mt-auto mb-5"
              >
                <BaseButton
                  text={`Pay $${promoPlans[selectedPlanIndex].amount} Now`}
                  styles=" w-fit px-8"
                  onClick={resetModal}
                />
              </a>
            </div>
          )}
        </BaseModal>
      )}
    </>
  );
};

export default PromoSection;
