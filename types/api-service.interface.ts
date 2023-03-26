export interface ApiService {
  business_sector: string;
  created_at: string;
  is_featured: boolean;
  logo: string;
  pricing: string[];
  reviews: unknown[];
  service_countries: string[];
  service_description: string;
  service_id: string;
  service_name: string;
  service_regions: string[];
  snapshot_image: string;
  source_url: string;
  supported_languages: string[];
}

export interface ApiServiceDomain {
  id: string;
  created_at: string;
  name: string;
  code: string | null;
  related_domains: string[];
  icon: string | null;
}
