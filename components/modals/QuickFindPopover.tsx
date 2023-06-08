import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { Tooltip } from "antd";
import AppIcon from "../common/icons";
import BaseButton from "../common/base/BaseButton";

import { supabaseClient } from "@/utils/services/supabase/client";
import { ApiService } from "@/types/api-service.type";
import { IconType } from "../common/icons/iconMap";
import { toggleModal } from "@/store/modal";

type GoToPages = {
  name: string;
  displayText: string;
  aliases: string[];
  route: string;
  available?: boolean;
};

type QuickOpenActions = {
  name: string;
  displayText: string;
  aliases: string[];
  action: () => void;
};

const gotoPages: GoToPages[] = [
  {
    name: "Explore",
    displayText: "Explore Page (find APIs by use case)",
    aliases: ["explore", "find API", "explore", "search api", "search"],
    route: "/explore",
    available: true,
  },
  {
    name: "Compare",
    displayText: "Compare Page (compare similar APIs by features)",
    aliases: ["compare", "compare api", "choose api"],
    route: "/compare",
    available: false,
  },
  {
    name: "Contribution",
    displayText: "Contribute to APIPool",
    aliases: [
      "contribution",
      "donate",
      "contribute",
      "help",
      "join apipool",
      "join team",
      "support",
    ],
    route: "",
    available: false,
  },
  {
    name: "Promo",
    displayText: "Promote/Sponsor API Product",
    aliases: ["promo", "promotion", "promote", "sponsor", "sponsorship"],
    route: "/#promote-api",
    available: true,
  },
];

