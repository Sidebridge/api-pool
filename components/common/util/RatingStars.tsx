import clsx from "clsx";

type RatingStarsProps = {
  rate: number;
  type?: string;
  styles?: string;
  action?: string;
  onClick: (star: number) => void;
};

const RatingStars = ({
  rate,
  type = "outline",
  styles,
  action = "view",
  onClick,
}: RatingStarsProps) => {
  const starClasses = (star: number): string =>
    `mr-1 ${star <= rate ? "text-primary" : "text-white"} ${
      action === "mark" && "cursor-pointer"
    }`;

  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => (
        <>
          {type === "outline" && (
            <span
              className={clsx(styles, starClasses(star))}
              onClick={() => onClick(star)}
            >
              &#9734;
            </span>
          )}
          {type !== "outline" && (
            <span
              className={clsx(styles, starClasses(star))}
              onClick={() => onClick(star)}
            >
              &#9733;
            </span>
          )}
        </>
      ))}
    </>
  );
};

export default RatingStars;
