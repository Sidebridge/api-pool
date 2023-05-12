import LogoPlaceholder from "../../../assets/images/logo/apipool-favicon_grey.svg";
import Search from "../../../assets/images/svg/search.svg";
import Ecommerce from "../../../assets/images/svg/ecommerce.svg";
import Sport from "../../../assets/images/svg/sports.svg";
import Movie from "../../../assets/images/svg/movie.svg";
import Logistic from "../../../assets/images/svg/shipping.svg";
import BriefWhite from "../../../assets/images/svg/brief.svg";
import CompareWhite from "../../../assets/images/svg/compare.svg";
import CompareGreen from "../../../assets/images/svg/compare_green.svg";
import CompareDark from "../../../assets/images/svg/compare_dark.svg";
import ArrowRightBlack from "../../../assets/images/svg/arrow_right_black.svg";
import ArrowRightWhite from "../../../assets/images/svg/arrow_right_white.svg";
import ArrowDownGreen from "../../../assets/images/svg/key_arrow_down_green.svg";
import DonateWhite from "../../../assets/images/svg/donate_white.svg";
import DonateAccent from "../../../assets/images/svg/donate_accent.svg";
import BookmarkWhite from "../../../assets/images/svg/bookmark_white.svg";
import BookmarkFillWhite from "../../../assets/images/svg/bookmark_fill_white.svg";
import RoundCloseWhite from "../../../assets/images/svg/round_close_white.svg";
import ArrowLeftGreen from "../../../assets/images/svg/arrow_left_green.svg";
import WebBlack from "../../../assets/images/svg/web_black.svg";
import UserPrimary from "../../../assets/images/svg/user_primary.svg";
import AppleLogo from "../../../assets/images/svg/apple_logo.svg";
import GoogleLogo from "../../../assets/images/svg/google_logo.svg";
import GithubWhite from "../../../assets/images/svg/github_white.svg";

import EventAvailableGreen from "../../../assets/images/svg/event_available_green.svg";
import DollarGreen from "../../../assets/images/svg/dollar_green.svg";
import CalendarGreen from "../../../assets/images/svg/calendar_green.svg";
import CodeGreen from "../../../assets/images/svg/code_green.svg";
import UsersGreen from "../../../assets/images/svg/users_green.svg";
import DropArrowGreen from "../../../assets/images/svg/drop_arrow_green.svg";
import BookmarksGreen from "../../../assets/images/svg/bookmarks.svg";
import LogoutGreen from "../../../assets/images/svg/logout.svg";
import ReviewStarGreen from "../../../assets/images/svg/star_half.svg";
import MailWhite from "../../../assets/images/svg/mail_white.svg";
import ExploreGreen from "../../../assets/images/svg/explore_green.svg";
import IntegrateGreen from "../../../assets/images/svg/integrate_green.svg";
import NewsletterAccent from "../../../assets/images/svg/mail_envelope_accent.svg";
import FeaturedBadge from "../../../assets/images/svg/featured_badge_green.svg";
import FeaturedBadgeAccent from "../../../assets/images/svg/featured_badge_orange.svg";
import WebGlobe from "../../../assets/images/svg/web_globe.svg";
import SignatureOrange from "../../../assets/images/svg/signature_orange.svg";
import RatingStarOrange from "../../../assets/images/svg/rating_star_orange.svg";
import CloseGreen from "../../../assets/images/svg/close_green.svg";
import MagicWand from "../../../assets/images/svg/magicwand_orange.svg";
import ExpandRoundWhite from "../../../assets/images/svg/expand_round_white.svg";
import EditGreen from "../../../assets/images/svg/edit_green.svg";
import TrashRed from "../../../assets/images/svg/trash_red.svg";

import ErrorBroken from "../../../assets/images/svg/error_broken.svg";
import EmptyList from "../../../assets/images/svg/empty_list_illustration.svg";
import PromoLogo from "../../../assets/images/svg/promo_logo.svg";

import LoaderGif from "../../../assets/images/gifs/loading-gif.gif";

export type IconType = keyof typeof Icons;

const Icons = {
  LogoPlaceholder,
  Search,
  Ecommerce,
  Sport,
  Movie,
  Logistic,
  BriefWhite,
  CompareWhite,
  CompareGreen,
  CompareDark,
  ArrowRightBlack,
  ArrowRightWhite,
  ArrowDownGreen,
  DonateWhite,
  DonateAccent,
  BookmarkWhite,
  BookmarkFillWhite,
  RoundCloseWhite,
  ArrowLeftGreen,
  WebBlack,
  UserPrimary,
  AppleLogo,
  GoogleLogo,
  GithubWhite,
  EventAvailableGreen,
  DollarGreen,
  CalendarGreen,
  CodeGreen,
  UsersGreen,
  DropArrowGreen,
  BookmarksGreen,
  LogoutGreen,
  ReviewStarGreen,
  MailWhite,
  ExploreGreen,
  IntegrateGreen,
  NewsletterAccent,
  FeaturedBadge,
  FeaturedBadgeAccent,
  WebGlobe,
  SignatureOrange,
  RatingStarOrange,
  CloseGreen,
  MagicWand,
  ExpandRoundWhite,
  EditGreen,
  TrashRed,

  PromoLogo,
  ErrorBroken,
  EmptyList,
  LoaderGif,
} as const;

export default Icons;
