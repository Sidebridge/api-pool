import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";

import classes from "@/styles/landing-page.module.css";

import CustomInput from "../common/util/CustomButtonedInput";

import { supabaseClient } from "@/utils/services/supabase/client";
import { validateEmail } from "@/utils/helper/validator";
import { plunk } from "@/utils/services/plunk";
import AppIcon from "../common/icons";
import BaseInput from "../common/base/BaseInput";

type SubscriptionForm = {
  name: string;
  email: string;
};

const NewsletterSub = () => {
  const [isSubbingUser, setIsSubbingUser] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [subscriptionForm, setSubForm] = useState<SubscriptionForm>({
    name: "",
    email: "",
  });

  async function subscriptionHandler() {
    if (
      !validateEmail(subscriptionForm.email as string) ||
      !subscriptionForm.name
    ) {
      return toast.error("Please enter a valid name & email to proceed!");
    }

    setIsSubbingUser(true);

    const { data, error } = await supabaseClient
      .from("newsletter_email_list")
      .insert(subscriptionForm);

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

    // Send welcome email to subscribers via "useplunk"
    await plunk.events.track({
      email: subscriptionForm.email,
      event: "welcome-new-subscribers",
      data: {
        company: "APIPool",
      },
    });

    setSubForm({
      name: "",
      email: "",
    });
  }

  function changeHandler(value: string, field: string) {
    setSubForm({ ...subscriptionForm, [field]: value });
  }

  return (
    <div
      className={clsx(
        "w-full bg-contain text-center border-x-0 light-border font-light mt-16 align-col items-center pt-6 lg:pt-14 pt pb-6 mb-5",
        classes["pattern-star__bg"]
      )}
    >
      <div
        className={clsx(
          "w-10/12 px-16 lg:px-0 lg:w-7/12 pt-12 pb-16 text-center rounded-t-xl overflow-hidden mt-14 bg-dark-matte centered-col",
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
          For exclusive updates on new listings, feature previews,
          announcements,
          <br className="hidden lg:flex" /> and fun surprises ✨, drop your
          details below.
        </p>

        <div
          className={clsx(
            "items-center align-col w-full lg:w-9/12 lg:mt-10 mt-14 rounded-t-lg py-8 pb-12",
            classes["fade-grey__bg-t2b"]
          )}
        >
          <div className="w-full centered-col">
            <BaseInput
              id="service-source-url"
              label="Provide Name & Email Address"
              labelStyle="text-grey-lighter font-light text-center mx-auto mb-3"
              inputStyle="rounded-xl w-full border border-grey-border rounded-2xl text-white"
              placeholder="Full Name e.g. John Doe"
              styles="w-8/12"
              value={subscriptionForm.name}
              onChange={(name) => changeHandler(name, "name")}
            />
          </div>

          <CustomInput
            ref={inputRef}
            style="h-16 -mt-2 border-grey-border bg-[#0D0D0D] hover:border-opacity-75 w-9/12"
            placeholder="example@email.com"
            btnText={isSubbingUser ? "Subbing... 🚀" : "Subscribe Now"}
            processing={isSubbingUser}
            disabled={
              !(validateEmail(subscriptionForm.email) && subscriptionForm.name)
            }
            // icon="MailWhite"
            symbol="@"
            value={subscriptionForm.email}
            onClick={subscriptionHandler}
            onEnter={subscriptionHandler}
            onChange={(email) => changeHandler(email as string, "email")}
          />
          <p className="mt-10 text-grey-lighter">
            Need Help? 🚀 Shoot us a mail at ({" "}
            <a
              href={`mailto:yo@useapipool.com?subject=Yo! APIPool Is Awesome And...`}
              target="_blank"
              rel="noreferrer"
              className="text-primary"
            >
              yo@useapipool.com
            </a>{" "}
            )
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSub;
