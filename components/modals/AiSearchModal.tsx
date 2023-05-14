import { useEffect, useState } from "react";

import BaseButton from "../common/base/BaseButton";
import AppIcon from "../common/icons";
import RatingStars from "../common/util/RatingStars";

const AiSearchModal = ({ onClose }: { onClose: () => void }) => {
  const articles: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  //   const articles: number[] = [];

  return (
    <div className="relative w-full pb-4 text-white border align-col bg-body border-dark">
      <div className="sticky top-0 z-10 w-full p-6 px-8 border-b bg-body border-dark form-header align-col">
        <div className="items-center align-row">
          <AppIcon icon={"ArrowLeftGreen"} styles="mr-3 press" />
          <h1 className="text-xl font-normal text-light-new">
            Advance AI/Quick Search
          </h1>
        </div>
        <p className="text-grey-lighter text-md ml-1.5 font-lighter mt-0.5">
          <i>
            Please note that our AI search is currently experimental and may
            sometimes return inaccurate results. However, we are continually
            working hard to make it as accurate and helpful as possible.
          </i>
        </p>
      </div>

      {articles && articles.length ? (
        <div className="z-0 grid w-full grid-flow-row grid-cols-2 p-6 gap-x-4 gap-y-4">
          {articles.map((article, articleIndex) => (
            <div
              key={articleIndex}
              className="cursor-default border overflow-hidden hover:border-accent bg-[#0D0D0D] rounded-lg border-dark-matte press text-grey-lighter"
            >
              <div className="w-full p-4 py-3 border-b cursor-pointer hover:bg-dark row-btwn border-dark">
                <div className="align-col ">
                  <h1 className="text-lg font-bold text-light hover:text-primary">
                    Flutterwave
                  </h1>
                  <span className="text-xs text-accent">→ Payments</span>
                </div>

                <div className="items-center text-sm align-row">
                  <span className="text-grey-label mr-1.5">4.0</span>
                  <RatingStars rate={4} type="fill" />
                </div>
              </div>

              <div className="px-4 py-3 border-b cursor-default border-dark">
                <p className="text-sm font-light">
                  Lorem ipsum dolor sit amet consectetur. Velit ullamcorper at
                  sagittis.
                </p>
              </div>

              <div className="p-4 cursor-default align-col">
                <p className="text-sm text-accent">Top Alternatives</p>
                <div className="flex-wrap items-center mt-3 align-row">
                  {[1, 2, 3].map((alternative, alternativeIndex) => (
                    <div
                      key={alternativeIndex}
                      className="p-1 px-3 mr-2 font-light leading-relaxed capitalize border rounded-full press hover:border-accent text-light-new border-grey-border"
                    >
                      Paystack
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full font-light h-96 centered-col text-grey-lighter">
          <AppIcon icon="EmptyList" name="empty-blog" />
          <span className="mt-5 text-center">
            Sorry 😕, We couldn&apos;t get any relevant result at this time.
            <br />
            Lets try this{" "}
            <span className="cursor-pointer text-primary">again</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default AiSearchModal;
