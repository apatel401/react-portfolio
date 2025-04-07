/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class", // Enable dark mode
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
            sans: ['Poppins', 'sans-serif'], // Adding the Poppins font as the default
          },
          colors: {
            primary: {
              DEFAULT: "#3B82F6",
            },
            dark: {
              100: "#0a0a0a",
              200: "#1A1A1A",
              300: "#262626",
              400: "#404040",
              700: "#4D4D4D",
            },
          },
        backgroundImage: {
          gradientGlass:
            "linear-gradient(135deg, rgba(65, 105, 225, 0.2), rgba(255, 255, 255, 0.1))",
        },
        backdropBlur: {
          glass: "10px",
        },
      },
    },
    plugins: [],
  };
  