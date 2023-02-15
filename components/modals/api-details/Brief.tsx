import AppIcon from "@/components/common/icons";
import RatingStars from "@/components/common/util/RatingStars";
import { Button } from "antd";
import clsx from "clsx";

const Brief = () => {
  return (
    <div className="api-brief align-col w-full h-auto text-white ">
      <div className="supported-langs align-col p-5 h-fit w-full border-b light-border">
        <p className="text-sm font-light">Supported Languages</p>

        <div className=" align-row items-center flex-wrap mt-4">
          {["Javascript", "PHP", "Python", "Go Lang"].map((lang) => (
            <div
              key={lang}
              className="rounded-full border text-grey light-border leading-relaxed p-0.5 px-3 mr-2 mb-2"
            >
              {lang}
            </div>
          ))}
        </div>
      </div>
      <div className="api-desc border-b light-border p-5 font-light">
        <p>
          Lorem ipsum dolor sit amet consectetur. Faucibus in ullamcorper augue
          ultricies amet platea facilisis tortor. Sed placerat donec pretium
          mauris tristique. Non nunc tristique congue ultrices diam aliquet quam
          a. Arcu eget quam molestie sapien mattis eu massa. Neque sit odio ut
          quis ante sagittis neque. Quisque volutpat vitae venenatis at morbi
          metus semper amet lacus. Volutpat velit tristique lacinia mi dignissim
          sociis massa. Vestibulum purus malesuada vitae metus sed sit amet.
        </p>
      </div>

      <div className="api-actions align-row border-b light-border p-5">
        <div
          className={clsx(
            "press align-row items-center rounded-full text-dark",
            "leading-relaxed p-2 px-5 mr-2 bg-primary"
          )}
        >
          <AppIcon icon="WebBlack" name="external-link" styles="mr-2" />

          <span>View Source</span>
        </div>

        <div
          className={clsx(
            "view-brief press align-row items-center rounded-full text-white",
            "border-2 border-grey bg-grey-light border-opacity-60 leading-relaxed p-2 px-5 mr-2 opacity-40",
            "hover:bg-opacity-20 hover:opacity-100 hover:border-white"
          )}
        >
          <AppIcon icon="CompareWhite" name="compare" styles="mr-2" />

          <span>Compare</span>
        </div>
      </div>

      <div className="review-overview p-5 row-btwn text-white ">
        <div className="align-col w-fit">
          <p className="font-light">
            Ratings & Review <span className="text-grey">(3 Reviews)</span>
          </p>

          <span className="text-5xl mt-2.5 font-normal">4.0</span>

          <p className="pt-0.5">
            <RatingStars rate={4} />
          </p>
        </div>

        <div className="align-col w-fit  flex flex-grow text-right font-light">
          <p className="text-primary  press align-row items-center ml-auto h-fit">
            <span>View All Reviews </span>
            <AppIcon
              name="arror"
              icon="ArrowLeftGreen"
              styles="rotate-180 ml-1.5"
            />
          </p>

          <Button
            className={clsx(
              "text-white font-light text-sm bg-transparent border-2 light-border ml-auto mt-auto h-12 w-fit press"
            )}
            type="ghost"
            shape="round"
          >
            <span>Write Review</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Brief;
