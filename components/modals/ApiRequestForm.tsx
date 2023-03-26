import { supabaseClient } from "@/utils/services/supabase/client";
import { Button } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import BaseInput from "../common/base/BaseInput";
import BaseSelect from "../common/base/BaseSelect";

import type { ApiServiceDomain } from "@/types/api-service.interface";
import { useRouter } from "next/router";

const recommenderRelations = [
  { title: "Contributor", value: "contributor" },
  { title: "API Owner/Maintainer", value: "owner" },
  { title: "API User", value: "user" },
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

  async function sendApiRecommendation() {
    setIsProcessing(true);
    const { data, error } = await supabaseClient
      .from("api_recommendations")
      .insert(formState);

    if (error) {
      console.error(error);
    } else {
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
        setApiServiceDomains(data);
      }
    }

    getApiServiceDomains();
  }, []);

  return (
    <div className="w-full pb-4 text-white align-col bg-dark-matte">
      <div className="w-full p-6 px-8 border-b form-header light-border align-col">
        <h1 className="text-xl font-normal text-light">
          Recommend API service to be listed on APIPool
        </h1>
        <p className="text-sm text-grey-legacy mt-0.5">
          Help millions of developers discover the right APIs to build the
          next-gen products.
        </p>
      </div>

      <form className="p-6 px-8 align-col">
        <BaseInput
          id="service-source-url"
          label="Link to API Service"
          placeholder="Enter the api documentation url"
          onChange={(value) => {
            handleFormUpdate("service_source_url", value);
          }}
        />

        <BaseInput
          id="service-description"
          value={formState.service_description}
          label="Short Description"
          type="textarea"
          maxLength={150}
          required={false}
          onChange={(value) => {
            handleFormUpdate("service_description", value);
          }}
        />

        <BaseSelect
          id="service-business-domain"
          label="Service Business Domain"
          options={apiServiceDomains}
          textProp="name"
          valueProp="id"
          onChange={(value) => {
            handleFormUpdate("service_domain", value);
          }}
        />

        <BaseInput
          id="user-email"
          label="Email Address"
          onChange={(value) => {
            handleFormUpdate("recommender_email", value);
          }}
        />

        <BaseInput
          id="user-company"
          label="Company Name"
          required={false}
          onChange={(value) => {
            handleFormUpdate("recommender_company", value);
          }}
        />

        <BaseSelect
          id="recommender-relation"
          label="Who are you?"
          options={recommenderRelations}
          textProp="title"
          valueProp="value"
          onChange={(value) => {
            handleFormUpdate("recommender_relationship", value);
          }}
        />

        <Button
          className={clsx(
            "bg-primary text-dark border-none h-12 text-lg press mt-4 ml-auto",
            "flex items-center",
            isProcessing && "disabled"
          )}
          shape="round"
          type="ghost"
          icon=""
          disabled={isProcessing}
          loading={isProcessing}
          onClick={sendApiRecommendation}
        >
          {isProcessing ? "Submitting..." : "List API Service"}
        </Button>
      </form>
    </div>
  );
};

export default ApiRequestForm;
