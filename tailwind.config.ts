const defaultTheme = require('tailwindcss/defaultTheme');

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', ...defaultTheme.fontFamily.sans],
        galaxyItalic: ['galaxyItalic', ...defaultTheme.fontFamily.sans], 
        galaxyPoster: ['galaxyPoster', ...defaultTheme.fontFamily.sans], 
        galaxyPosterItalic: ['galaxyItalic', ...defaultTheme.fontFamily.sans], 
        galaxyRegular: ['galaxyPoster', ...defaultTheme.fontFamily.sans], 
      },
      boxShadow: {
        'custom-text': '0px 0px 44px 0px rgba(255, 255, 255, 0.75)',
      },
      keyframes: {
        customPulse: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.20)',
          },
        },
      },
      animation: {
        customPulse: 'customPulse 3s infinite',
      },
      colors: {
        neutral: {
          background: "#03001A",
          text: "#FFFFFF",
          "text-50": "#81808C",
        },
        futuristic: {
          4: "#2693FF",
          3: "#7757FF",
          2: "#9E39FF",
          1: "#E702FF",
          // gradient:
          //   "linear-gradient(hsla(251, 100%, 67%, 1), hsla(294, 100%, 50%, 1))",
        },
        natural: {
          5: "#F4C052",
          4: "#DCE731",
          3: "#B8FE2C",
          2: "#7FFD50",
          1: "#0FFA95",
          // gradient:
          //   "linear-gradient(hsla(104, 98%, 65%, 1), hsla(64, 79%, 55%, 1))",
        },
        indicative: {
          correct: {
            100: "#00DE1E",
            50: "#00DE1E",
            0: "#00DE1E",
          },
          incorrect: {
            100: "#DE0000",
            50: "#DE0000",
            0: "#DE0000",
          },
        },
      },
      backgroundImage: {
        "futuristic-gradient":
          "linear-gradient(to right, hsla(251, 100%, 67%, 1), hsla(294, 100%, 50%, 1))",
        "natural-gradient":
          "linear-gradient(to right, hsla(104, 98%, 65%, 1), hsla(64, 79%, 55%, 1))",
      },
    },
  },
  plugins: [],
};
