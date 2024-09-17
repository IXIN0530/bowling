import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "side-inner": "0px 2px 5px  #0000004f inset,5px 0px 5px   #ffffffaa,-5px 0px 5px  #ffffffaa",
      },
      backgroundColor: {
        "PointListBack": "bg-black",
        "default-bg": "#F2FBFF",
      }
    },
  },
  plugins: [],
};
export default config;
