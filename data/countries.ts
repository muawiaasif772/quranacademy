import {
  defaultCountries,
  type CountryData,
} from "react-international-phone";

/** Country + dial code pairs (one row per country; dial and name stay in sync). */
export interface CountryPhoneOption {
  id: string;
  name: string;
  dial: string;
}

export const COUNTRY_PHONE_OPTIONS: CountryPhoneOption[] = [
  { id: "pk", name: "Pakistan", dial: "+92" },
  { id: "sa", name: "Saudi Arabia", dial: "+966" },
  { id: "ae", name: "United Arab Emirates", dial: "+971" },
  { id: "gb", name: "United Kingdom", dial: "+44" },
  { id: "us", name: "United States", dial: "+1" },
  { id: "ca", name: "Canada", dial: "+1" },
  { id: "au", name: "Australia", dial: "+61" },
  { id: "in", name: "India", dial: "+91" },
  { id: "bd", name: "Bangladesh", dial: "+880" },
  { id: "eg", name: "Egypt", dial: "+20" },
  { id: "tr", name: "Turkey", dial: "+90" },
  { id: "my", name: "Malaysia", dial: "+60" },
  { id: "id", name: "Indonesia", dial: "+62" },
  { id: "qa", name: "Qatar", dial: "+974" },
  { id: "kw", name: "Kuwait", dial: "+965" },
  { id: "om", name: "Oman", dial: "+968" },
  { id: "bh", name: "Bahrain", dial: "+973" },
  { id: "jo", name: "Jordan", dial: "+962" },
  { id: "lb", name: "Lebanon", dial: "+961" },
  { id: "de", name: "Germany", dial: "+49" },
  { id: "fr", name: "France", dial: "+33" },
  { id: "nl", name: "Netherlands", dial: "+31" },
  { id: "se", name: "Sweden", dial: "+46" },
  { id: "no", name: "Norway", dial: "+47" },
  { id: "dk", name: "Denmark", dial: "+45" },
  { id: "ie", name: "Ireland", dial: "+353" },
  { id: "za", name: "South Africa", dial: "+27" },
  { id: "ng", name: "Nigeria", dial: "+234" },
  { id: "ke", name: "Kenya", dial: "+254" },
  { id: "sg", name: "Singapore", dial: "+65" },
  { id: "nz", name: "New Zealand", dial: "+64" },
  { id: "it", name: "Italy", dial: "+39" },
  { id: "es", name: "Spain", dial: "+34" },
  { id: "br", name: "Brazil", dial: "+55" },
];

export const DEFAULT_COUNTRY_ID = "pk";

/** Country rows for react-international-phone (masks + dial codes from the library). */
export const PHONE_COUNTRY_DATA: CountryData[] = COUNTRY_PHONE_OPTIONS.map(
  (c) => defaultCountries.find((row) => row[1] === c.id)!,
).filter(Boolean);

export const COUNTRY_SELECT_OPTIONS = COUNTRY_PHONE_OPTIONS.map((c) => ({
  value: c.id,
  label: c.name,
}));

export function countryById(id: string): CountryPhoneOption | undefined {
  return COUNTRY_PHONE_OPTIONS.find((c) => c.id === id);
}

export function countryByDial(dial: string): CountryPhoneOption | undefined {
  return COUNTRY_PHONE_OPTIONS.find((c) => c.dial === dial);
}

/** Prefer exact country name; otherwise first country with this dial code. */
export function resolveCountryId(countryName: string, dial: string): string {
  const byName = COUNTRY_PHONE_OPTIONS.find(
    (c) => c.name.toLowerCase() === countryName.trim().toLowerCase(),
  );
  if (byName) return byName.id;
  const byDial = countryByDial(dial);
  return byDial?.id ?? DEFAULT_COUNTRY_ID;
}

export function formatPhoneWithDial(dial: string, local: string): string {
  const digits = local.replace(/\D/g, "");
  const code = dial.replace(/\s/g, "");
  return digits ? `${code}${digits.startsWith("0") ? digits.slice(1) : digits}` : code;
}
