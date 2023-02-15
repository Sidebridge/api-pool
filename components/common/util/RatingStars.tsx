type RatingStarsProps = {
  rate: number;
};

const RatingStars = ({ rate }: RatingStarsProps) => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => (
        <>
          {star <= rate && <span className="text-primary mr-1">&#9733;</span>}
          {star > rate && <span className="text-white mr-1">&#9734;</span>}
        </>
      ))}
    </>
  );
};

export default RatingStars;
