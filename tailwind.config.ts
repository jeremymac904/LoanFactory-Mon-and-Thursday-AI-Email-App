import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f3efe7",
        ink: "#171412",
        paper: "#fbf7f1",
        line: "#d7cfc2",
        signal: "#d46d2a",
        moss: "#607466",
        mute: "#7a6f63",
        wash: "#ebe4d8"
      },
      boxShadow: {
        panel: "0 20px 60px rgba(23, 20, 18, 0.08)"
      },
      borderRadius: {
        shell: "28px"
      }
    }
  },
  plugins: []
};

export default config;
