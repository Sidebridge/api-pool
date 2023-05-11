import clsx from "clsx";
import BaseButton from "../common/base/BaseButton";
import AppIcon from "../common/icons";

const promotionBenefits = [
  "Get in from of 1M+ developers worldwide",
  "More than 10,000 API Doc visits per month",
  "Related helper articles to facilitate your API service ease of use",
  'Standout from thousands of listed API products with our fancy "Featured" tag',
];

const PromoSection = () => {
  return (
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
  );
};

export default PromoSection;
