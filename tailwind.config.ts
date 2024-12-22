import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxm: "380px",
        xm: "500px",
        sm: "640px",
        md: "768px",
        xd: "815px",
        xxd: "875px",
        mmd: "940px",
        ld: "1000px",
        lg: "1024px",
        llg: "1060px",
        lgg: "1112px",
        xl: "1280px",
        xxl: "1312px",
        "2xl": "1536px",
      },
      colors: {
        first: "#f3f3f5",
        second: "#84B8AC",
        third: "#D8E27C",
      },
      fontFamily: {
        medium: "regular",
        light: "light",
      },
    },
  },
  plugins: [
    function ({
      addVariant,
    }: {
      addVariant: (name: string, style: string) => void;
    }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
} satisfies Config;
