import useSWR from "swr";

import { entity, type Entity } from "simpler-state";
import produce from "immer";

import type { ApiBookmark } from "@/types/api-service.type";

import { supabaseClient } from "@/utils/services/supabase/client";

export const userApiBookmarks: Entity<ApiBookmark[]> = entity(
  [] as ApiBookmark[]
);

export const setUserBookmarks = (value: ApiBookmark[]) => {
  userApiBookmarks.set(value);
};

export const getUserApiBookmarks = async (userId: string) => {
  let query = supabaseClient
    .from("user_api_bookmarks")
    .select(
      `
        id,
        api_services (
        *
        )
    `
    )
    .eq("user_id", userId);

  const { data, error } = await query;

  if (error) {
    setUserBookmarks([]);
  }

  if (data) {
    console.log("User bookmarks: ", data);
    setUserBookmarks(data as ApiBookmark[]);
  }
};
