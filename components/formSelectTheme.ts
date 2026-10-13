import type { GroupBase, StylesConfig } from "react-select";

export type FormSelectOption = { value: string; label: string };

const border = "rgba(255,255,255,.09)";
const borderFocus = "rgba(201,151,58,.5)";
const bg = "rgba(255,255,255,.04)";
const bgFocus = "rgba(255,255,255,.06)";
const menuBg = "#0a2e18";

export function createFormSelectStyles<
  Option extends FormSelectOption,
  IsMulti extends boolean = false,
>(
  minHeight = 48,
): StylesConfig<Option, IsMulti, GroupBase<Option>> {
  return {
    container: (base) => ({ ...base, width: "100%" }),
    control: (base, state) => ({
      ...base,
      minHeight,
      borderRadius: 14,
      backgroundColor: state.isFocused ? bgFocus : bg,
      borderColor: state.isFocused ? borderFocus : border,
      boxShadow: state.isFocused ? "0 0 0 4px rgba(201,151,58,.08)" : "none",
      fontFamily: "'Nunito', sans-serif",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      transition: "all .3s",
      "&:hover": {
        borderColor: state.isFocused ? borderFocus : border,
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "2px 14px",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: menuBg,
      border: "1px solid rgba(201,151,58,.22)",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "0 12px 40px rgba(0,0,0,.45)",
      zIndex: 60,
    }),
    menuList: (base) => ({
      ...base,
      padding: 6,
      maxHeight: 260,
    }),
    option: (base, state) => ({
      ...base,
      borderRadius: 10,
      margin: "2px 0",
      backgroundColor: state.isSelected
        ? "rgba(201,151,58,.28)"
        : state.isFocused
          ? "rgba(255,255,255,.08)"
          : "transparent",
      color: "#fff",
      cursor: "pointer",
      fontWeight: state.isSelected ? 700 : 600,
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fff",
    }),
    input: (base) => ({
      ...base,
      color: "#fff",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255,255,255,.25)",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: "rgba(255,255,255,.35)",
      paddingRight: 14,
      transition: "transform .2s",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : undefined,
    }),
    indicatorSeparator: () => ({ display: "none" }),
    noOptionsMessage: (base) => ({
      ...base,
      color: "rgba(255,255,255,.5)",
    }),
  };
}
