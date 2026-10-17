import type { GroupBase, StylesConfig } from "react-select";
import type { ThemeMode } from "../theme/ThemeProvider";

export type FormSelectOption = { value: string; label: string };

function palette(theme: ThemeMode) {
  if (theme === "light") {
    return {
      border: "rgba(15, 23, 42, 0.12)",
      borderFocus: "rgba(201, 151, 58, 0.55)",
      bg: "#ffffff",
      bgFocus: "#ffffff",
      menuBg: "#ffffff",
      text: "#0f172a",
      placeholder: "rgba(15, 23, 42, 0.4)",
      muted: "rgba(15, 23, 42, 0.55)",
      optionHover: "rgba(15, 23, 42, 0.06)",
      shadow: "0 12px 40px rgba(15, 23, 42, 0.12)",
    };
  }
  return {
    border: "rgba(255,255,255,.09)",
    borderFocus: "rgba(201,151,58,.5)",
    bg: "rgba(255,255,255,.04)",
    bgFocus: "rgba(255,255,255,.06)",
    menuBg: "#0a2e18",
    text: "#fff",
    placeholder: "rgba(255,255,255,.25)",
    muted: "rgba(255,255,255,.35)",
    optionHover: "rgba(255,255,255,.08)",
    shadow: "0 12px 40px rgba(0,0,0,.45)",
  };
}

export function createFormSelectStyles<
  Option extends FormSelectOption,
  IsMulti extends boolean = false,
>(
  minHeight = 48,
  theme: ThemeMode = "dark",
): StylesConfig<Option, IsMulti, GroupBase<Option>> {
  const p = palette(theme);
  return {
    container: (base) => ({ ...base, width: "100%" }),
    control: (base, state) => ({
      ...base,
      minHeight,
      borderRadius: 14,
      backgroundColor: state.isFocused ? p.bgFocus : p.bg,
      borderColor: state.isFocused ? p.borderFocus : p.border,
      boxShadow: state.isFocused ? "0 0 0 4px rgba(201,151,58,.08)" : "none",
      fontFamily: "'Nunito', sans-serif",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      transition: "all .3s",
      "&:hover": {
        borderColor: state.isFocused ? p.borderFocus : p.border,
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "2px 14px",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: p.menuBg,
      border: "1px solid rgba(201,151,58,.22)",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: p.shadow,
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
          ? p.optionHover
          : "transparent",
      color: p.text,
      cursor: "pointer",
      fontWeight: state.isSelected ? 700 : 600,
    }),
    singleValue: (base) => ({
      ...base,
      color: p.text,
    }),
    input: (base) => ({
      ...base,
      color: p.text,
    }),
    placeholder: (base) => ({
      ...base,
      color: p.placeholder,
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: p.muted,
      paddingRight: 14,
      transition: "transform .2s",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : undefined,
    }),
    indicatorSeparator: () => ({ display: "none" }),
    noOptionsMessage: (base) => ({
      ...base,
      color: p.muted,
    }),
  };
}
