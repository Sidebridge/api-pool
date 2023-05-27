import clsx from "clsx";
import { useState } from "react";
import BaseButton from "../common/base/BaseButton";
import BaseModal from "../common/base/BaseModal";
import AppIcon from "../common/icons";

import type { IconType } from "../common/icons/iconMap";

const promotionBenefits = [
  "Get in front of Millions of Developers worldwide by featuring on our homepage and above other listings in the explore feed",
  "More than 10,000 API Doc visits per month",
  "Published helper articles to facilitate the ease of use of your API product",
  `Standout from thousands of listed API products with our prominent & fancy "Featured" tag`,
  "Sponsored newsletters delivered to 10,000+ and growing email subscribers",
];

const promoPlans = [
  {
    title: "Basic",
    icon: "BasicTag",
    benefits: [],
    amount: "$299.00",
    recommended: false,
  },
  {
    title: "Pro",
    icon: "ProTrophy",
    benefits: [],
    amount: "$800.00",
    recommended: true,
  },
  {
    title: "Ultimate",
    icon: "UltimateCrown",
    benefits: [],
    amount: "$1,200.00",
    recommended: false,
  },
];

const PromoSection = () => {
  const [isShowPromoPlans, setShowPromoPlans] = useState<boolean>(false);

  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

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
                className="items-start mb-3 align-row"
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

      <BaseModal
        isOpen={isShowPromoPlans}
        onClose={() => {
          setShowPromoPlans(false);
        }}
      >
        <div className="relative w-full h-[85vh] overflow-hidden bg-primary">
          <div className="z-0 w-[100rem] h-[100rem] rounded-full absolute left-1/2 transform -translate-x-1/2 top-24 pb-[100%] bg-body"></div>
          <div className="items-center w-full align-col">
            <div className="z-10 w-20 h-20 rounded-md light-primary-shadow mt-14 centered-col bg-body">
              <AppIcon icon={"LogoPlaceholder"} />
            </div>

            <section className="z-10 items-center w-full mt-10 text-center heading align-col">
              <h1 className="text-3xl text-light">Promotion Plans</h1>
              <p className="mt-1 text-sm font-light text-grey-lighter">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                <br />
                Etiam eu turpis molestie, dictum est a, mattis tellus.
              </p>
            </section>

            <div className="z-10 grid w-11/12 grid-flow-row grid-cols-3 mt-12 gap-x-3 promo-plans">
              {promoPlans.map((plan, planIndex) => (
                <div
                  key={plan.title}
                  className={clsx(
                    "border relative border-dark press rounded-2xl p-3 px-3.5 align-col",
                    "hover:bg-dark hover:bg-opacity-40"
                  )}
                  onClick={() => setSelectedPlanIndex(planIndex)}
                >
                  {plan.recommended && (
                    <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-xs bg-[#22CB58] p-1 px-3 rounded-full">
                      Recommended
                    </span>
                  )}
                  <div className="w-full row-btwn">
                    <div className="p-2 border rounded-xl border-dark">
                      <AppIcon
                        icon={
                          `${plan.icon}${
                            selectedPlanIndex === planIndex ? "Black" : "Grey"
                          }` as IconType
                        }
                      />
                    </div>

                    <div className="mt-1.5 w-5 h-5 rounded-full border-[5px] border-[#201F1F]"></div>
                  </div>

                  <span className="mt-4 text-sm font-light plan-title text-grey-lighter">
                    {plan.title} Plan
                  </span>
                  <span className="mt-1 text-xl text-light">{plan.amount}</span>
                </div>
              ))}
            </div>

            <div className="z-10 w-11/12 p-6 mt-10 border border-dark align-col text-grey-lighter rounded-2xl">
              <p className="text-xl">
                {promoPlans[selectedPlanIndex].title} Plan
              </p>
              <div className="w-full h-[1px] my-5 border-[0.5px] border-dark"></div>
              {promoPlans[selectedPlanIndex].benefits.map(
                (benefit, benefitIndex) => (
                  <div
                    key={`benefit-${benefitIndex}`}
                    className="items-start mb-3 align-row"
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
          </div>

          <div className="fixed z-50 w-full py-4 text-center transform -translate-x-1/2 bottom-3 left-1/2 centered-col">
            <BaseButton
              text={`Pay ${promoPlans[selectedPlanIndex].amount}`}
              styles=" px-8 font-semibold"
            />
            <span className="z-10 mt-3 text-sm font-light text-grey-lighter">
              Terms & Conditions Apply
            </span>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default PromoSection;
