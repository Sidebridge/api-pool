import { supabaseClient } from "@/utils/services/supabase/client";
import { Button } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import BaseInput from "../common/base/BaseInput";
import BaseSelect from "../common/base/BaseSelect";

import type { ApiServiceDomain } from "@/types/api-service.interface";
import { useRouter } from "next/router";
import BaseButton from "../common/base/BaseButton";
import toast from "react-hot-toast";

const recommenderRelations = [
  { title: "API Owner/Maintainer", value: "owner" },
  { title: "API User", value: "user" },
  { title: "APIPool Contributor", value: "contributor" },
];

const ApiRequestForm = ({ onSubmitted }: { onSubmitted: () => void }) => {
  const [formState, setFormState] = useState<{
    [key: string]: any;
  }>({
    service_source_url: "",
    service_description: "",
    service_domain: "",
    recommender_email: "",
    recommender_company: "",
    recommender_relationship: "",
  });

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [apiServiceDomains, setApiServiceDomains] = useState([]);

  function handleFormUpdate(property: string, val: string) {
    const formData = { ...formState };

    formData[property] = val;

    setFormState(formData);
  }

  const [isFormValid, setFormValidity] = useState<boolean>(false);

  async function sendApiRecommendation() {
    setIsProcessing(true);
    const { data, error } = await supabaseClient
      .from("api_recommendations")
      .insert(formState);

    if (error) {
      if (error.code === "23505") {
        toast.error(
          "🙊 This API is either listed already or is on our recommended list.",
          { duration: 4000 }
        );
      } else {
        toast.error("Oops! Something went wrong. Try again...");
      }
      console.error(error);
    } else {
      toast.success(
        `Thank you for the recommendation 🙏🏻. We'll let you know when this API gets listed.`,
        { duration: 5000 }
      );
      onSubmitted();
    }

    setIsProcessing(false);
  }

  useEffect(() => {
    async function getApiServiceDomains() {
      const { data, error } = await supabaseClient
        .from("api_service_domains")
        .select();

      if (error) {
        console.log("There was an error: ", error);
        setApiServiceDomains([]);
      }

      if (data) {
        console.log(data);
        setApiServiceDomains(data as []);
      }
    }

    getApiServiceDomains();
  }, []);

  useEffect(() => {
    const formValidity =
      formState["service_source_url"] &&
      formState["service_domain"] &&
      formState["recommender_email"] &&
      formState["recommender_relationship"];

    setFormValidity(formValidity);
  }, [formState]);

  return (
    <div className="w-full pb-4 text-white border align-col bg-body border-dark">
      <div className="w-full p-6 px-8 border-b border-dark form-header align-col">
        <h1 className="text-xl font-normal text-light-new">
          List API service on APIPool
        </h1>
        <p className="text-grey-lighter text-sm font-light mt-0.5">
          Help millions of developers discover the right APIs to build fantastic
          products.
        </p>
      </div>

      <form className="p-6 px-8 align-col">
        <div className="grid w-full grid-flow-row grid-cols-2 gap-x-4">
          <BaseInput
            id="service-source-url"
            label="API Name or Docs Link"
            labelStyle="text-grey-lighter font-light"
            inputStyle="rounded-xl"
            placeholder="e.g. Example API or https://docs.example.com"
            value={formState["service_source_url"]}
            onChange={(value) => {
              handleFormUpdate("service_source_url", value);
            }}
          />

          <BaseSelect
            id="service-business-domain"
            label="Service Business Domain"
            labelStyle="text-grey-lighter font-light"
            inputStyle="rounded-xl"
            options={apiServiceDomains}
            textProp="name"
            valueProp="id"
            onChange={(value) => {
              handleFormUpdate("service_domain", value);
            }}
          />
        </div>

        <BaseInput
          id="service-description"
          label="Short API Description"
          labelStyle="text-grey-lighter font-light"
          inputStyle="rounded-2xl"
          type="textarea"
          placeholder="What does this API service do?"
          maxLength={250}
          row={4}
          required={false}
          value={formState["service_description"]}
          onChange={(value) => {
            handleFormUpdate("service_description", value);
          }}
        />

        <div className="grid w-full grid-flow-row grid-cols-2 mt-1 gap-x-4">
          <BaseInput
            id="user-email"
            label="Email Address"
            labelStyle="text-grey-lighter font-light"
            inputStyle="rounded-xl"
            placeholder="e.g. amazing-person@you.com"
            value={formState["recommender_email"]}
            onChange={(value) => {
              handleFormUpdate("recommender_email", value);
            }}
          />

          <BaseInput
            id="user-company"
            label="Company Name"
            labelStyle="text-grey-lighter font-light"
            inputStyle="rounded-xl"
            required={false}
            placeholder="What company are you representing?"
            value={formState["recommender_company"]}
            onChange={(value) => {
              handleFormUpdate("recommender_company", value);
            }}
          />
        </div>

        <BaseSelect
          id="recommender-relation"
          label="Who are you?"
          labelStyle="text-grey-lighter font-light"
          inputStyle="rounded-xl"
          options={recommenderRelations}
          textProp="title"
          valueProp="value"
          onChange={(value) => {
            handleFormUpdate("recommender_relationship", value);
          }}
        />

        <BaseButton
          styles="text-dark px-5 h-12 text-lg mt-4 mx-auto"
          type="primary"
          disabled={isProcessing || !isFormValid}
          loading={isProcessing}
          onClick={sendApiRecommendation}
        >
          {isProcessing ? "Submitting..." : "List API Service"}
        </BaseButton>
      </form>
    </div>
  );
};

export default ApiRequestForm;
