import AppIcon from "../icons";
import RatingStars from "./RatingStars";

const ReviewCard = () => {
  return (
    <div className="box-border flex flex-grow w-full px-5 py-5 overflow-y-hidden border cursor-default align-col card-inner__bg border-dark rounded-2xl text-light">
      <div className="items-center align-row">
        <div
          className="items-center p-4 mr-4 rounded-md border-dark align-col"
          style={{ border: "0.8px solid #151515" }}
        >
          <AppIcon icon="UserPrimary" name="user" />
        </div>

        <div className="align-col">
          <span className="reviewer-name text-grey-lighter">
            Emmanuel Abdulhakeem
          </span>
          <span className="text-xs font-light text-primary">Individual</span>
        </div>
      </div>
      <p className="mt-4 mb-10 text-sm text-grey-lighter">
        Lorem ipsum dolor sit amet consectetur. Faucibus in ullamcorper augue
        ultricies amet platea facilisis tortor. Sed placerat donec pretium
        mauris tristique. Non nunc tristi
      </p>

      <div className="items-center mt-auto align-row">
        <span className="mr-2.5 text-grey-lighter">4.0</span>
        <RatingStars rate={4} type="fill" onClick={() => {}} />
        <span className="ml-auto text-xs italic font-light capitalize text-grey-lighter">
          3 days ago
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
