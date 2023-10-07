import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: "rgb(29, 155, 240)",
        green: "rgb(0, 186, 124)",
        pink: "rgb(249, 24, 128)",
        "custom-gray": "rgb(22, 24, 28)",
        "light-gray": "rgba(91, 112, 131, 0.4)",
      },
      boxShadow: {
        custom:
          "0px 0px 15px rgba(255, 255, 255, 0.2) ,0px 0px 3px 1px rgba(255, 255, 255, 0.15)",
        "custom-triangle-lower":
          "2px 2px 5px -3px rgba(255, 255, 255, 0.2) ,2px 2px 3px -2px rgba(255, 255, 255, 0.15)",
        "custom-triangle-upper":
          "-2px -2px 5px -2px rgba(255, 255, 255, 0.2) ,-2px -2px 3px -1px rgba(255, 255, 255, 0.15)",
      },
    },
    screens: {
      xs: "510px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
export default config;
