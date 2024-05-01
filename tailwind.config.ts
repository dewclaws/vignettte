import type { Config } from "tailwindcss";

const vars = {
  sizes: {
    navbar: {
      size: "4rem",
      selectedLinkThickness: "3px",
    },
    input: {
      height: "2.5rem",
    },
    rounding: {
      sm: "0.375rem",
      md: "0.65625rem",
      lg: "0.75rem",
    },
    spacing: {
      xxs: "0.125rem",
      xs: "0.25rem",
      sm: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      xxl: "1.5rem",
      xxxl: "2rem",
    },
  },
};

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--color-primary) / <alpha-value>)",
          background: "hsl(var(--color-primary-background) / <alpha-value>)",
          foreground: "hsl(var(--color-primary-foreground) / <alpha-value>)",
        },
        info: {
          background: "hsl(var(--color-info-background) / <alpha-value>)",
          foreground: "hsl(var(--color-info-foreground) / <alpha-value>)",
        },
        success: {
          background: "hsl(var(--color-success-background) / <alpha-value>)",
          foreground: "hsl(var(--color-success-foreground) / <alpha-value>)",
        },
        warning: {
          background: "hsl(var(--color-warning-background) / <alpha-value>)",
          foreground: "hsl(var(--color-warning-foreground) / <alpha-value>)",
        },
        body: {
          background: "hsl(var(--color-base-background) / <alpha-value>)",
          foreground: "hsl(var(--color-base-foreground) / <alpha-value>)",
        },
        content: {
          background: "hsl(var(--color-content-background) / <alpha-value>)",
        },
        header: {
          background: "hsl(var(--color-header-background) / <alpha-value>)",
          foreground: "hsl(var(--color-header-foreground) / <alpha-value>)",
          active: "hsl(var(--color-header-active) / <alpha-value>)",
        },
        input: {
          background: "hsl(var(--color-input-background) / <alpha-value>)",
          border: "hsl(var(--color-input-border) / <alpha-value>)",
        },
        muted: {
          background: "hsl(var(--color-muted-background) / <alpha-value>)",
          foreground: "hsl(var(--color-muted-foreground) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      spacing: {
        "3xl": vars.sizes.spacing.xxxl,
        "2xl": vars.sizes.spacing.xxl,
        xl: vars.sizes.spacing.xl,
        lg: vars.sizes.spacing.lg,
        md: vars.sizes.spacing.md,
        sm: vars.sizes.spacing.sm,
        xs: vars.sizes.spacing.xs,
        "2xs": vars.sizes.spacing.xxs,
      },
      height: {
        navbar: vars.sizes.navbar.size,
        input: vars.sizes.input.height,
      },
      size: {
        navbar: vars.sizes.navbar.size,
      },
      borderRadius: {
        lg: vars.sizes.rounding.lg,
        md: vars.sizes.rounding.md,
        sm: vars.sizes.rounding.sm,
      },
      boxShadow: {
        "nav-link-active": `0 -${vars.sizes.navbar.selectedLinkThickness} 0 var(--tw-shadow-color) inset`,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
