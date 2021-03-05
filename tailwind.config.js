module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Brfirma"],
      serif: ["Brfirma"],
    },
    maxWidth: {
      '1/4': '30%'
     },
     minWidth: {
      'sm': '25%'
     },
    extend: {},
    screens: {
      phn: "450px",
      // => @media (min-width: 450px) { ... }

      sm: "660px",
      // => @media (min-width: 660px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      mx: "900px",
      // => @media (min-width: 900px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/custom-forms")],
};
