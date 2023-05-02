export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      api_recommendations: {
        Row: {
          created_at: string | null
          id: string
          recommender_company: string | null
          recommender_email: string | null
          recommender_relationship: string | null
          service_description: string | null
          service_domain: string | null
          service_source_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          recommender_company?: string | null
          recommender_email?: string | null
          recommender_relationship?: string | null
          service_description?: string | null
          service_domain?: string | null
          service_source_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          recommender_company?: string | null
          recommender_email?: string | null
          recommender_relationship?: string | null
          service_description?: string | null
          service_domain?: string | null
          service_source_url?: string | null
        }
      }
      api_reviews: {
        Row: {
          api_service_id: string
          created_at: string | null
          id: string
          review_message: string | null
          review_stars: number | null
          reviewer_company: string | null
          reviewer_id: string
          reviewer_name: string | null
        }
        Insert: {
          api_service_id: string
          created_at?: string | null
          id?: string
          review_message?: string | null
          review_stars?: number | null
          reviewer_company?: string | null
          reviewer_id: string
          reviewer_name?: string | null
        }
        Update: {
          api_service_id?: string
          created_at?: string | null
          id?: string
          review_message?: string | null
          review_stars?: number | null
          reviewer_company?: string | null
          reviewer_id?: string
          reviewer_name?: string | null
        }
      }
      api_service_domains: {
        Row: {
          code: string | null
          created_at: string | null
          icon: string | null
          id: string
          name: string | null
          related_domains: string[] | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string | null
          related_domains?: string[] | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string | null
          related_domains?: string[] | null
        }
      }
      api_services: {
        Row: {
          business_sector_id: string | null
          business_sector_name: string | null
          created_at: string
          is_featured: boolean
          logo: string | null
          pricing: string[] | null
          related_sectors: string[] | null
          service_countries: string[] | null
          service_description: string | null
          service_id: string
          service_name: string | null
          service_regions: string[] | null
          snapshot_image: string | null
          source_url: string | null
          supported_languages: string[] | null
        }
        Insert: {
          business_sector_id?: string | null
          business_sector_name?: string | null
          created_at?: string
          is_featured: boolean
          logo?: string | null
          pricing?: string[] | null
          related_sectors?: string[] | null
          service_countries?: string[] | null
          service_description?: string | null
          service_id?: string
          service_name?: string | null
          service_regions?: string[] | null
          snapshot_image?: string | null
          source_url?: string | null
          supported_languages?: string[] | null
        }
        Update: {
          business_sector_id?: string | null
          business_sector_name?: string | null
          created_at?: string
          is_featured?: boolean
          logo?: string | null
          pricing?: string[] | null
          related_sectors?: string[] | null
          service_countries?: string[] | null
          service_description?: string | null
          service_id?: string
          service_name?: string | null
          service_regions?: string[] | null
          snapshot_image?: string | null
          source_url?: string | null
          supported_languages?: string[] | null
        }
      }
      newsletter_email_list: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
      }
      test_db_table: {
        Row: {
          array_field: string[] | null
          boolean_field: boolean
          created_at: string | null
          id: string
          relation_field: string | null
          unique_name: string | null
        }
        Insert: {
          array_field?: string[] | null
          boolean_field: boolean
          created_at?: string | null
          id?: string
          relation_field?: string | null
          unique_name?: string | null
        }
        Update: {
          array_field?: string[] | null
          boolean_field?: boolean
          created_at?: string | null
          id?: string
          relation_field?: string | null
          unique_name?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
