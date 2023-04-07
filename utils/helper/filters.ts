import { Country } from "@/types/resources/country-list.interface";

export function filterCountryByNameAndAlphaCode(
  countries: Country[],
  countrySearchTerm: string
) {
  return countries?.filter((country: Country) => {
    return (
      String(country.name)
        .toLowerCase()
        .includes(countrySearchTerm.toLowerCase()) ||
      countrySearchTerm
        .toLowerCase()
        .includes(String(country.alpha3Code).toLowerCase()) ||
      countrySearchTerm
        .toLowerCase()
        .includes(String(country.alpha2Code).toLowerCase())
    );
  });
}

export function filterItemsByName(
  items: Array<{ [key: string]: unknown }>,
  searchTerm: string
) {
  return items?.filter((item: any) => {
    return String(item.name).toLowerCase().includes(searchTerm.toLowerCase());
  });
}

export function filterItemsBySelfTitle(items: string[], searchTerm: string) {
  return items?.filter((item) => {
    return item.toLowerCase().includes(searchTerm.toLowerCase());
  });
}
