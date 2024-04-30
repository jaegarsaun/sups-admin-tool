/** @type {import('tailwindcss').Config} */
module.exports = {
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
        "primaryDark": "#13131A",
        "secondaryDark": "#1C1C24",
        "tetraDark": "#292932",
        "primaryBlue": "#1E75FF",
        "secondaryBlue": "#50B5FF",
        "primaryRed": "#FC5A5A",
        "primaryOrange": "#FF974A",
        "secondaryOrange": "#FFC542"
      },
    },
  },
  plugins: [],
};
