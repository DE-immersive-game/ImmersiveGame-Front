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
    },
  },
  plugins: [],
};
