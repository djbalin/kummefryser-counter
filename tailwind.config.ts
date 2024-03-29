import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      xxs: "320px",
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        typing: "typing 4s steps(40) 500ms forwards, blink .6s 5 500ms",
        typingDelayed:
          "typing 4s steps(40) 3500ms forwards, blink .6s 7 3500ms",
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            opacity: "1",
            // borderRightWidth: "2px",
            paddingRight: "4px",
          },
          "50%": {
            // borderRightWidth: "2px",
            width: "100%",
            opacity: "1",
          },
          "99%": {
            width: "100%",
            opacity: "1",
            // borderRightWidth: "2px",
          },
          "100%": {
            width: "100%",
            opacity: "1",
            borderColor: "transparent",
            // borderRightWidth: "0px",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
