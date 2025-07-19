/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Optional: Add colors like primary, destructive, etc.
      colors: {
        primary: "#2563eb",
        "primary-foreground": "#1f2937",
        destructive: "#dc2626",
        "destructive-foreground": "ffffff",
      },
    },
  },
  plugins: [],
};
