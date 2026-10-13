import React, { useEffect, useRef } from "react";
import {
  PhoneInput,
  type PhoneInputRefType,
} from "react-international-phone";
import "react-international-phone/style.css";
import "./phone-input-theme.css";
import { ThemedSelect } from "./ThemedSelect";
import {
  COUNTRY_SELECT_OPTIONS,
  DEFAULT_COUNTRY_ID,
  PHONE_COUNTRY_DATA,
  countryById,
} from "../data/countries";

export type PhoneCountryFieldErrors = Partial<
  Record<"country" | "phone" | "phoneLocal" | "countryCode", string>
>;

type Props = {
  countryId: string;
  onCountryIdChange: (id: string) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  errors?: PhoneCountryFieldErrors;
  phonePlaceholder?: string;
  layout?: "contact" | "trial";
};

const fieldErrorStyle: React.CSSProperties = {
  color: "#ff8fa3",
  fontSize: 11,
  marginTop: 6,
  lineHeight: 1.4,
};

export function buildPhonePayload(countryId: string, phone: string) {
  const country = countryById(countryId) ?? countryById(DEFAULT_COUNTRY_ID)!;
  const trimmed = phone.trim();
  return {
    country: country.name,
    phone: trimmed || country.dial,
    countryCode: country.dial,
  };
}

export const PhoneCountryFields: React.FC<Props> = ({
  countryId,
  onCountryIdChange,
  phone,
  onPhoneChange,
  errors,
  phonePlaceholder = "Phone / WhatsApp number",
  layout = "contact",
}) => {
  const phoneRef = useRef<PhoneInputRefType>(null);
  const iso2 = countryById(countryId)?.id ?? DEFAULT_COUNTRY_ID;

  useEffect(() => {
    const current = phoneRef.current?.state.country.iso2;
    if (current && current !== iso2) {
      phoneRef.current?.setCountry(iso2, { focusOnInput: false });
    }
  }, [iso2]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "100%",
        minWidth: 0,
      }}
    >
      <div
        className={`alm-phone-field${layout === "trial" ? " trial-phone" : ""}`}
        style={{ width: "100%" }}
      >
        <PhoneInput
          ref={phoneRef}
          className="alm-phone-input-container"
          style={{ width: "100%" }}
          defaultCountry={DEFAULT_COUNTRY_ID}
          value={phone}
          countries={PHONE_COUNTRY_DATA}
          preferredCountries={["pk", "sa", "ae", "gb", "us"]}
          forceDialCode
          onChange={(nextPhone, { country }) => {
            onPhoneChange(nextPhone);
            if (country.iso2 !== iso2) {
              onCountryIdChange(country.iso2);
            }
          }}
          placeholder={phonePlaceholder}
          inputProps={{
            "aria-label": "Phone number",
            autoComplete: "tel",
            inputMode: "tel",
          }}
        />
        {errors?.phone && <p style={fieldErrorStyle}>{errors.phone}</p>}
        {errors?.phoneLocal && !errors?.phone && (
          <p style={fieldErrorStyle}>{errors.phoneLocal}</p>
        )}
        {errors?.countryCode && (
          <p style={fieldErrorStyle}>{errors.countryCode}</p>
        )}
      </div>
      <div>
        <ThemedSelect
          aria-label="Country"
          value={iso2}
          onChange={onCountryIdChange}
          options={COUNTRY_SELECT_OPTIONS}
          placeholder="Select country"
          isSearchable
        />
        {errors?.country && <p style={fieldErrorStyle}>{errors.country}</p>}
      </div>
    </div>
  );
};
