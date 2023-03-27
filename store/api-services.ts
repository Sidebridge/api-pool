import { entity, type Entity } from "simpler-state";
import produce from "immer";

import type { ApiService } from "@/types/api-service.interface";

import { supabaseClient } from "@/utils/services/supabase/client";

interface Modal {
  loginModal: boolean;
  apiBriefModal: boolean;
  apiRecommendationModal: boolean;
}

export const featuredApiServices: Entity<ApiService[]> = entity(
  [] as ApiService[]
);

export const setFeaturedApiServices = (value: ApiService[]) => {
  featuredApiServices.set(value);
};

export const getFeaturedAPIs = async () => {
  //
  const { data, error } = await supabaseClient
    .from("api_services")
    .select("*")
    .eq("is_featured", true);

  if (error) {
    console.log("There was an error: ", error);
    setFeaturedApiServices([]);
  }

  if (data) {
    console.log("Returned data: ", data);
    // setFeaturedAPIs(data as ApiService[]);
    setFeaturedApiServices(data as ApiService[]);
  }
};
