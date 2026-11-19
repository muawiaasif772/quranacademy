/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./App.tsx",
    "./entry-server.tsx",
    "./components/**/*.{ts,tsx}",
    "./components2/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./theme/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data.ts",
    "./data/**/*.ts",
  ],
  theme: { extend: {} },
  plugins: [],
};
