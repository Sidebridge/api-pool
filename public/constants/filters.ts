type ApiFilter = {
  name: string;
  icon: string;
  resultCount: number;
};

type ApiFilters = {
  country: Array<ApiFilter>;
  sector: Array<ApiFilter>;
  langSupport: Array<ApiFilter>;
  pricing: Array<ApiFilter>;
};

const ExploreFilters: ApiFilters = {
  country: [
    {
      name: "Nigeria",
      icon: "",
      resultCount: 20,
    },
    {
      name: "Ghana",
      icon: "",
      resultCount: 20,
    },
    {
      name: "South Africa",
      icon: "",
      resultCount: 20,
    },
    {
      name: "United Kingdom",
      icon: "",
      resultCount: 20,
    },
  ],
  sector: [
    {
      name: "Ecommerce",
      icon: "",
      resultCount: 20,
    },
    {
      name: "Fintech",
      icon: "",
      resultCount: 20,
    },
    {
      name: "Logistics",
      icon: "",
      resultCount: 20,
    },
    {
      name: "Movies",
      icon: "",
      resultCount: 20,
    },
    {
      name: "Sports",
      icon: "",
      resultCount: 20,
    },
  ],
  langSupport: [
    {
      name: "Javascript",
      icon: "",
      resultCount: 37,
    },
    {
      name: "PHP",
      icon: "",
      resultCount: 20,
    },
    {
      name: "Python",
      icon: "",
      resultCount: 4,
    },
  ],
  pricing: [
    {
      name: "Free",
      icon: "",
      resultCount: 20,
    },
    {
      name: "Paid",
      icon: "",
      resultCount: 20,
    },
  ],
};

export default ExploreFilters;
