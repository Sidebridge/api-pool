import { Database } from "@/types/supabase";

export type ApiService = Database["public"]["Tables"]["api_services"]["Row"];

export type ApiServiceDomain =
  Database["public"]["Tables"]["api_service_domains"]["Row"];

export type ApiReview = Database["public"]["Tables"]["api_reviews"]["Row"];

export type ApiBookmark = {
  id: string;
  api_services: ApiService;
};
