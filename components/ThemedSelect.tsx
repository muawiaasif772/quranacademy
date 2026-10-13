import React, { useMemo } from "react";
import Select from "react-select";
import {
  createFormSelectStyles,
  type FormSelectOption,
} from "./formSelectTheme";

type Props = {
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: FormSelectOption[];
  placeholder?: string;
  required?: boolean;
  isSearchable?: boolean;
  minHeight?: number;
  "aria-label"?: string;
  "aria-invalid"?: boolean;
};

export const ThemedSelect: React.FC<Props> = ({
  name,
  value,
  onChange,
  options,
  placeholder = "Select…",
  required,
  isSearchable = false,
  minHeight = 48,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
}) => {
  const styles = useMemo(() => createFormSelectStyles(minHeight), [minHeight]);
  const selected = options.find((o) => o.value === value) ?? null;

  return (
    <>
      {name ? (
        <input type="hidden" name={name} value={value} required={required} />
      ) : null}
      <Select<FormSelectOption, false>
        instanceId={name ?? ariaLabel ?? placeholder}
        inputId={name ? `${name}-select` : undefined}
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        value={selected}
        onChange={(opt) => onChange(opt?.value ?? "")}
        options={options}
        placeholder={placeholder}
        isSearchable={isSearchable}
        styles={styles}
        menuPlacement="auto"
        menuPortalTarget={
          typeof document !== "undefined" ? document.body : undefined
        }
        menuPosition="fixed"
        classNamePrefix="alm-select"
      />
    </>
  );
};
