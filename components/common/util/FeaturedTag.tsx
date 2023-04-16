import AppIcon from "../icons";

const FeaturedTag = () => {
  return (
    <div className="items-center align-row">
      <AppIcon icon="FeaturedBadge" name="Featured" styles="mr-2" />
      <span className="text-sm font-normal text-light">Featured</span>
    </div>
  );
};

export default FeaturedTag;