const QuickFindPopover = ({ onClose = () => {} }: { onClose?: () => void }) => {
  const router = useRouter();
  const styles = {
    border: "border border-grey-border border-opacity-75",
  };

  const quickOpenActions: QuickOpenActions[] = [
    {
      name: "Bookmark",
      displayText: "Your API Product Bookmarks",
      aliases: [
        "bookmark",
        "my bookmarks",
        "api bookmarks",
        "product bookmarks",
      ],
      action: () => {
        onClose();
        toggleModal("bookmarksModal", true);
      },
    },
    {
      name: "Recommend API",
      displayText: "List or Recommend an API Product",
      aliases: ["list", "list api", "recommend", "suggest api", "suggest"],
      action: () => {
        onClose();
        toggleModal("apiRecommendationModal", true);
      },
    },
  ];

  const Tag = ({ text, classes }: { text: string; classes?: string }) => (
    <span
      className={clsx(
        "mx-1 px-2 py-0.5 pb-1 text-center leading-relaxed rounded",
        styles.border,
        classes
      )}
    >
      {text}
    </span>
  );

  const SearchSuggestion = ({
    icon,
    tag,
    text = searchTerm,
    btnText = "Select",
    btnTooltip,
    action = () => {},
  }: {
    icon: IconType;
    tag: string;
    text?: string;
    btnText?: string;
    btnTooltip?: string;
    action?: () => void;
  }) => {
    return (
      <div className="items-center w-full px-5 py-4 border-t border-opacity-75 cursor-default hover:bg-grey-faint hover:bg-opacity-20 border-grey-border align-row">
        <AppIcon icon={icon} styles="mr-3 w-5 h-5" />

        <div className="w-24">
          <span className="p-2 py-0.5 bg-accent text-dark whitespace-nowrap">
            {tag}:
          </span>
        </div>

        <p className="flex flex-grow ml-3 overflow-hidden font-light text-light">
          {text}
        </p>

        <Tooltip title={btnTooltip} placement="left">
          <span></span>
          <BaseButton
            text={btnText}
            type="default"
            styles="ml-auto border border-grey-lighter hover:border-primary px-4 py-1 text-light opacity-30 hover:opacity-90"
            postIcon={"ArrowRightWhite"}
            iconStyles="ml-1"
            onClick={action}
          />
        </Tooltip>
      </div>
    );
  };

  const quickFindInputRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [matchingPages, setMatchingPages] = useState<GoToPages[]>([]);
  const [matchingQuickOpenActions, setQuickOpenActions] = useState<
    QuickOpenActions[]
  >([]);

  function quickSearchAPI() {
    localStorage.setItem("localSearchTerm", searchTerm);
    router.push("explore");
    onClose();
  }

  useEffect(() => {
    setMatchingPages([]);
    setQuickOpenActions([]);

    if (
      searchTerm.toLowerCase().startsWith("go to") ||
      searchTerm.toLowerCase().startsWith("goto") ||
      searchTerm.toLowerCase().startsWith("show")
    ) {
      const intentTerm =
        searchTerm.split("go to ")[1] ||
        searchTerm.split("goto ")[1] ||
        searchTerm.split("show ")[1];

      const regex = new RegExp(intentTerm, "i");

      const match = gotoPages.filter((obj) => {
        const value = obj["aliases"];

        if (Array.isArray(value) && value.some((alias) => regex.test(alias))) {
          return true;
        }
        return false;
      });

      setMatchingPages(match);
    }

    if (searchTerm.toLowerCase().startsWith("open")) {
      const intentTerm = searchTerm.split("open ")[1];

      const regex = new RegExp(intentTerm, "i");

      const match = quickOpenActions.filter((obj) => {
        const value = obj["aliases"];

        if (Array.isArray(value) && value.some((alias) => regex.test(alias))) {
          return true;
        }
        return false;
      });

      setQuickOpenActions(match);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    quickFindInputRef.current?.focus();
  }, []);

  return (
    <>
      <div
        className={clsx(
          "w-full search-wrapper bg-body align-col",
          "rounded-xl",
          styles.border
        )}
      >
        <div className="w-full px-5 row-btwn">
          <AppIcon icon={"SearchGreen"} />
          <input
            ref={quickFindInputRef}
            className={clsx(
              "h-14 bg-transparent outline-none border-none text-light font-light ml-2 flex flex-grow",
              "focus:border-none focus:outline-none placeholder:text-grey-label placeholder:font-light"
            )}
            placeholder="Type a command or search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AppIcon
            icon={"CloseGreen"}
            styles={clsx("press", !searchTerm && "hidden")}
            onClick={() => setSearchTerm("")}
          />
        </div>

        <div
          className={clsx(
            "w-full border-box max-h-[60vh] overflow-y-scroll border-t-[0.3px] border-grey-border border-opacity-80",
            !searchTerm && "hidden"
          )}
        >
          {(matchingPages.length || matchingQuickOpenActions.length) && (
            <div className={clsx("w-full my-4 align-col")}>
              <p className="mx-5 mb-2 text-sm text-grey-legacy">Page Actions</p>
              {matchingPages.map((page) => (
                <SearchSuggestion
                  key={page.name}
                  icon="DocScanner"
                  tag="Go To"
                  btnText="Open"
                  btnTooltip={page.available ? "" : "Coming Soon ✨"}
                  text={page.displayText}
                  action={() => {
                    if (page.available) {
                      onClose();
                      router.push(page.route);
                    }
                  }}
                />
              ))}

              {matchingQuickOpenActions.map((action) => (
                <SearchSuggestion
                  key={action.name}
                  icon="DocScanner"
                  tag="Open"
                  btnText="Open"
                  text={action.displayText}
                  action={action.action}
                />
              ))}
            </div>
          )}

          <div className="w-full align-col">
            <p className="mx-5 mb-2 text-sm text-grey-legacy">Resources</p>
            {!(
              searchTerm.startsWith("go to ") || searchTerm.startsWith("goto ")
            ) && (
              <SearchSuggestion
                icon="TipsGreen"
                tag="Find API"
                btnText="Find"
                action={quickSearchAPI}
              />
            )}
            <SearchSuggestion
              icon="MagicWand"
              tag="AI Search"
              btnText="Magic"
              btnTooltip="Coming Soon ✨"
            />
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "w-full text-light rounded-xl mt-2.5 p-6 px-5  search-wrapper bg-body",
          searchTerm && "hidden",
          styles.border
        )}
      >
        <span className="items-center align-row">
          <AppIcon icon={"TipsGreen"} styles="mr-5" />
          <span className="font-light uppercase">Search Tips</span>
        </span>

        <p className="mt-5 text-sm font-light">
          Press <Tag text="esc" classes="text-red-400" /> key to close
        </p>

        <div
          className={clsx("w-full my-5 border-[0.3px]", styles.border)}
        ></div>

        <p className="mt-5 text-sm font-light">
          Find APIs by <Tag text="Name" />
          {", "}
          <Tag text="Use Case" />
          {", "}
          or use <Tag text="Go to ⇝" classes="text-primary" /> /{" "}
          <Tag text="Show" classes="text-primary" /> pages or{" "}
          <Tag text="Open" classes="text-primary" /> actions
        </p>
      </div>
    </>
  );
};

export default QuickFindPopover;
