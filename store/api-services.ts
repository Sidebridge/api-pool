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

export const commonApiServices: Entity<ApiService[]> = entity(
  [] as ApiService[]
);

export const setApiServices = (type: string, value: ApiService[]) => {
  if (type === "featured") {
    featuredApiServices.set(value);
  } else if (type === "common") {
    commonApiServices.set(value);
  }
};

export const getFeaturedAPIs = async () => {
  //
  const { data, error } = await supabaseClient
    .from("api_services")
    .select("*")
    .eq("is_featured", true);

  if (error) {
    setApiServices("featured", []);
  }

  if (data) {
    setApiServices("featured", data as ApiService[]);
  }
};

export const getCommonAPIServices = async (searchTerm: string) => {
  const { data, error } = await supabaseClient
    .from("api_services")
    .select("*")
    .eq("is_featured", false)
    .or(
      `service_name.ilike.%${searchTerm}%,service_description.ilike.%${searchTerm}%`
    );

  if (error) {
    setApiServices("common", []);
  }

  if (data) {
    setApiServices("common", data as ApiService[]);
  }
};
