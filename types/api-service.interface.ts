export interface ApiService {
  business_sector_id: string;
  business_sector_name: string;
  created_at: string;
  is_featured: boolean;
  logo: string;
  pricing: string[];
  service_countries: string[];
  service_description: string;
  service_id: string;
  service_name: string;
  service_regions: string[] | null;
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
