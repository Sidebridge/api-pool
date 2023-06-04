import useSWR from "swr";

import { entity, type Entity } from "simpler-state";

import type { ApiService } from "@/types/api-service.type";

import { supabaseClient } from "@/utils/services/supabase/client";

export const featuredApiServices: Entity<ApiService[]> = entity(
  [] as ApiService[]
);

export const commonApiServices: Entity<ApiService[]> = entity(
  [] as ApiService[]
);

export const relatedApiServices: Entity<ApiService[]> = entity(
  [] as ApiService[]
);

export const currentAPI: Entity<ApiService> = entity({} as ApiService);

export const setApiServices = (type: string, value: ApiService[]) => {
  if (type === "featured") {
    featuredApiServices.set(value);
  } else if (type === "common") {
    commonApiServices.set(value);
  } else if (type === "related") {
    relatedApiServices.set(value);
  }
};

export const setCurrentApi = (value: ApiService) => {
  currentAPI.set(value);
};

export const getFeaturedAPIs = async () => {
  const { data, error } = await supabaseClient
    .from("api_services")
    .select("*")
    .eq("is_featured", true)
    .limit(9);

  if (error) {
    setApiServices("featured", []);
  }

  if (data) {
    setApiServices("featured", data);
  }
};

export const getCommonAPIServices = async (
  searchTerm: string,
  filterObject?: { [key: string]: any },
  currentPage: number = 1,
  pageSize: number = 6
) => {
  const rangeStart = (currentPage - 1) * pageSize;
  const rangeEnd = currentPage * pageSize - 1;

  let query = supabaseClient
    .from("api_services")
    .select("*")
    .or(
      `service_name.ilike.%${searchTerm}%,service_description.ilike.%${searchTerm}%`
    );

  if (filterObject) {
    if (filterObject.countries && filterObject.countries.length) {
      query = query.overlaps("service_countries", filterObject.countries);
    }

    if (filterObject.sectors && filterObject.sectors.length) {
      query = query.in("business_sector_id", filterObject.sectors);
    }

    if (filterObject.pricings && filterObject.pricings.length) {
      query = query.overlaps("pricing", filterObject.pricings);
    }

    if (
      filterObject.supportedLanguages &&
      filterObject.supportedLanguages.length
    ) {
      query = query.overlaps(
        "supported_languages",
        filterObject.supportedLanguages
      );
    }
  }

  query = query.limit(pageSize);
  query = query.range(rangeStart, rangeEnd);

  const { data, error } = await query;

  if (error) {
    setApiServices("common", []);
  }

  if (data) {
    setApiServices("common", data);
  }
};

export const getRelatedAPIServicesBySector = async (
  currentApiId: string,
  sectorId: string | null
  // relatedSectors: string[]
) => {
  let query = supabaseClient
    .from("api_services")
    .select("*")
    .eq("business_sector_id", sectorId)
    .neq("service_id", currentApiId)
    .limit(6);

  const { data, error } = await query;

  if (error) {
    setApiServices("related", []);
  }

  if (data) {
    setApiServices("related", data);
  }
};
