import BaseButton from "@/components/common/base/BaseButton";
import AppIcon from "@/components/common/icons";

const ApiBlogPosts = () => {
  const articles: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="relative w-full bg-body">
      <div className="box-border sticky top-0 z-10 w-full p-6 border-b bg-body border-grey-border title-block align-col">
        <h1 className="text-lg font-semibold text-light">
          Relevant Helper Articles
        </h1>
        <span className="font-light text-grey-lighter">
          Read the relevant articles about Flutterwave&apos;s API service(s)
        </span>
      </div>

      {articles && articles.length ? (
        <div className="z-0 grid w-full grid-flow-row grid-cols-2 p-6 blog-posts gap-x-4 gap-y-4">
          {articles.map((article, articleIndex) => (
            <div
              key={articleIndex}
              className="p-4 border rounded-lg border-dark-matte press text-grey-lighter"
              style={{ background: "#0D0D0D" }}
            >
              <h1 className="text-lg font-semibold ">
                Replacing Redux with core React APIs
              </h1>

              <div className="items-center mt-1 align-row">
                <AppIcon name="author" icon="SignatureOrange" styles="mr-2" />
                <span className="text-sm italic text-accent">
                  Author: Emmanuel
                </span>
              </div>

              <p className="mt-4 text-sm">
                Lorem ipsum dolor sit amet consectetur. Velit ullamcorper at
                sagittis.
              </p>

              <BaseButton
                text="Read Full Article"
                type="secondary"
                styles="hover:text-body mt-6 px-8 font-light z-0"
                onClick={() => {}}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full font-light capitalize h-96 centered-col text-grey-lighter">
          <AppIcon icon="EmptyList" name="empty-blog" />
          <span className="mt-3">No related articles yet 🙁</span>
        </div>
      )}
    </div>
  );
};

export default ApiBlogPosts;
