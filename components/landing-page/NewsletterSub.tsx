import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";

import classes from "@/styles/landing-page.module.css";

import CustomInput from "../common/util/CustomButtonedInput";

import { supabaseClient } from "@/utils/services/supabase/client";
import { validateEmail } from "@/utils/helper/validator";

const NewsletterSub = () => {
  const [isSubbingUser, setIsSubbingUser] = useState<boolean>(false);

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  async function subscriptionHandler(email: string) {
    const isEmailValid = validateEmail(email);

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
        "w-full border-t text-center light-border font-light mt-20 align-col items-center pt-14",
        classes["spotlight-bg"]
      )}
    >
      <h1 className="w-5/12 text-4xl text-light">
        Be the first to learn about new updates.
      </h1>
      <p className="w-4/12 mt-5 text-lg text-grey">
        For exclusive updates, feature previews, announcements, and fun
        surprises, drop your email below.
      </p>

      <div className="w-6/12 h-32 pt-24 pb-32 border border-b-0 rounded-t-xl border-primary border-opacity-10 mt-14 bg-dark-matte centered-col">
        <span className="mb-6 font-light underline underline-offset-8 text-light decoration-primary">
          Email Address
        </span>
        <CustomInput
          ref={inputRef}
          style="h-14 border-opacity-30 w-9/12"
          placeholder="example@email.com"
          btnText="Subscribe"
          processing={isSubbingUser}
          disabled={!isEmailValid}
          icon="MailWhite"
          onClick={(email) => subscriptionHandler(email)}
          onEnter={(email) => subscriptionHandler(email)}
          onChange={(email) => changeHandler(email)}
        />
      </div>
    </div>
  );
};

export default NewsletterSub;
