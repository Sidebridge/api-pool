import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";

import classes from "@/styles/landing-page.module.css";

import CustomInput from "../common/util/CustomButtonedInput";

import { supabaseClient } from "@/utils/services/supabase/client";
import { validateEmail } from "@/utils/helper/validator";
import { plunk } from "@/utils/services/plunk";
import AppIcon from "../common/icons";

const NewsletterSub = () => {
  const [isSubbingUser, setIsSubbingUser] = useState<boolean>(false);

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  async function subscriptionHandler(email: string) {
    const isEmailValid = validateEmail(email as string);

    if (!isEmailValid) {
      return toast.error("Please enter a valid email to proceed!");
    }

    setIsSubbingUser(true);

    const { data, error } = await supabaseClient
      .from("newsletter_email_list")
      .insert({ email });

    if (error) {
      if (error.code === "23505") {
        toast.error(
          "You must be excited! We found you on our list already 👀",
          {
            duration: 4500,
          }
        );
      } else {
        toast.error(error.message);
      }

      return setIsSubbingUser(false);
    }

    toast.success("You're awesome! We've added you to our email list", {
      duration: 4000,
    });

    setIsSubbingUser(false);
    setIsEmailValid(false);

    // Send welcome email to subscribers via "useplunk"
    await plunk.events.track({
      email,
      event: "welcome-new-subscribers",
      data: {
        company: "APIPool",
      },
    });

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function changeHandler(email: string) {
    if (validateEmail(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  return (
    <div
      className={clsx(
        "w-full bg-contain text-center light-border font-light mt-16 align-col items-center py-14 pb-6 mb-5",
        classes["pattern-star__bg"]
      )}
    >
      <div
        className={clsx(
          "w-7/12 pt-12 pb-16 text-center rounded-t-xl overflow-hidden mt-14 bg-dark-matte centered-col",
          classes["fade-grey__bg-t2b"]
        )}
      >
        <AppIcon name="Newsletter" icon="NewsletterAccent" />

        <h3
          className={clsx(
            "text-3xl font-normal mt-6",
            classes["header-text__bg"]
          )}
        >
          Be the first to learn about New Updates!
        </h3>
        <p className="mt-4 text-lg text-grey-lighter">
          For exclusive updates, feature previews, announcements,
          <br /> and fun surprises ✨, drop your email below.
        </p>

        <div
          className={clsx(
            "items-center align-col w-9/12 mt-10 rounded-t-lg py-8 pb-12",
            classes["fade-grey__bg-t2b"]
          )}
        >
          <CustomInput
            ref={inputRef}
            style="h-14 border-grey-border hover:border-opacity-75 w-9/12"
            placeholder="example@email.com"
            btnText={isSubbingUser ? "Pooling... 😉" : "Subscribe Now"}
            processing={isSubbingUser}
            disabled={!isEmailValid}
            icon="MailWhite"
            onClick={(email) => subscriptionHandler(email as string)}
            onEnter={(email) => subscriptionHandler(email)}
            onChange={(email) => changeHandler(email as string)}
          />
          <p className="mt-10 text-lg text-grey-lighter">
            Need Help? Send us a mail at{" "}
            <a
              href={`mailto:yo@useapipool.io?subject=Yo! APIPool Is Awesome And...`}
              target="_blank"
              rel="noreferrer"
              className="text-primary"
            >
              yo@useapipool.io
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSub;
