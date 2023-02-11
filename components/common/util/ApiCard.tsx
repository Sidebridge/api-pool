import clsx from "clsx";
import AppIcon from "../icons";
import FeaturedTag from "./FeaturedTag";

import FlutterwaveBg from "../../../assets/images/pictures/flutterwave.png";

type CardProp = {
  isHovered: boolean;
};

const ApiCard = ({ isHovered }: CardProp) => {
  return (
    <div
      className={clsx(
        "w-full flex flex-col bg-dark-matte border border-grey border-opacity-50 rounded-2xl h-full text-white",
        "hover:border-primary hover:border-opacity-70"
      )}
    >
      <div className="card-title p-3.5 pb-5">
        <div
          className={clsx(
            "snapshot w-full text-2xl text-black rounded-lg h-36 flex flex-col justify-center items-center",
            isHovered && "bg-white"
          )}
          style={{
            backgroundImage: !isHovered ? `url(${FlutterwaveBg.src})` : "",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {isHovered && <h1>Sendwave</h1>}
        </div>
        <div className="flex flex-row justify-between items-center mt-5">
          <h3 className="text-xl">Sendwave</h3>
          <FeaturedTag />
        </div>
      </div>

      <div className="card-description px-3.5 py-4 border-y border-gray-400 border-opacity-20 text-base font-light">
        <p>
          Lorem ipsum dolor sit amet consectetur. Velit ullamcorper at sagittis
          dui sit pretium sem odio. Egestas a ut vestibulum at nunc odio id id.
          Odio auctor eget vestibulum aliquam odio ipsum etiam dolor.
        </p>
      </div>

      <div className="supported-langs p-3 flex flex-row items-center border-b border-gray-400 border-opacity-20 text-light">
        {["Javascript", "PHP", "Python"].map((lang) => (
          <div
            key="lang"
            className="rounded-full border text-grey border-grey border-opacity-30 leading-relaxed p-0.5 px-3 mr-2"
          >
            {lang}
          </div>
        ))}
        <div
          key="lang"
          className="p-0.5 px-2 rounded-full border text-grey border-grey text-center border-opacity-30"
        >
          <span>+3</span>
        </div>
      </div>

      <div className="card-actions flex flex-row px-3.5 py-6">
        <div
          className={clsx(
            "view-brief press flex flex-row items-center rounded-full text-white",
            "border-2 border-grey border-opacity-30 leading-relaxed p-2 px-5 mr-2",
            "hover:border-primary hover:bg-dark"
          )}
        >
          <AppIcon icon="BriefWhite" name="brief" styles="mr-2" />

          <span>View Brief</span>
        </div>

        <div
          className={clsx(
            "view-brief press flex flex-row items-center rounded-full text-white",
            "border-2 border-grey bg-grey-light border-opacity-30 leading-relaxed p-2 px-5 mr-2",
            "hover:border-primary hover:bg-primary hover:bg-opacity-20"
          )}
        >
          <AppIcon icon="CompareWhite" name="compare" styles="mr-2" />

          <span>Compare</span>
        </div>
      </div>
    </div>
  );
};

export default ApiCard;
